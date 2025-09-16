// import { headers } from "next/headers";
// import { Webhook } from "svix";
// import { NextRequest, NextResponse } from "next/server";
// import { createUser } from "@/lib/actions/user.action";
// import { clerkClient } from "@clerk/nextjs/server";

// export async function POST(req: NextRequest) {
  
//   const secret = process.env.CLERK_WEBHOOK_SECRET;
//   if (!secret) return new Response("Missing Clerk webhook secret", { status: 500 });

//   const headersList = headers();
//   const svix_id = headersList.get("svix-id") ?? "";
//   const svix_timestamp = headersList.get("svix-timestamp") ?? "";
//   const svix_signature = headersList.get("svix-signature") ?? "";

//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   const wh = new Webhook(secret);
//   let evt: any;

//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     });
//   } catch (err) {
//     console.error("Error verifying webhook:", err);
//     return new Response("Invalid signature", { status: 400 });
//   }

//   if (evt.type === "user.created") {
//     const { id: clerkId, email_addresses, image_url, first_name, last_name, username } = evt.data;

//     const user = {
//       clerkId,
//       email: email_addresses[0]?.email_address ?? "",
//       username,
//       firstName: first_name,
//       lastName: last_name,
//       photo: image_url,
//     };

//     console.log(user, 'User data from Clerk');

//     const newUser = await createUser(user);
//     console.log(newUser, 'Newly created user');

//     // if (newUser) {
//     //   await clerkClient.users.updateUserMetadata(clerkId, {
//     //     publicMetadata: { userId: newUser._id },
//     //   });
//     // }

//     return NextResponse.json({ message: "Ok", user: newUser });
//   }

//   return new Response("Webhook received", { status: 200 });
// }

// import { verifyWebhook } from '@clerk/nextjs/webhooks'
// import { NextRequest } from 'next/server'

// export async function POST(req: NextRequest) {
//   try {
//     const evt = await verifyWebhook(req)

//     // Do something with payload
//     // For this guide, log payload to console
//     const { id } = evt.data
//     const eventType = evt.type
//     console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
//     console.log('Webhook payload:', evt.data)

//     return new Response('Webhook received', { status: 200 })
//   } catch (err) {
//     console.error('Error verifying webhook:', err)
//     return new Response('Error verifying webhook', { status: 400 })
//   }
// }

import { headers } from "next/headers";
import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/database/models/user.model";

export async function POST(req: NextRequest) {
  // Verify Clerk Webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET!;
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;


  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    await User.create({
      clerkId: id,
      email: email_addresses[0]?.email_address,
      firstName: first_name,
      lastName: last_name,
      imageUrl: image_url,
    });
    console.log("✅ User created in MongoDB");
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    await User.findOneAndUpdate(
      { clerkId: id },
      {
        email: email_addresses[0]?.email_address,
        firstName: first_name,
        lastName: last_name,
        imageUrl: image_url,
      }
    );
    console.log("♻️ User updated in MongoDB");
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    await User.findOneAndDelete({ clerkId: id });
    console.log("🗑 User deleted from MongoDB");
  }

  return new NextResponse("Webhook received", { status: 200 });
}
