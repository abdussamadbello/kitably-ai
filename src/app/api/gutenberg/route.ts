import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const bookId = url.searchParams.get('id');
    
    console.log(bookId, 'GET GUTENBERG BOOK');
    
    if (!bookId) {
        return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    try {
        const contentUrl = `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`;

        const contentResponse = await fetch(contentUrl)

        console.log(contentResponse.status, 'GET GUTENBERG BOOK CONTENT RESPONSE');

        if (!contentResponse.ok ) {
            throw new Error('Failed to fetch book content or metadata');
        }

        const content = await contentResponse.text();

        return NextResponse.json({  content }, { status: 200 });
    } catch (error) {
        console.error('Error fetching book:', error);
        return NextResponse.json({ error: 'Failed to fetch book content or metadata' }, { status: 500 });
    }
}