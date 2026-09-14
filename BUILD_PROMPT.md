# Design Desk — build brief for Antigravity

Paste this whole file as your first task. Work through **§14 Build order**, one step at a time,
stopping after each so I can look at it.

---

## 0. Read this first

**All the content is already chosen and sits in `/data`.** Nine JSON files: 91 sources, 48 books,
40 articles, 91 references (including 16 official design systems), 16 talks, 8 podcasts, 28 people,
28 courses and certifications, 21 income platforms, 19 business ideas, 15 competitions and awards.
Every URL in them was fetched and checked on 9 September 2026.

**Your job is to build the site, not to choose the content.** Do not add books, sources, references or
courses of your own. Do not fill a missing field by guessing. If something is absent — an ISBN, a price,
a deadline — it is absent on purpose, because it could not be verified. Render nothing rather than
inventing something.

---

## 1. Who this is for

A senior graphic and corporate visual designer with about twelve years of experience, based in the UAE,
working across brand identity, editorial and report design, presentation design, technical graphics,
infographics, motion, and Power BI dashboards. He has worked in many sectors — corporate, government,
healthcare, infrastructure, agency, energy — but **he is a general senior designer, not a sector
specialist, and the site must treat him that way.** Everything happening in design matters to him: new
work, new type, new tools, awards, criticism, trends, and the business of the profession.

His stated goal for this site: *"It should feed me with knowledge every day and make me grow a lot."*
He is heading toward creative direction, design leadership and information design, and he wants to teach,
speak, compete, and earn more.

---

## 2. What the site does

1. **Latest** — a continuous stream of everything worth knowing across design, branding, AI, data
   visualisation, and open competitions. Newest first. Nothing is hidden, nothing expires.
2. **A permanent library** — books, canonical articles, references, talks, podcasts, people, courses.
   Chosen because the field cites them, not because they are popular.
3. **Career and income** — certifications worth having, competitions with real prizes and their dates,
   platforms that pay well, and concrete business ideas.
4. **His own notes** — highlights and thoughts, exportable as Markdown so they outlive the site.

**It is a library, not a platform.** It stores links, not content. Nothing is re-hosted, embedded or copied.

---

## 3. Rules that do not bend

- **No caps, anywhere.** No maximum number of stories, sources, books, videos or references. Volume is
  handled by grouping, filtering and importance flags — never by throwing things away.
- **Nothing is archived, expired, hidden or deleted automatically. Ever.** Items stay on the site
  indefinitely until he archives them himself. There is no retention window, no rolling purge, no
  auto-cleanup job. This is an explicit requirement — do not add one for performance reasons.
- **Store links, not content.** Title, source, date, URL, and an excerpt of at most 300 characters.
- **Never link to a pirated or unlicensed copy of anything.** Every free book in `books.json` carries a
  `freeBasis` field naming why it is legally free. A book without `freeUrl` is a purchase — do not go
  looking for a PDF of it.
- **No login, no database, no analytics, no cookie banner** in version one.
- **Attribution on everything** — source name, date, outbound link. `target="_blank" rel="noopener noreferrer"`.
- **Dark only.** No light theme, no toggle. He asked for this specifically.
- **No infinite scroll.** Long lists paginate or load on an explicit "Show more" click.

---

## 4. Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 15, App Router, TypeScript**, static-first (`export const dynamic = 'force-static'`) |
| UI kit | **Ant Design v5** via `ConfigProvider` with `theme.darkAlgorithm` and the tokens in §11. Use `@ant-design/nextjs-registry` for SSR styles. |
| Styling | AntD tokens plus one `globals.css` of CSS custom properties. No hard-coded colours in components. |
| Motion | **Framer Motion** for the few orchestrated moments in §11, plus the CSS View Transitions API for route changes. Nothing else. |
| Data | Flat JSON in `/data`. No database. |
| Refresh | **GitHub Actions cron → Node script → commits `data/news.json`** → site rebuilds. |
| Notes | `localStorage` behind a `NotesStore` interface, swappable later without touching components. |
| Deploy | Vercel or Cloudflare Pages. Static output. |

`npm i next react react-dom antd @ant-design/nextjs-registry framer-motion rss-parser dayjs`
Dev: `typescript @types/node @types/react tsx`

---

## 5. Navigation — ten sections in five groups

The left rail is grouped, not flat. Group labels are small mono caps and are not clickable.

```
LATEST      Latest
READ        Articles · Books
WATCH       Talks · Podcasts
LOOK        References · People
GROW        Courses · Work
MINE        Notes
```

Each rail item shows a live count from its JSON file. The rail footer shows last fetch time, source count,
and any failed sources. Under 860px the rail becomes a horizontal scrolling bar with the group labels dropped.

---

## 6. Latest — the heart of the site

**It is a stream, not a daily edition.** He asked for this directly: *"Instead of making daily update you
can make latest right? so it will cover daily also right?"* — yes, and it is simpler. Newest at the top,
everything ever fetched still there, scroll or page back as far as you like.

**Five categories:** `design` · `branding` · `ai` · `dataviz` · `opportunity`.
The last one carries competitions, awards and open calls, arriving automatically from the Graphic
Competitions feed. This is how he gets told about competitions without having to remember to look.

**Three importance levels:** `must-see` · `worth-knowing` · `background`.
Carried by a 3px left bar plus a text label — never colour alone.

**Grouping.** The stream is grouped by date with sticky date headers ("Today", "Yesterday", "Wed 7 Sep",
then week and month headers further back). Everything below the fold stays reachable.

**"New since your last visit"** — store the last-visit timestamp in `localStorage` and draw a single
horizontal rule labelled "New since Tuesday" at that point in the stream. That, plus the date headers,
is what makes a continuous stream feel daily without discarding anything.

**Filters** (a chip row, multi-select): All · Must-see · Unread · then one chip per category, plus
"For me" which shows items where `career === true`.

**Story row:** importance bar · category label (mono caps) · headline · `whyItMatters` line ·
`source · relative time · N min · ↗`. On the right of each row, an archive control (a small ⌫) that
moves the item to Archive. Archive is a filter on this same page, not a separate section, and archived
items can always be brought back.

**Right-hand aside** (sticky): **Deadlines** — competitions and awards from `opportunities.json` with a
date in the next 90 days, closest first, each showing days remaining. Below it, **Continue** — the three
most recently touched items from the notes store.

---

## 7. The other nine sections

**Articles** — `articles.json`, 40 canonical essays. Filters by topic (philosophy, typography, grids,
identity, editorial, infodesign, dataviz, presentation, web, career, ai) and a "Landmark" filter.
Row shows title, author, publication, year, reading time, and the `why` line. This section changes
rarely; it is a canon, not a feed.

**Books** — `books.json`, 48 titles. Filters: All · Free to read · Worth buying · Has my notes · plus
category chips. Free books link straight to the legal full text and show the `freeBasis` on the card —
7 of the 48 are legally free, including The Vignelli Canon, Butterick's Practical Typography and Wilke's
Fundamentals of Data Visualization. Detail drawer shows `whyItMatters`, level, hours, and *cited by* →
the people who point at it.

Cover resolution, in order: `https://covers.openlibrary.org/b/isbn/{isbn13}-L.jpg` if `isbn13` exists;
otherwise query `https://openlibrary.org/search.json?q={coverQuery}&limit=1&fields=cover_i` **once at
build time**, cache the result to `data/covers.json`, and use `https://covers.openlibrary.org/b/id/{cover_i}-L.jpg`.
Send a `User-Agent` with a contact address — Open Library allows 1 request/second anonymously and asks
that responses be cached. If both fail, render the typographic fallback cover: the title set in the
display serif on a muted ground. **The seed ships without ISBNs on purpose, so the fallback must look
deliberate, not broken.**

**Talks** — `talks.json`. Many entries have no `url`, only a `youtubeSearch` string. That is not a gap to
fill by guessing — link to `https://www.youtube.com/results?search_query={encodeURIComponent(youtubeSearch)}`.
Filters: All · Learn · Grow · Data viz · Power BI. Stills are flat muted colour blocks with a play
triangle; do not fetch external thumbnails.

**Podcasts** — `podcasts.json`. Cards showing name, host, cadence, `what`, `learn`, typical length.

**References** — `references.json`, 91 sources across 17 kinds. Filter chips by kind, with
**design-system first** — the 16 official systems from Apple, Microsoft, Google, IBM, Adobe, Atlassian,
Shopify, Salesforce, GOV.UK and others are the most valuable thing in this section for someone who
writes brand guidelines. Every tile shows `what`, then a rule, then **`learn`** — the sentence saying
what he takes away from it. That field is the point of the section; never hide it behind a hover.

**People** — `people.json`, 28 designers, writers and studios. Clicking a person filters Books to their
`bookIds`. Books and people are cross-linked in both directions; `verifyLinks.ts` must fail the build if
any id does not resolve. This is what makes the shelf non-random and it must stay intact.

**Courses** — `courses.json`, 28 certifications and courses. Filters by field (design, typography, motion,
dataviz, powerbi, ux, branding, leadership) and by level. Each card shows provider, format, duration,
price **exactly as recorded** with its `priceNote`, and the `recognition` line with its evidence link.

> **Hard rule:** if `recognitionEvidenceUrl` is empty, the card must not display any recognition claim.
> Show "recognition not verified" instead. Several entries deliberately record that a programme is *not*
> accredited — display that honestly rather than softening it.

Where `price` is null, show the `priceNote` verbatim rather than "Free" or "Contact us".

**Work** — `work.json` plus `ideas.json`. Three tabs:
- *Platforms* — 21 verified places to earn, each with `what`, `howToWin`, `caution`, joining model and
  the fee note as published. Filter by discipline chips from `worksFor`.
- *Income ideas* — 11 concrete ways to earn with his skills, each with how to start, who pays, effort,
  capital, time to first revenue, and risk.
- *Business ideas* — 8 ventures with thesis, first move, moat and capital needed.

`ideas.json` also has a top-level `screening` object: how these are screened for halal considerations —
what to avoid, what to prefer, and practical notes. **Render it once at the top of the Income ideas tab,
in full, exactly as written.** It opens by saying these are general considerations rather than a religious
ruling, and that borderline cases are worth asking a scholar about. Do not paraphrase, shorten or soften
that. Each idea also carries its own `halalNote` — show it on the card.

**Notes** — the only page that writes. Highlights as blockquotes in the display serif with a brass left
rule, then mono meta (source · locator · kind · tags), then his own note. Filters: All · Highlights ·
My notes · one chip per tag found in the store. Add via a drawer: quote, note, source picker (searching
books, stories, articles, references, talks), locator, tags. Export all as Markdown, and export by tag —
tag something "for a talk" and it collects into one page he can take to a class.

---

## 8. Opportunities and deadlines

`opportunities.json` holds 15 entries: 5 competitions with real prizes, 7 awards, 2 events, and 1 tracker.
They surface in three places, and they are not a separate nav section:

1. The **Deadlines panel** on Latest — anything with a parseable date within 90 days, closest first.
2. The **opportunity category** in the Latest stream, fed live by the Graphic Competitions RSS feed.
3. A **Competitions block** at the top of the Work section, since entering competitions is career and
   income work.

Highlights he should not miss, already in the data: Iron Viz (first prize $15,000 cash plus $15,000 to a
nonprofit); the Power BI DataViz World Championships (rounds 12 Jan – 2 Feb, live finale 16 March 2026);
the Morisawa Type Design Competition (Gold Prize ¥1,000,000 per category, **no entry fee, no submission
limit**); Communication Arts Typography (deadline 18 September 2026) and Design (7 May 2027); GRANSHAN
for non-Latin script work; and Dubai Lynx Creativity Week, 6–8 October 2026 in Dubai.

Where a field says the prize or fee is not stated, **display that fact** rather than omitting the row.
Knowing that something is unverified is useful information.

---

## 9. Data model

`lib/types.ts`. Match the shipped JSON exactly.

```ts
export type Category = 'design'|'branding'|'ai'|'dataviz'|'opportunity';
export type Importance = 'must-see'|'worth-knowing'|'background';

export interface Source {
  id: string; name: string; feedUrl: string; siteUrl: string;
  category: Category; tier: 1|2|3; region?: 'global'|'gcc';
  status: 'live'|'stale'|'blocked'; newestItemDate: string|null;
  enabled: boolean; verifiedAt: string;
}

export interface Story {
  id: string;               // sha1 of canonical url
  title: string; url: string;
  sourceId: string; sourceName: string;
  publishedAt: string; fetchedAt: string;
  excerpt?: string;         // <= 300 chars, plain text
  category: Category; importance: Importance;
  career: boolean;          // matched careerKeywords
  whyItMatters?: string;    // optional AI step; omitted if unavailable
  readMinutes: number; score: number;
  archived: boolean;        // set ONLY by the user, never by a job
  read: boolean;
}
```

The other interfaces follow their files one-to-one: `Book`, `Article`, `Reference`, `Talk`, `Podcast`,
`Person`, `Course`, `WorkPlatform`, `IncomeIdea`, `Venture`, `Opportunity`, `Note`.
`news.json` is `{ fetchedAt, sources: {ok, failed[]}, stories: Story[] }`.

---

## 10. The refresh job

`scripts/fetchNews.ts`, run by `.github/workflows/fetch-news.yml` on cron `0 2,8,14,20 * * *`
(four times a day, Gulf morning / midday / evening / night).

1. Read `sources.json`, keep `enabled: true` — that is 76 of the 91. The stale and blocked ones stay in
   the file as a record and are never fetched.
2. Fetch with `rss-parser`, 10s timeout, 2 retries, a descriptive `User-Agent` including a contact
   address. A failing source is logged and skipped and **never fails the run**.
3. Normalise: canonical URL (strip `utm_*`, `?ref=`, fragments), title, `publishedAt`, plain-text excerpt
   truncated to 300 characters.
4. Deduplicate by canonical-URL hash, then by normalised title within a 7-day window.
5. Score with `lib/scoring.ts` — the same pure module the app imports, so it is unit-testable.
6. **Append to the existing `news.json`. Never truncate it, never drop old stories, never prune by age or
   count.** Preserve every existing story's `archived` and `read` flags. The file grows; that is intended.
   If it later exceeds a few megabytes, split it by month into `data/news/YYYY-MM.json` and have the app
   read the index — but still never delete anything.
7. Commit only when the file changed.

**Scoring** — `lib/scoring.ts`, pure, no I/O:

```
score = 100 * ( 0.30 * careerMatch      // careerKeywords.json: core 1.0, specialism 1.15,
                                        // sectors 0.35, regions 0.4 — capped
              + 0.24 * sourceTier       // tier 1 -> 1.0, 2 -> 0.75, 3 -> 0.5
              + 0.20 * recency          // 0.5 ^ (ageHours / 48), floor 0.3
              + 0.16 * depth            // title and excerpt length bands, minus listicle patterns
              + 0.10 * categoryPriority // from careerKeywords.json
              )
```

- `must-see` when `score >= 72`, **or** `career === true` with `tier === 1`, **or** `category === 'opportunity'`
  (a competition deadline is always worth seeing).
- `worth-knowing` when `score >= 55`. Otherwise `background`.

**No assembly caps.** Every story that is fetched is kept and shown. Importance and filters do the work
that a cap would otherwise do badly.

**Optional AI line.** If `GEMINI_API_KEY` is set, send only `must-see` and `worth-knowing` items — title,
source, excerpt — and ask for one sentence of at most 160 characters on why this matters to a senior
graphic and corporate visual designer who also builds dashboards. Write it to `whyItMatters`. Never let
the model supply a URL or rewrite a headline. If the call fails, drop the field and carry on.
**The site must work perfectly with no API key at all** — build and test that path first.

`scripts/verifyLinks.ts` HEAD-checks every URL in `/data`, and fails on any unresolved `bookIds` or
`citedBy` id. Run weekly by `.github/workflows/verify-links.yml`.

---

## 11. Design

He asked for this to be outstanding, dark, current, and calm to look at. Not white, not neon, not
templated. The reference points are the official design systems now sitting in `references.json` —
study **how Apple, Microsoft Fluent, IBM Carbon and GOV.UK document and structure**, not how they look.
Do not copy anyone's visual identity.

### Direction

Ink black with warm metal. It should read like a well-set reference book that happens to be a screen —
closer to a rare-books room than a dashboard. Hairlines instead of shadows. Type doing the work.

### Tokens — `globals.css`

```css
:root{
  --ground:#0B0C0E;   --surface:#111317;  --surface2:#171A1F;  --surface3:#1D2128;
  --line:#23262C;     --line2:#333840;
  --paper:#EDEAE3;    --paper2:#ADA99F;   --muted:#787771;
  --brass:#C79A4B;    --brass-dim:#8E6E33; --brass-wash:#1C1810;
  --ember:#DE6349;    --on-brass:#0E1512;
}
```

`--brass` is the only accent — links, active nav, active filter, section marks. `--ember` is reserved for
the must-see flag and deadline warnings and nothing else. Every state also carries a text label.

### AntD theme — `lib/theme.ts`

```ts
import { theme } from 'antd';
export const deskTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#C79A4B',
    colorBgBase: '#0B0C0E',
    colorTextBase: '#EDEAE3',
    colorBorder: '#333840',
    colorBorderSecondary: '#23262C',
    borderRadius: 3,
    fontFamily: "'Archivo', -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
    fontSize: 15,
    wireframe: false,
  },
};
```

### Type — three roles, loaded with `next/font/google`

| Role | Face | Used for |
|---|---|---|
| Display | **Instrument Serif** 400 + italic | Page titles, book and tile titles, pull quotes, person names |
| Text | **Archivo** 400/500/600 | Everything else |
| Data | **IBM Plex Mono** 400/500 | Dates, sources, counts, category and importance labels, section marks |

The one flourish: a single italic word in `--brass` inside each page title — *Latest*, The *shelf*,
Where to *go looking*. Nowhere else.

### On current trends — be specific, not fashionable

Glassmorphism has passed its peak and reads dated on a content-dense site; skip it. What is worth taking
from current practice: large editorial display type at real scale; dense information layouts held by
hairlines rather than cards; **restrained motion tied to state, not to scroll**; the CSS View Transitions
API for route changes; grain or subtle texture over gradients; and tabular data treated as a
first-class citizen rather than an afterthought. Spend the boldness on typography and keep everything
around it quiet.

### Motion — four moments only

1. **Page load**: rail and content fade up 8px, staggered 40ms, once. From a visible resting state.
2. **Route change**: CSS View Transitions, 180ms cross-fade with the page title held.
3. **Filter change**: list items reflow with Framer Motion `layout`, 160ms.
4. **Hover**: headline shifts to `--brass`, the ↗ arrow fades in at 130ms. Book covers lift 3px.

Nothing loops, nothing animates on scroll, nothing autoplays. Every duration collapses to 1ms under
`prefers-reduced-motion: reduce`.

### Layout

Fixed 236px left rail with the grouped nav; content max 1560px; the Latest stream in two columns with a
316px sticky aside; reading measure never over 64ch; 4px spacing scale; `borderRadius` 3, never pills;
`font-variant-numeric: tabular-nums` on every number column.

---

## 12. Accessibility

WCAG 2.2 AA. Full keyboard operation. Visible focus: 2px `--brass` ring at 3px offset. One `<h1>` per
page. Filters are real `<button aria-pressed>`. Landmarks: `<nav>`, `<main>`, `<aside>`. Every colour cue
has a text label beside it. Body text at least 7:1 against `--ground`. No horizontal scroll at 360px.

---

## 13. What must NOT be built

No login or accounts · no database · no comments, sharing or social features · no AI-generated imagery ·
no article reader view · no embedded video player · no infinite scroll · no streaks, badges or points ·
no email digest in v1 · no analytics of any kind · no light theme · **no auto-archiving, auto-expiry or
retention limits of any kind**.

---

## 14. Build order

Stop after each step and show me.

1. **Scaffold** — Next.js, TypeScript, AntD with the registry, `globals.css`, `lib/theme.ts`, the three
   fonts. One page proving the dark theme and all three faces render.
2. **Rail and layout** — grouped nav with live counts from the JSON, responsive collapse, footer status.
3. **Latest** — read the seeded `news.json`, story rows, importance bars, date-group headers, the
   "new since last visit" rule, filters, archive control, the Deadlines aside. No caps.
4. **Books** — grid, Open Library covers with the typographic fallback, filters, detail drawer,
   free/buy handling with `freeBasis`.
5. **Articles, Talks, Podcasts** — three list layouts sharing two components.
6. **References and People** — the reference tiles with the `learn` line, design-system filter first,
   and the People ↔ Books cross-links working in both directions.
7. **Courses and Work** — the courses grid with the recognition rule enforced, then the three Work tabs
   including the screening block rendered in full.
8. **Notes** — `notesStore.ts`, add/edit drawer, tag filters, Markdown export and import.
9. **The refresh job** — `scripts/fetchNews.ts`, `lib/scoring.ts` with unit tests, both GitHub Actions,
   and `verifyLinks.ts`. Run it once for real and commit the output.
10. **Motion pass** — the four moments in §11, with the reduced-motion path tested.
11. **The optional AI line** — behind `GEMINI_API_KEY`, with the no-key path tested first.
12. **Deploy** — Vercel or Cloudflare Pages; confirm the cron commit triggers a rebuild.

---

## 15. Acceptance criteria

1. `npm run build` produces a static site with no type errors.
2. Latest renders every story in `news.json` — no cap, no truncation — grouped by date, filters working.
3. Running `npm run fetch:news` twice **adds** stories and never removes or reorders existing ones, and
   preserves every `archived` and `read` flag.
4. Nothing anywhere in the codebase deletes, expires or hides content on a schedule.
5. The site builds and runs correctly with **no `GEMINI_API_KEY` set**.
6. Every free book links to its `freeUrl` and shows its `freeBasis`. No book without `freeUrl` shows a
   free badge.
7. No course displays a recognition claim without `recognitionEvidenceUrl`.
8. The halal screening block renders in full, unedited, at the top of the Income ideas tab.
9. `npm run verify:links` HEAD-checks every URL in `/data` and exits non-zero on a broken link or an
   unresolved `bookIds` / `citedBy` id.
10. Notes survive a reload; export produces valid Markdown; import restores an export exactly.
11. Keyboard-only: reach and operate every control on every page.
12. Lighthouse accessibility ≥ 95. No horizontal scroll at 360px.
13. No component contains a hard-coded hex colour.
14. Nothing on screen lacks a source and an outbound link.

---

## 16. Notes on the seed data

- `sources.json` — 91 entries, 76 enabled. Stale and blocked ones are kept as a record, never fetched.
  Figma's blog, It's Nice That, The Verge Design and Ars Technica AI are marked `blocked` because their
  robots.txt or server refuses automated access — respect that, do not work around it.
- `books.json` — 48 titles, 7 legally free with the basis recorded. No ISBNs: they were not verified, and
  a wrong ISBN shows the wrong cover. Resolve covers by `coverQuery`.
- `articles.json` — 40 essays, all fetched and confirmed freely readable.
- `references.json` — 91 entries across 17 kinds, including 16 official design systems.
- `talks.json` / `podcasts.json` — several entries deliberately have `youtubeSearch` instead of `url`.
- `people.json` ↔ `books.json` are cross-linked. Keep them in sync.
- `courses.json` — prices and recognition wording are transcribed from the official pages. Do not round,
  convert or paraphrase them.
- `opportunities.json` — competitions, awards, events and one tracker, with dates as published.
- `ideas.json` — income ideas, ventures, and the screening block.
- `news.json` ships with one sample story so the first build renders. The first real fetch replaces it.
