import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { GET as handler } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, title, authors, content } = body;


  if (!id || !content) {
    return NextResponse.json({ error: "Book ID, metadata, and content are required" }, { status: 400 });
  }

  try {
    const session: { user?: { email?: string } } | null = await getServerSession(handler);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized. Please sign in to save the book." }, { status: 401 });
    }

    const book = await prisma.books.create({
      data: {
        bookId: id,
        title,
        authors,
        content,
        accessedAt: new Date(),
        user: {
          connect: {
            email: session.user.email,
          },
        },
      },
    });

    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error saving book to the database" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const bookId = url.searchParams.get("id");

  const session: { user?: { email?: string } } | null = await getServerSession(handler);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized. Please sign in to save the book." }, { status: 401 });
  }

  try {
    if (!bookId) {
      // If no bookId is provided, fetch all books for the authenticated user
      const books = await prisma.books.findMany({
        where: {
          user: {
            email: session.user.email,
          },
        },
        include: {
          analysis: true,
        },
      });
      return NextResponse.json(books, { status: 200 });
    }

    // If bookId is provided, validate and fetch the specific book
    const numericBookId = Number(bookId);
    if (isNaN(numericBookId)) {
      return NextResponse.json({ error: "Book ID must be a valid number" }, { status: 400 });
    }

    const book = await prisma.books.findUnique({
      where: {
        bookId: numericBookId,
        user: {
          email: session.user.email,
        },
      },
      include: {
        analysis: true, // Include analysis if available
      },
    });

    if (book) {
      return NextResponse.json(book, { status: 200 });
    } else {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
  } catch (error) {
    console.log("Error fetching the book from the database:", error);
    return NextResponse.json({ error: "Error fetching the book from the database" }, { status: 500 });
  }
}
