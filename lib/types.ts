export type Category = 'design' | 'branding' | 'ai' | 'dataviz' | 'opportunity';
export type Importance = 'must-see' | 'worth-knowing' | 'background';

export interface Source {
  id: string;
  name: string;
  feedUrl: string;
  siteUrl: string;
  category: Category;
  tier: 1 | 2 | 3;
  region?: 'global' | 'gcc';
  status: 'live' | 'stale' | 'blocked';
  newestItemDate: string | null;
  enabled: boolean;
  verifiedAt: string;
}

export interface Story {
  id: string;               // sha1 of canonical url
  title: string;
  url: string;
  sourceId: string;
  sourceName: string;
  publishedAt: string;
  fetchedAt: string;
  excerpt?: string;         // <= 300 chars, plain text
  category: Category;
  importance: Importance;
  career: boolean;          // matched careerKeywords
  whyItMatters?: string;    // optional AI step; omitted if unavailable
  readMinutes: number;
  score: number;
  archived: boolean;        // set ONLY by the user, never by a job
  read: boolean;
}

export interface Opportunity {
  id: string;
  name: string;
  org: string;
  url: string;
  kind: 'competition' | 'award' | 'event' | 'tracker';
  scope: string;
  what: string;
  why: string;
  prize?: string;
  timing: string;
  feeNote?: string;
  verifiedAt: string;
}
