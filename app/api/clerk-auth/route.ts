// /app/api/users/route.ts
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

export async function POST(req: Request) {
  const data = await req.json();

  // TS infers the param type here:
  const user = await clerkClient.users.createUser({
    firstName:    data.firstName,
    lastName:     data.lastName,
    emailAddress: data.emailAddress,  // string[]
    phoneNumber:  data.phoneNumber,   // string[]
    username:     data.username,
    password:     data.password,
    // …any other optional fields
  });

  return NextResponse.json(user, { status: 200 });
}
