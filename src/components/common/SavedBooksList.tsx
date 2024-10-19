import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Book, BookOpen, Brain, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { analyzeText } from "@/app/utils/analyzeText";

interface Author {
  name: string;
  birth_year: string;
  death_year: string;
}

interface Book {
  id: string;
  bookId: number;
  title: string;
  authors?: Author[];
  content: string;
  openAIFileId: string;
  accessedAt: string;
}

interface SavedBooksListProps {
  books: Book[];
  className?: string;
}

const SavedBooksList: React.FC<SavedBooksListProps> = ({ books = [], className = "" }) => {
  const router = useRouter();
  const [analyzingBookIds, setAnalyzingBookIds] = useState<number[]>([]);
  const [errors, setErrors] = useState<Map<number, string>>(new Map());

  const handleAnalyzeBook = async (bookId: number) => {
    // Add bookId to analyzing list using functional update
    setAnalyzingBookIds(prevIds => [...prevIds, bookId]);
    
    // Clear any existing errors for this book
    setErrors(prevErrors => {
      const newErrors = new Map(prevErrors);
      newErrors.delete(bookId);
      return newErrors;
    });

    try {
      const bookData = books.find((book) => book.bookId === bookId);
      if (!bookData) {
        throw new Error("Book not found");
      }
      
      const response = await analyzeText(bookData.id, bookData.content);
      console.log(`Book ${bookId} analyzed successfully`, response);
      
    } catch (error) {
      console.error(`Error analyzing book ${bookId}:`, error);
      setErrors(prevErrors => new Map(prevErrors).set(
        bookId,
        error instanceof Error ? error.message : "An error occurred while analyzing the book"
      ));
    } finally {
      // Remove bookId from analyzing list using functional update
      setAnalyzingBookIds(prevIds => prevIds.filter(id => id !== bookId));
    }
  };

  const handleReadBook = (bookId: number) => {
    router.push(`/dashboard/book/read/${bookId}`);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return "Invalid date";
    }
  };

  if (!books || books.length === 0) {
    return (
      <div className="w-full p-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle> No Books Found </AlertTitle>
          <AlertDescription>
            You haven&#39;t saved any books yet. Start by adding some books to your collection.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={`w-full p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <Book className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Library</h2>
      </div>
      
        <div className="grid gap-4">
          {books.map((book) => {
            const isAnalyzing = analyzingBookIds.includes(book.bookId);
            const error = errors.get(book.bookId);
            
            return (
              <Card key={book.id} className="group hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="line-clamp-1">{book.title}</span>
                  </CardTitle>
                  {book.authors && book.authors.length > 0 && (
                    <CardDescription>
                      By: {book.authors.map((author, index) => (
                        <span key={author.name} className="text-sm">
                          {author.name}
                          {author.birth_year && author.death_year && 
                            ` (${author.birth_year}-${author.death_year})`
                          }
                          {book.authors && index < book.authors.length - 1 && ", "}
                        </span>
                      ))}
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-600">
                      Last accessed: {formatDate(book.accessedAt)}
                    </p>
                    
                    {error && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleReadBook(book.bookId)}
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Read
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleAnalyzeBook(book.bookId)}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Brain className="mr-2 h-4 w-4" />
                        )}
                        {isAnalyzing ? "Analyzing..." : "Analyze"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
    </div>
  );
};

export default SavedBooksList;