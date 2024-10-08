import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDb } from "@/lib/mongoose";
import { User } from "@/models/User";

export async function POST(req: NextRequest) {
  await connectDb();
  const { username, email, password } = await req.json();

  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  return NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}
