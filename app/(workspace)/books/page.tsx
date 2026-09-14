import booksData from '@/data/books.json';
import BooksClient from '@/components/BooksClient';
import { getBookCoverUrl } from '@/lib/openLibrary';

export const metadata = {
  title: 'Books | Design Portal',
};

export default async function BooksPage() {
  // Try to resolve Open Library covers for all books
  const booksWithCovers = await Promise.all(
    booksData.map(async (book: any) => {
      let coverUrl = null;
      if (book.coverQuery) {
        coverUrl = await getBookCoverUrl(book.coverQuery);
      }
      return {
        ...book,
        coverUrl,
      };
    })
  );

  return <BooksClient books={booksWithCovers} />;
}
