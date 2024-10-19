import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { fetchBook } from '@/app/utils/fetchBook';

interface Book {
    id: string;
    title: string;
    authors?: { name: string }[];
    subjects?: string[];
    formats?: { [key: string]: string };
}

interface BooksListProps {
    books: Book[];
    className?: string;
}

const BooksList: React.FC<BooksListProps> = ({ books = [], className = '', }) => {
    const handleSaveBook = async (bookId: string) => {
        try {
            const bookData = books.find(book => book.id === bookId);
            if (bookData) {
                await fetchBook(bookData);
                console.log(`Book ${bookId} saved successfully`);
            } else {
                console.error(`Book with id ${bookId} not found`);
            }
        } catch (error) {
            console.error(`Error saving book ${bookId}:`, error);
        }
    };

    return (
        <div className={`w-full m-4 ${className}`}>
            <h2 className="text-2xl font-bold mb-4">Books List</h2>
            {!books || books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                <div className="grid gap-4">
                    {books.map((book) => (
                        <Card key={book.id}>
                            <CardHeader>
                                <CardTitle>{book.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <p className="text-md text-gray-700">
                                            Author: {book?.authors?.map((author) => author.name).join(', ') || 'Unknown'}
                                        </p>
                                        <p className="text-sm text-gray-600">Subjects: {book.subjects?.join(', ') || 'N/A'}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {book.formats && book.formats['text/html'] && (
                                            <a
                                                href={book.formats['text/html']}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                <Button variant="outline">Read Book</Button>
                                            </a>
                                        )}
                                        <Button 
                                            variant="outline" 
                                            onClick={() => handleSaveBook(book.id)}
                                        >
                                            Save Book
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BooksList;