import { NextResponse } from "next/server";
import  OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});


export async function POST(request: Request) {
  try {
    // Parse the incoming request to get the book content
    const { content, title } = await request.json();

    if (!content || !title) {
      return NextResponse.json(
        { error: "Book content and title are required" },
        { status: 400 }
      );
    }

    // Convert content to a Blob
    const contentBlob = new Blob([content], { type: "text/plain" });

    // Convert Blob to File
    const contentFile = new File([contentBlob], `${title}.txt`, {
      type: "text/plain",
    });

    // Make a call to the OpenAI API to upload the content as bytes
    const file = await client.files.create({
      file: contentFile,
      purpose: "assistants",
    });

    // Return the uploaded file information
    return NextResponse.json(file, { status: 200 });
  } catch (error) {
    console.error("Error uploading file to OpenAI:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
