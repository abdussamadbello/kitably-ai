import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { bookPK, analysis } = await request.json();
    const { keyCharacters, language, sentiment, plotSummary } = analysis;

    const bookAnalysis = await prisma.bookAnalysis.create({
      data: {
        book: {
          connect: {
            id: bookPK,
          },
        },
        keyCharacters,
        language,
        sentiment,
        plotSummary,
        analysisPerformedAt: new Date(),
      },
    });

    return NextResponse.json(bookAnalysis);
  } catch (error) {
    console.error("Error in save-analysis API:", error);
    return NextResponse.json(
      { error: "Failed to save analysis" },
      { status: 500 }
    );
  }
}