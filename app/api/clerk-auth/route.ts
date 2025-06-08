// app/api/clerk-auth/route.ts
import { NextResponse } from "next/server";
import { clerkClient }  from "@clerk/clerk-sdk-node";

interface ClerkAuthBody {
  firstName?:    string;
  lastName?:     string;
  emailAddress:  string[];    // required by your Clerk settings    // optional unless you made it required
  username?:     string;
  password:      string;      // required
}

export async function POST(req: Request) {
  // 1) Parse & cast to ClerkAuthBody
  let data: ClerkAuthBody;
  try {
    data = (await req.json()) as ClerkAuthBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid or missing JSON body" },
      { status: 400 }
    );
  }

  const {
    firstName,
    lastName,
    emailAddress,
    username,
    password
  } = data;

  // 2) Minimal validation
  if (!Array.isArray(emailAddress) || emailAddress.length === 0) {
    return NextResponse.json(
      { error: "emailAddress (array of strings) is required" },
      { status: 400 }
    );
  }
  if (typeof password !== "string" || password.length < 8) {
    return NextResponse.json(
      { error: "password (min 8 chars) is required" },
      { status: 400 }
    );
  }

  try {
    // 3) Create the Clerk user
    const user = await clerkClient.users.createUser({
      firstName,
      lastName,
      emailAddress,
      username,
      password,
    });

    // 4) Return the full user object
    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    // Clerk throws a structured error object
    console.error("Clerk createUser failed:", error);
    return NextResponse.json(
      {
        status: error,
        clerkError: true,
        errors: Array.isArray(error) ? error : [error],
      },
      { status: error instanceof Error ? 400 : 500 }
    );
  }
}
