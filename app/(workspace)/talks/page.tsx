import talksData from '@/data/talks.json';
import MediaList from '@/components/MediaList';

export const metadata = { title: 'Keynotes | Design Portal' };

export default function TalksPage() {
  const items = talksData.map((t: any) => ({
    title: t.title,
    year: t.year,
    url: t.url || `https://www.youtube.com/results?search_query=${encodeURIComponent(t.youtubeSearch)}`,
    tags: t.tags || [],
    primaryPerson: t.speaker,
    durationInfo: t.duration
  }));
  return <MediaList items={items} title="Keynotes" type="talks" />;
}
