import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
  try {
    const date = new Date();
    
    // Get all unarchived words
    const words = await prisma.word.findMany({
      where: { archived: false },
    });

    // Archive the words
    await prisma.word.updateMany({
      where: { archived: false },
      data: {
        archived: true,
        archivedAt: date,
      },
    });

    // Generate archive data
    const archiveData = {
      archivedAt: date,
      words: words.map(({ id, word, definition, notes, createdAt }) => ({
        id,
        word,
        definition,
        notes,
        createdAt,
      })),
    };

    return NextResponse.json({
      success: true,
      message: "Words archived successfully",
      data: archiveData,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to archive words" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const archivedWords = await prisma.word.findMany({
      where: { archived: true },
      orderBy: { archivedAt: "desc" },
    });

    // Group words by archive date
    const archives = archivedWords.reduce((acc, word) => {
      const date = word.archivedAt?.toISOString().split("T")[0];
      if (!date) return acc;
      
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(word);
      return acc;
    }, {} as Record<string, typeof archivedWords>);

    return NextResponse.json(archives);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch archives" },
      { status: 500 }
    );
  }
}