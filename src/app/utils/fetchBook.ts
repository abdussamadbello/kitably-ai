interface Book {
  id: string;
  title: string;
  authors?: { name: string }[];
  subjects?: string[];
  languages?: string;
  formats?: { [key: string]: string };
}

export const fetchBook = async (book: Book) => {
  try {
    const bookContentResponse = await fetch(`/api/gutenberg/?id=${book.id}`);
    if (!bookContentResponse.ok) {
      throw new Error("Failed to fetch book");
    }

    const bookContent = await bookContentResponse.json();
    
    const savedBookResponse = await fetch(`/api/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...book, ...bookContent }),
    });

    
    if (!savedBookResponse.ok) {
      throw new Error("Failed to save book");
    }

    return await savedBookResponse.json();
  } catch (error) {
    console.error("Error fetching or saving book:", error);
    throw new Error("Error fetching or saving book content or metadata");
  }
};
