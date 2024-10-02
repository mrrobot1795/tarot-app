import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDb } from "@/lib/mongoose"; 
import { User } from "@/models/User";  

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
  await connectDb();
  const { email, password } = await req.json();

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Verify the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1d" });

  return NextResponse.json({ token });
}
