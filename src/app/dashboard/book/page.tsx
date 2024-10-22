"use client";

import { useState, useEffect } from "react";
import SavedBooksList from "@/components/common/SavedBooksList";
import { Loader2 } from "lucide-react";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/book");
        
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setBooks(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load books. Please try again later.');
          console.error('Error fetching books:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      isMounted = false;
    };
  }, []); 
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">My Books</h1>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4 rounded-lg bg-red-50">
            {error}
          </div>
        ) : books.length === 0 ? (
          <div className="text-center text-muted-foreground p-8">
            <p>No books saved yet. Start by searching and saving some books!</p>
          </div>
        ) : (
          <SavedBooksList books={books} />
        )}
      </div>
    </div>
  );
}