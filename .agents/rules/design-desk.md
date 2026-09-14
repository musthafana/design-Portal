---
description: Always-on constraints for the Design Desk build. Non-negotiable rules that apply to every task in this workspace.
activation: always-on
---

# Design Desk — standing rules

The full brief is `BUILD_PROMPT.md` in the workspace root. Read it before any build task.
These rules apply on every turn, even when the brief is not in context.

## Content

1. **All content is already chosen and sits in `/data`.** 13 JSON files. Never add, invent or "improve"
   a book, source, reference, course, talk, person, competition or income platform. Never fill a missing
   field by guessing.
2. **A missing field is deliberate.** No ISBN, no price, no deadline means it could not be verified.
   Render nothing, or render the accompanying note verbatim. Never substitute "Free", "Contact us",
   "TBD" or an estimate.
3. **Store links, not content.** Title, source, date, URL, and an excerpt of at most 300 characters.
   Nothing is re-hosted, embedded, proxied or copied.
4. **Never link to a pirated or unlicensed copy of anything.** A book is free only if it has `freeUrl`
   and `freeBasis`. A book without `freeUrl` is a purchase — do not go looking for a PDF.
5. **Attribution on everything rendered** — source name, date, and an outbound link with
   `target="_blank" rel="noopener noreferrer"`.
6. **No recognition claim without evidence.** A course card renders its `recognition` line only when
   `recognitionEvidenceUrl` is present. Otherwise show "recognition not verified". Where the data records
   that a programme is *not* accredited, display that plainly — do not soften it.
7. **Prices are transcribed, not interpreted.** Never round, convert currency, or paraphrase a
   `priceNote`. Where `price` is null, show the `priceNote` verbatim.
8. **The halal screening block in `ideas.json` renders in full, unedited**, at the top of the Income
   ideas tab. Do not shorten, paraphrase or soften it, and do not drop its opening qualifier.

## Behaviour of the site

9. **No caps, anywhere.** No maximum number of stories, sources, books, references, talks or anything
   else. Volume is handled by grouping, filtering and importance flags — never by discarding.
10. **Nothing is archived, expired, hidden, pruned or deleted automatically. Ever.** No retention window,
    no rolling purge, no age-based cleanup, no "keep last N" logic anywhere in the codebase. Items persist
    until the user archives them by hand. If a performance problem appears, split files by month and read
    an index — never delete.
11. **The news job appends.** `fetchNews.ts` adds to `news.json` and preserves every existing story with
    its `archived` and `read` flags intact. It never truncates, reorders or prunes.
12. **Latest is a stream, not a daily edition.** Newest first, grouped by sticky date headers, with a
    "new since your last visit" marker. No daily reset.
13. **No infinite scroll.** Long lists paginate or load on an explicit "Show more" click.
14. **The site must build and run correctly with no `GEMINI_API_KEY` set.** Build and test that path
    first; the AI `whyItMatters` line is optional enrichment only.
15. **A failing source never fails the run.** Log it, skip it, carry on.
16. **Respect blocked sources.** Feeds marked `blocked` in `sources.json` refuse automated access. Never
    fetch them and never work around the block.

## Not to be built

17. No login or user accounts. No database. No comments, sharing or social features. No AI-generated
    imagery. No article reader view. No embedded video player. No streaks, badges or points. No email
    digest in v1. **No analytics of any kind.** No light theme and no theme toggle.

## Design

18. **Dark only.** Ink black `#0B0C0E` ground, warm brass `#C79A4B` as the single accent, ember `#DE6349`
    reserved for the must-see flag and deadline warnings and nothing else.
19. **No hard-coded hex values in any component.** Every colour comes from a CSS custom property or an
    Ant Design token. This is checkable and will be checked.
20. **Three typefaces, three roles.** Instrument Serif for display, Archivo for text, IBM Plex Mono for
    machine-generated values — dates, sources, counts, category and importance labels. Never mix roles.
21. **Colour is never the only carrier of meaning.** Every state also has a text label.
22. **Motion: four moments only** — page load, route change, filter reflow, hover. Nothing loops, nothing
    animates on scroll, nothing autoplays. Every duration collapses to 1ms under
    `prefers-reduced-motion: reduce`.
23. No glassmorphism, no gradients as decoration, no card with a radius over 3px, no pills.

## Accessibility

24. WCAG 2.2 AA. Full keyboard operation. Visible focus: 2px brass ring at 3px offset. One `<h1>` per
    page. Filters are real `<button aria-pressed>`. Landmarks: `<nav>`, `<main>`, `<aside>`. Body text at
    least 7:1 against the ground. No horizontal scroll at 360px.

## Working method

25. **Follow the build order in `BUILD_PROMPT.md` §14. Stop after each step and show the result.**
    Do not run ahead.
26. When the brief and any other source disagree, the brief wins. When I disagree with the brief, ask.
27. Prefer editing an existing file over creating a parallel one. Do not restructure the repo without
    saying why first.
28. Every step ends with `npm run build` passing and no TypeScript errors.
