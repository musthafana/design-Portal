import podcastsData from '@/data/podcasts.json';
import MediaList from '@/components/MediaList';

export const metadata = { title: 'Dialogues | Design Portal' };

export default function PodcastsPage() {
  const items = podcastsData.map((p: any) => ({
    title: p.name || p.title || 'Untitled',
    year: p.year,
    url: p.url || `https://www.youtube.com/results?search_query=${encodeURIComponent(p.youtubeSearch)}`,
    tags: p.tags || [],
    primaryPerson: p.guest,
    secondaryPerson: p.host,
    durationInfo: p.duration
  }));
  return <MediaList items={items} title="Dialogues" type="podcasts" />;
}
