"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchBooks } from "../utils/searchBooks";
import BooksList from "@/components/common/BookList";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const result = await searchBooks(query);
      setBooks(result.results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-[calc(90vh-4rem)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Here is where you can manage your saved books and analysis.
          </p>
        </header>

        <form 
          onSubmit={handleSearch} 
          className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto"
        >
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books or analysis..."
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isSearching}
            className="w-full sm:w-auto"
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              'Search'
            )}
          </Button>
        </form>

        {books.length > 0 && (
          <section className="w-full space-y-6 mt-12">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Search Results
            </h2>
            <BooksList books={books} />
          </section>
        )}
      </div>
    </div>
  );
}