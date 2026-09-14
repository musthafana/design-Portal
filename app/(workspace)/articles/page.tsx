import articlesData from '@/data/articles.json';
import MediaList from '@/components/MediaList';

export const metadata = { title: 'Editorials | Design Portal' };

export default function ArticlesPage() {
  const items = articlesData.map((a: any) => ({
    title: a.title,
    year: a.year,
    url: a.url,
    tags: a.tags || [],
    primaryPerson: a.author,
    durationInfo: a.readTime
  }));
  return <MediaList items={items} title="Editorials" type="articles" />;
}
