import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

// Helper function to verify JWT token
async function verifyToken(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    return decoded;
  } catch (error) {
    return null;
  }
}

// GET - Fetch all income for a user
export async function GET(req: NextRequest) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("finance-tracker");
    
    const income = await db.collection("income")
      .find({ userId: user.userId })
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json(income);
  } catch (error) {
    console.error("Error fetching income:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST - Create a new income entry
export async function POST(req: NextRequest) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, description, category, date } = await req.json();

    if (!amount || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("finance-tracker");
    
    const income = {
      userId: user.userId,
      amount: parseFloat(amount),
      description,
      category,
      date: date || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const result = await db.collection("income").insertOne(income);
    income._id = result.insertedId;

    return NextResponse.json(income, { status: 201 });
  } catch (error) {
    console.error("Error creating income:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT - Update an income entry
export async function PUT(req: NextRequest) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, amount, description, category, date } = await req.json();

    if (!id || !amount || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("finance-tracker");
    
    const result = await db.collection("income").updateOne(
      { _id: new ObjectId(id), userId: user.userId },
      {
        $set: {
          amount: parseFloat(amount),
          description,
          category,
          date: date || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Income entry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Income updated successfully" });
  } catch (error) {
    console.error("Error updating income:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE - Delete an income entry
export async function DELETE(req: NextRequest) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Income ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("finance-tracker");
    
    const result = await db.collection("income").deleteOne({
      _id: new ObjectId(id),
      userId: user.userId
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Income entry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 