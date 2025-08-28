import { update } from './../../../../node_modules/effect/src/Differ';
import { headers } from "next/headers";
import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/actions/user.action";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  // Clerk automatically provides these env vars when you set up webhook
  const secret = process.env.CLERK_WEBHOOK_SECRET;

  if (!secret) {
    return new Response("Missing Clerk webhook secret", { status: 500 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const svix_id = headers().get("svix-id") ?? "";
  const svix_timestamp = headers().get("svix-timestamp") ?? "";
  const svix_signature = headers().get("svix-signature") ?? "";

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

  // Extract useful data
  const { id } = evt.data;
  const eventType = evt.type;
  
  if(eventType === 'user.created'){
    const {id,email_addresses, image_url, first_name, last_name, username} = evt.data;

    const user = {
        clerkId: id,
        email: email_addresses,
        username: username,
        firstName: first_name,
        lastName: last_name,
        photo: image_url
    };

      const newUser = await createUser(user);

      if(newUser) {
        await clerkClient.users.updateUserMetadata(id,{
            publicMetadata: {
                userId: newUser._id,

            }
        })
      }

      return NextResponse.json({message: 'Ok', user: newUser})

  }

  if(eventType === 'user.created'){
    const {id,email_addresses, image_url, first_name, last_name, username} = evt.data;

    const user = {
        clerkId: id,
        email: email_addresses,
        username: username,
        firstName: first_name,
        lastName: last_name,
        photo: image_url
    };

      const newUser = await createUser(user);

      if(newUser) {
        await clerkClient.users.updateUserMetadata(id,{
            publicMetadata: {
                userId: newUser._id,

            }
        })
      }

      return NextResponse.json({message: 'Ok', user: newUser})

  }


  console.log(`✅ Received webhook with ID ${id} and event type ${eventType}`);
  console.log("Webhook payload:", evt.data);

  // Do something with the webhook event (e.g. sync users, audit logs, etc.)
  
  return new Response("Webhook received", { status: 200 });
}
