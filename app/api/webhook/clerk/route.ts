import { headers } from "next/headers";
import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/actions/user.action";
import { clerkClient } from "@clerk/nextjs/server";


export async function POST(req: NextRequest) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("Missing Clerk webhook secret", { status: 500 });
  }

  const headersList = await headers();
  const svix_id = headersList.get("svix-id") ?? "";
  const svix_timestamp = headersList.get("svix-timestamp") ?? "";
  const svix_signature = headersList.get("svix-signature") ?? "";

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(secret);
  let evt: any;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;

    const user = {
      clerkId: id,
      email: email_addresses[0]?.email_address ?? "", // ✅ safer
      username,
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    };

    const newUser = await createUser(user);
    
    if (newUser) {
          const client = await clerkClient()

      await client.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    return NextResponse.json({ message: "Ok", user: newUser });
  }


  return new Response("Webhook received", { status: 200 });
}
