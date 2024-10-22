"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookContentViewer from "@/components/common/BookContentViewer";
import { Loader2 } from "lucide-react";

const BookViewerPage: React.FC = () => {
  const { id: bookId } = useParams();
  interface BookData {
    content: string;
    analysis:{
    keyCharacters: string;
    language: string;
    plotSummary: string;
    sentiment: string;
    }
  }

  const [bookData, setBookData] = useState<BookData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookId) {
      const fetchBookData = async () => {
        try {
          const response = await fetch(`/api/book?id=${bookId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch book data");
          }
          const data = await response.json();
          setBookData(data);
        } catch (error) {
          console.error("Error fetching book data:", error);
          setError("Error fetching book data");
        } finally {
          setLoading(false);
        }
      };
      fetchBookData();
    }
  }, [bookId]);

  if (loading) {
    return  <Loader2 className="h-8 w-8 animate-spin text-primary" />
    
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!bookData) {
    return <p>No book data available</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <BookContentViewer
        content={bookData?.content}
        keyCharacters={bookData?.analysis?.keyCharacters}
        language={bookData?.analysis?.language}
        plotSummary={bookData?.analysis?.plotSummary}
        sentiment={bookData?.analysis?.sentiment}
      />
    </div>
  );
};

export default BookViewerPage;
