import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

type BookCardProps = {
  title: string;
  content: string;
};

const BookCard: React.FC<BookCardProps> = ({ title, content }) => {
  return (
    <Card className="mb-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default BookCard;
