import { NextRequest, NextResponse } from "next/server";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import type { Document } from "@langchain/core/documents";

const formatDocumentsAsString = (documents: Document[]) => {
  return documents.map((document) => document.pageContent).join("\n\n");
};

export async function POST(request: NextRequest) {
  try {
    const { fileContent } = await request.json();

    if (!fileContent) {
      return NextResponse.json(
        { error: "File content is required" },
        { status: 400 }
      );
    }

    // Initialize the LLM
    const model = new ChatOpenAI({
      modelName: "gpt-4",
    });

    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    const docs = await textSplitter.createDocuments([fileContent]);

    // Create a vector store from the documents
    const vectorStore = await MemoryVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings()
    );

    // Initialize a retriever wrapper around the vector store
    const vectorStoreRetriever = vectorStore.asRetriever();

    // Create a system & human prompt for the chat model
    const SYSTEM_TEMPLATE = `You are a literary analyst. Use the following pieces of context to answer the question at the end.
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    ----------------
    {context}`;

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", SYSTEM_TEMPLATE],
      ["human", "{question}"],
    ]);

    const chain = RunnableSequence.from([
      {
        context: vectorStoreRetriever.pipe(formatDocumentsAsString),
        question: new RunnablePassthrough(),
      },
      prompt,
      model,
      new StringOutputParser(),
    ]);

    const questions = {
      keyCharacters: "Identify the key characters in the book and provide a list of their names.",
      language: "Determine the language of the book.",
      sentiment: "Analyze the sentiment of the book. Is it positive, negative, or neutral? Provide a summary.",
      plotSummary: "Provide a concise plot summary of the book."
    };

    const analysis: { [key: string]: string } = {};

    // Process each question
    for (const [key, question] of Object.entries(questions)) {
      const answer = await chain.invoke(question);
      analysis[key] = answer;
    }

    return NextResponse.json(analysis, { status: 200 });
  } catch (error) {
    console.error("Error analyzing text:", error);
    return NextResponse.json(
      { error: "Failed to analyze text" },
      { status: 500 }
    );
  }
}