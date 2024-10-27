import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const words = await prisma.word.findMany({
      orderBy: { createdAt: "desc" },
      where: { archived: false },
    });
    return NextResponse.json(words);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch words" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const word = await prisma.word.create({
      data: {
        word: body.word,
        definition: body.definition,
        notes: body.notes,
      },
    });
    return NextResponse.json(word);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create word" },
      { status: 500 }
    );
  }
}