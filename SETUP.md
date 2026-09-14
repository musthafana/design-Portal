# Antigravity setup — where everything goes

## 1. Folder layout

Make one folder for the project and put these in it. `/data` and `.agents` go **inside** it, not beside it.

```
design-desk/                        ← create this folder, add it as the Antigravity project
├── BUILD_PROMPT.md                 ← the full brief. Repo root. The agent reads it when told to.
├── SETUP.md                        ← this file. You only. The agent doesn't need it.
├── .agents/
│   └── rules/
│       └── design-desk.md          ← the standing rules. Set to Always On (see step 3).
└── data/                           ← all 13 JSON files, unchanged
    ├── sources.json                91 feeds, 76 enabled
    ├── news.json                   1 sample story, replaced on first fetch
    ├── books.json                  48
    ├── articles.json               40
    ├── references.json             91
    ├── people.json                 28
    ├── talks.json                  16
    ├── podcasts.json               8
    ├── courses.json                28
    ├── work.json                   21
    ├── ideas.json                  11 income + 8 ventures + screening
    ├── opportunities.json          15
    └── careerKeywords.json         scoring vocabulary
```

**Why the brief is not a rules file.** Antigravity caps rules files at 12,000 characters. `BUILD_PROMPT.md`
is about 26,000, so it lives in the repo root as a normal file and you point the agent at it.
`design-desk.md` is 5,400 characters — it fits, and it holds only the things that must never be forgotten.

## 2. Create the project

Left sidebar → the folder icon with **+** → **New Project** → **Add Folder** → pick `design-desk` → **Create**.

## 3. Turn the rules on

Open the rules panel and set `design-desk.md` to **Always On**, not Model Decision. These are constraints,
not suggestions — you do not want the model deciding whether they apply today.

## 4. The first message

Type exactly this:

```
/goal Read BUILD_PROMPT.md in the workspace root, in full, before doing anything.

All content is already chosen and sits in /data — 13 JSON files, every URL verified.
Do not add, invent or substitute any content. Do not fill a missing field by guessing.

Then do STEP 1 ONLY from §14 Build order: scaffold Next.js 15 (App Router, TypeScript)
with Ant Design v5 via @ant-design/nextjs-registry, globals.css with the tokens from §11,
lib/theme.ts, and the three Google fonts loaded with next/font/google.

Build one page that proves the dark theme renders and all three typefaces are actually
loading — not falling back. Then stop and show me. Do not start step 2.
```

The `/goal` command tells it to run to completion without asking for intermediate input, which is what
you want inside a single step. If you would rather it interrogate the plan before writing code, use
`/grill-me` instead for step 1 — it asks questions back until it is aligned.

After each step, the next message is just:

```
Step N passed review. Do STEP N+1 only from §14, then stop.
```

## 5. Which model

Antigravity's current lineup, from its own docs:

| Model | Tier | Good for |
|---|---|---|
| **Claude Opus 4.6 (thinking)** | Free–Pro (not Enterprise) | Architecture, the scoring module, the design system |
| **Claude Sonnet 4.6 (thinking)** | Free–Pro (not Enterprise) | Component work where fidelity still matters |
| **Gemini 3.1 Pro** | All plans | Long-context work, the bulk of the build |
| **Gemini 3.8 / 3.7 / 3.6 Flash** | All plans | Repetitive components, small fixes, saving quota |
| GPT-OSS-120b | Free–Pro | Skip it for this |

**What I would actually do**, given there are weekly and five-hour usage limits and the good models burn
them fastest:

- **Steps 1–3** (scaffold, rail, the Latest stream) — **Claude Opus 4.6 (thinking)**. These set the token
  system, the layout spine and the stream logic. Everything after copies their pattern, so a sloppy step 1
  costs you all twelve.
- **Steps 4–8** (Books, Articles, Talks, Podcasts, References, People, Courses, Work, Notes) —
  **Gemini 3.1 Pro**, dropping to **3.8 Flash** for the repetitive ones. The spec is explicit and the
  components are similar; this is where you save your Claude quota.
- **Step 9** (the fetch job, scoring, unit tests) — back to **Claude Opus 4.6 (thinking)**. This is the
  only genuinely tricky logic in the build, and the append-never-delete rule is easy to get subtly wrong.
- **Step 10** (motion) — **Claude Sonnet 4.6**. Enough for four transitions.
- **Steps 11–12** (optional AI line, deploy) — **Gemini 3.8 Flash**.

Model choice is locked for the duration of one message, so switch between steps, not mid-step.

One caveat worth knowing: there has been at least one user report on Google's own developer forum arguing
that the model labels in the picker do not always match the model actually serving the request. I have not
verified that and it may well be wrong or since fixed — but if output quality suddenly drops on a model
you picked for being strong, that is a possible explanation rather than your prompt being at fault.

## 6. Before you start

- Node 20 or newer.
- Nothing else. No API keys — the site is designed to build and run with none. The optional
  `GEMINI_API_KEY` for the one-line "why this matters" is step 11, and only if you want it.

## 7. When it goes wrong

- **It starts inventing books, sources or prices.** The rules file is not Always On, or it ran ahead of
  the brief. Say: *"Stop. Re-read `.agents/rules/design-desk.md` rules 1–8 and revert anything you added
  that is not in /data."*
- **It adds a cleanup or retention job.** Point it at rule 10 and criterion 4. This is the single most
  likely thing for a model to add helpfully and wrongly.
- **It runs ahead of the build order.** Say: *"You did more than one step. Show me only step N; park the
  rest."* Then review that step properly before continuing.
- **Colours drift.** Rule 19 — no hard-coded hex in any component. Ask it to grep for `#` in
  `components/` and fix what it finds.

## 8. Moving it to a server later

The build is static, so hosting is easy when you want it on your phone: push to GitHub, connect the repo
to Vercel or Cloudflare Pages, done. The GitHub Action that refreshes the feeds commits to the repo, which
triggers a rebuild — so the live site updates itself four times a day with no server to run.

The one thing to change at that point: notes live in browser storage in v1, so they stay on one device.
When you host it, that is the moment to add a small sync. The code is written behind a `NotesStore`
interface specifically so that swap does not touch any component.

## 9. If you run low on quota

Antigravity is itself the IDE — a code editor with the agent built in — so it is not a choice between
"an IDE or Antigravity". If you would rather stay in VS Code or a JetBrains editor, there is an
**Antigravity for IDEs** extension, and an **Antigravity CLI** for the terminal. Same agent, three surfaces.

**You are not locked in either way.** `BUILD_PROMPT.md`, the rules file and `/data` are plain Markdown and
JSON. They work as-is in Cursor, GitHub Copilot, Claude Code, Gemini CLI or any other agentic tool. If
Antigravity annoys you, move the folder and carry on.

**On running out of tokens.** Per Antigravity's own plans page: Gemini 3.1 Pro and Gemini 3.8 Flash are
available on **every** tier including Standard. Standard gets "meaningful quota, refreshed weekly";
Pro and Ultra get "high, generous quota, refreshed every five hours until weekly limit reached", plus
purchased AI credits for overages. There is no bring-your-own-key option. The docs are inconsistent about
which tiers get Claude — the models page says Free through Pro, the plans page says Ultra includes
third-party models — so check what your own picker actually offers rather than trusting either page.

**The build does not need Claude.** The brief is written to be explicit precisely so a mid-tier model can
follow it: exact tokens, exact file names, exact acceptance criteria, one step at a time. **Gemini 3.1 Pro
can do the whole thing on its own.** Use Claude for step 1 and step 9 if you have it; if you don't, or if
you run out, keep going on Gemini and nothing is lost.

**Four habits that make the quota last:**

- Check `/usage` before starting a step, and `/credits` if you are on a paid tier. Decide with numbers.
- **Tell it which file to read.** `/data` is 259 KB across 13 files. If the agent re-reads all of them
  every turn it burns context for nothing. Say *"read only data/books.json for this step"*.
- **One step per conversation.** Start a fresh chat for each build step. A long thread carries every
  earlier turn into every later request, which is the single biggest quota drain.
- **Commit after every step passes.** If a step goes wrong you re-run one step, not the whole build.
