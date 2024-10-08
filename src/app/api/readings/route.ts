import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/mongoose";
import { Reading } from "@/models/Reading";
import { verifyToken } from "@/middleware/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const user = await verifyToken(req);

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const readings = await Reading.find({ userId: user.id });
    return NextResponse.json(readings, { status: 200 });
  } catch (error) {
    console.error("Error fetching readings:", error);
    return NextResponse.json(
      { error: "Error fetching readings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const user = await verifyToken(req);

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { question, cards, interpretation } = await req.json();

    if (!question || !cards || !interpretation) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const reading = new Reading({
      question,
      cards,
      interpretation,
      userId: user.id,
    });
    await reading.save();

    return NextResponse.json(reading, { status: 201 });
  } catch (error) {
    console.error("Error creating reading:", error);
    return NextResponse.json(
      { error: "Error creating reading" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDb();
    const user = await verifyToken(req);

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    console.log(req.url);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Reading ID is required" },
        { status: 400 }
      );
    }

    const deletedReading = await Reading.findOneAndDelete({
      _id: id,
      userId: user.id,
    });

    if (!deletedReading) {
      return NextResponse.json(
        { error: "Reading not found or you are not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Reading deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting reading:", error);
    return NextResponse.json(
      { error: "Error deleting reading" },
      { status: 500 }
    );
  }
}
