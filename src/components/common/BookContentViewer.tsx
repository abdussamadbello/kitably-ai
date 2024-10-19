import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Users, Globe, FileText, HeartPulse } from 'lucide-react';
import React from 'react';

type BookContentViewerProps = {
  content: string;
  keyCharacters: string;
  language: string;
  plotSummary: string;
  sentiment: string;
};

const BookContentViewer: React.FC<BookContentViewerProps> = ({
  content,
  keyCharacters,
  language,
  plotSummary,
  sentiment,
}) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-6 w-6" />
          Book Analysis 
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="characters" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Characters</span>
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Language</span>
            </TabsTrigger>
            <TabsTrigger value="plot" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Plot</span>
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4" />
              <span className="hidden sm:inline">Sentiment</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Book Content</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {content}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="characters" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Characters</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {keyCharacters}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="language" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Language Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm leading-relaxed">
                  <strong>Detected Language:</strong> {language}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plot" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Plot Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {plotSummary}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sentiment" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm leading-relaxed">
                  <strong>Overall Sentiment:</strong> {sentiment}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BookContentViewer;