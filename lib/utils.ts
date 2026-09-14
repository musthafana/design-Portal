import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(relativeTime);

export function getGroupHeader(isoDate: string): string {
  const d = dayjs(isoDate);
  if (d.isToday()) return 'Today';
  if (d.isYesterday()) return 'Yesterday';
  
  // If it's within the last 7 days, show the day name, else full date
  if (dayjs().diff(d, 'day') < 7) {
    return d.format('dddd');
  }
  
  return d.format('ddd D MMM');
}

export function groupStoriesByDate<T extends { publishedAt: string }>(stories: T[]) {
  const groups: { header: string; items: T[] }[] = [];
  
  stories.forEach((story) => {
    const header = getGroupHeader(story.publishedAt);
    let group = groups.find((g) => g.header === header);
    
    if (!group) {
      group = { header, items: [] };
      groups.push(group);
    }
    
    group.items.push(story);
  });
  
  return groups;
}

export function extractUpcomingDeadlines(opportunities: any[]) {
  const upcoming: { opp: any; date: dayjs.Dayjs; daysRemaining: number }[] = [];
  const now = dayjs();

  // Basic regex to find "18 September 2026" or similar
  const dateRegex = /(\d{1,2})\s(January|February|March|April|May|June|July|August|September|October|November|December)\s(\d{4})/gi;

  opportunities.forEach(opp => {
    let match;
    const matches: dayjs.Dayjs[] = [];
    
    // Look through timing text for dates
    while ((match = dateRegex.exec(opp.timing)) !== null) {
      const d = dayjs(match[0], 'D MMMM YYYY');
      if (d.isValid()) matches.push(d);
    }

    if (matches.length > 0) {
      // Find the closest future date within 90 days
      const validDates = matches
        .filter(d => d.isAfter(now) || d.isSame(now, 'day'))
        .filter(d => d.diff(now, 'day') <= 90)
        .sort((a, b) => a.diff(b));

      if (validDates.length > 0) {
        upcoming.push({
          opp,
          date: validDates[0],
          daysRemaining: validDates[0].diff(now, 'day')
        });
      }
    }
  });

  return upcoming.sort((a, b) => a.daysRemaining - b.daysRemaining);
}
