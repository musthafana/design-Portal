export async function getBookCoverUrl(coverQuery: string): Promise<string | null> {
  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(coverQuery)}&limit=1`, {
      next: { revalidate: 604800 } // Cache for 1 week
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.docs && data.docs.length > 0 && data.docs[0].cover_i) {
      return `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`;
    }
    return null;
  } catch (err) {
    return null;
  }
}
