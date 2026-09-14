import newsData from '@/data/news.json';
import articlesData from '@/data/articles.json';
import booksData from '@/data/books.json';
import talksData from '@/data/talks.json';
import podcastsData from '@/data/podcasts.json';
import referencesData from '@/data/references.json';
import peopleData from '@/data/people.json';
import coursesData from '@/data/courses.json';
import workData from '@/data/work.json';
import sourcesData from '@/data/sources.json';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function getNavCounts() {
  const enabledSources = sourcesData.filter((s: any) => s.enabled).length;
  
  return {
    latest: newsData.stories.length,
    articles: articlesData.length,
    books: booksData.length,
    talks: talksData.length,
    podcasts: podcastsData.length,
    references: referencesData.length,
    people: peopleData.length,
    courses: coursesData.length,
    work: workData.length,
  };
}

export function getFooterStatus() {
  const fetchedAt = dayjs(newsData.fetchedAt);
  const enabledSources = sourcesData.filter((s: any) => s.enabled).length;
  const failedSources = newsData.sources.failed?.length || 0;

  return {
    lastFetchRelative: fetchedAt.fromNow(),
    sourceCount: enabledSources,
    failedSources,
  };
}
