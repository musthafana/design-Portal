# Design Desk — the arrival sequence

A brief for the cover page. Build this **after §14 step 3 of `BUILD_PROMPT.md`** — the scaffold, the
nav and `/latest` exist; the other eight sections do not yet. §3a below says exactly how to handle
that. Same repo, same tokens, same `.agents/rules/design-desk.md` applies.

When this is finished and merged, the build returns to §14 step 4 and continues in order. Do not
build any section pages here — this task ends at the front door.

---

## 0. The one rule that makes this work

**The journey plays once.** On a first visit the full sequence runs — forest, crossing, island.
After that, the island *is* the home page: you land directly on it, no scroll journey, with a small
**Travel again** control in the corner for when you want it.

This is not a compromise, it is what keeps the thing beautiful. A twenty-second cinematic between you
and your morning reading is enchanting on day one and a toll booth by day four. Store `hasArrived` in
`localStorage`; honour it from the second visit onward.

Everything below is built with that in mind: **Act III is the permanent home page**, Acts I and II are
the door you walk through the first time.

---

## 1. What it is

A scroll-driven passage through a dark forest, across water, to an island where the landmarks *are* the
navigation. Each building on the island is one section of the site. The map is the menu.

It runs at `/` in the existing Next.js app. No separate project, no separate deploy.

---

## 2. The three acts

### Act I — The Threshold  (scroll 0 → 25%)

Near-black. Cold blue-grey fog at ground level. Layered tree silhouettes receding into depth — the
near ones almost black, the far ones dissolving into the fog. A path, barely visible, running forward.

The camera drifts forward slowly. Particles — slow motes, not snow — drift across the frame at
different depths. Occasional faint firefly points, warm, far apart, never more than five on screen.

The title resolves out of the mist rather than fading in: start at high blur and low opacity, resolve
to sharp over the first 800ms. Set in the display serif at 64–88px.

> **Design Desk**
> *Ninety-one sources. Forty-eight books. One quiet room.*

A small mono line at the bottom: `scroll to enter` with a slow 2s pulse. It disappears the moment the
user scrolls.

Colour: `--ground` #0B0C0E through cold blue-black. Fog tinted #1A2128. Nothing warm yet.

### Act II — The Crossing  (25 → 60%)

The trees thin and part. Water — black, barely moving, catching a low sheen. Across it, the island
emerges from fog: first a silhouette, then form.

The camera keeps moving forward. This is the temperature shift — fog tint moves from cold blue
(#1A2128) to warm brass haze (#2A2218), light sources warm toward `--brass` #C79A4B. Cold to warm is
the whole emotional arc of the sequence: unknown to arrival.

Mist rolls across the water at two speeds and two depths. Reflections of the island's lights break on
the surface.

Nothing is clickable during Acts I and II except **Skip** — always visible, top right, always keyboard
reachable.

### Act III — The Island  (60 → 100%, and every visit after the first)

Arrival. The island resolves fully. Eight landmarks, each softly lit from within, each a link.

Hovering a landmark: its light strengthens, a thin brass line draws from it to a label card showing the
section name, a one-line description, and its live count from the JSON. Clicking navigates.

Ambient life at low intensity — a slow drift of lantern light, fireflies near the treeline, water
moving. Nothing loops visibly. Nothing demands attention.

At the bottom: **Enter the Desk →** which goes straight to `/latest` for anyone who would rather skip
the map entirely.

---

## 3. The landmarks — this is the important part

Each landmark maps to a real section. The island is not decoration, it is the information architecture
rendered as a place. Build them as distinct silhouettes, readable at a glance even at low contrast.

| Landmark | Goes to | Form | Label copy |
|---|---|---|---|
| **The Watchtower** | `/latest` | Tall tower, lit window at the top, facing the water | *What arrived while you slept* |
| **The Library** | `/books` | Low stone hall, many small warm windows | *48 books. Seven you can read free tonight.* |
| **The Reading Room** | `/articles` | Small annexe joined to the Library by a lit path | *40 essays that shaped the field* |
| **The Amphitheatre** | `/talks` | Open-air stone semicircle facing the sea | *Talks worth an hour* |
| **The Signal Hut** | `/podcasts` | Small hut, aerial, slow pulsing light | *For the commute and the long export* |
| **The Archive** | `/references` | Cut into the rock, a lit doorway | *91 places to go looking* |
| **The Hall of Makers** | `/people` | Colonnade, figures between the columns | *The 28 the shelf is built from* |
| **The Workshop** | `/work` + `/courses` | Forge with a warm glow and a chimney | *Where the craft turns into a living* |
| **The Cartographer's Table** | `/notes` | Lit table on the headland, papers weighted down | *What you kept* |

Nine landmarks, ten sections — Work and Courses share the Workshop and split on arrival. That is
deliberate: nine reads as a place, twelve reads as a menu.

### 3a. Links to sections that do not exist yet

At this point in the build only `/latest` is real. Every other `href` in the table above would 404.

Do not weaken the landmarks to work around this — **every landmark stays a real `<a>` with its real
final `href` from day one.** Instead, create a minimal placeholder route for each missing section as
part of this task: `app/books/page.tsx`, `app/articles/page.tsx`, `app/talks/page.tsx`,
`app/podcasts/page.tsx`, `app/references/page.tsx`, `app/people/page.tsx`, `app/courses/page.tsx`,
`app/work/page.tsx`, `app/notes/page.tsx`.

Each placeholder is one screen inside the existing layout and rail: the section name in the display
serif, one mono line reading `Being built.`, and a text link back to `/latest`. No fake content, no
skeleton loaders, no "coming soon" graphics — a quiet held space, nothing more.

These files are **temporary and will be overwritten** by §14 steps 4–8. Add this exact comment as the
first line of each placeholder so they are never mistaken for finished work:

```tsx
// PLACEHOLDER — replace wholesale in BUILD_PROMPT.md §14 step 4–8. Do not build on top of this.
```

The landmark labels in the table above are written for the finished site and stay as written — the
label is a promise about the place, not a report on today's state.

---

## 4. Stack

| Layer | Choice | Why |
|---|---|---|
| Scene | **React Three Fiber** (`@react-three/fiber`, `@react-three/drei`) | Procedural — no art assets needed to get a beautiful first version. Instanced tree geometry, fog, particles. |
| Scroll | **Lenis** for smooth scroll + **GSAP ScrollTrigger** for the camera timeline | Scroll drives a single camera path; do not hijack scroll, only follow it. |
| Landmarks | **DOM overlay**, absolutely positioned, projected from 3D coordinates each frame | Real `<a>` elements: keyboard reachable, screen-reader legible, right-clickable. Never make a landmark a raycast-only mesh. |
| Fog & atmosphere | `fogExp2` plus a custom shader pass for the ground mist | Cheap and convincing. Volumetric fog is not worth the frame cost. |
| Sound | Web Audio, **muted by default** | See §7. |

`npm i three @react-three/fiber @react-three/drei lenis gsap`

The package is **`lenis`**, not `@studio-freight/lenis` — that name was frozen at 1.0.42 when the
library was renamed. React bindings ship inside it at `lenis/react`; no separate `react-lenis`.

### The landmark overlay — do not use drei's `<Html>`

`<Html>` is the obvious choice and it is the wrong one here. It portals **each** element into its own
absolutely-positioned wrapper, in scene-mount order, which fixes tab order to scene order — §6 requires
reading order. Its `occlude` mode raycasts, which §4 forbids. And every link lives inside the canvas
container, so a WebGL init failure takes the whole navigation with it.

Build it instead as **one `<nav>`, a sibling of `<Canvas>`, never a child.** Its nine `<a>` elements are
authored once in reading order. A single `useFrame` callback projects each landmark's world position
with `vector.project(camera)`, converts to pixels, and writes `transform: translate3d(...)` to that
element via a ref — nine style writes per frame, no React state, no re-render. Elements behind the
camera or outside the frustum get `opacity: 0` and `pointer-events: none`, but stay in the DOM and stay
focusable.

This also gives §6's *focus moves the camera* almost for nothing: the `<nav>` owns the focus events, so
`onFocus` on a link eases the camera toward that landmark's position. And if the canvas never mounts,
the navigation is still there and still works.

**Everything is procedural first.** Trees are instanced extruded silhouettes with randomised scale and
rotation, not models. The island is low-poly geometry with emissive windows. This means the sequence
works the day it is built, with no asset pipeline — and you can replace any piece with your own art
later without touching the code structure.

---

## 5. Performance budget — hard numbers, not aspirations

This runs on a phone on hotel wifi, or it does not ship.

- **First contentful paint ≤ 1.5s.** Act I's first frame is a static poster image; the 3D scene mounts behind it and cross-fades in when ready.
- **Total journey payload ≤ 2.5 MB**, lazy-loaded after first paint.
- **60fps desktop, 30fps floor on a mid-range phone.** Measure, don't assume.
- **Tree instance count**: 400 desktop / 120 mobile. Particles: 200 / 60.
- **Device pixel ratio capped at 2**, and at 1.5 on mobile.
- **Pause all rendering when the tab is hidden** (`document.visibilitychange`) and when the canvas is out of viewport.
- **Mobile gets a reduced build**: fewer depth layers, no custom mist shader, shorter camera path. Not a different design — the same design with the expensive parts removed.

If the frame rate drops below 24fps for two consecutive seconds, degrade automatically: cut particles,
then instances, then the mist shader, in that order. Log it, don't announce it.

---

## 6. Accessibility — non-negotiable, per rule 24

- **`prefers-reduced-motion: reduce`** → no journey at all. Land directly on a static Act III composition, fully lit, all nine landmarks present and linked. This is a complete experience, not a fallback apology.
- **Skip** is the first focusable element on the page. Visible, not hidden until focus.
- **Every landmark is an `<a>`** with real `href` and an accessible name: *"The Library — Books, 48 titles"*. Tab order runs in reading order, not scene order.
- **Focus moves the camera.** Tabbing to a landmark eases the camera toward it, so keyboard users see what they have selected.
- **Full keyboard path**: Tab to a landmark, Enter to navigate, Escape to skip to `/latest`.
- Scene text sits in the DOM, never rendered into the canvas as geometry.
- The canvas gets `role="img"` and an `aria-label` describing the scene once.

---

## 7. Sound

Off by default, and the control is visible from the first frame — never autoplay, never ask.

If enabled: a low forest bed (wind, distant water) in Act I, crossfading to water and faint lantern
creak in Acts II–III. Under −24 LUFS. One file, looped, ≤ 400 KB, loaded only when the user turns it on.

No music. No sudden sounds. No sound on hover.

---

## 8. Assets — now and later

**Version one needs no art.** Everything is generated: silhouettes from extruded shapes, fog from
shaders, island from low-poly geometry with emissive materials.

**When you want to upgrade it**, these are the seams to replace, in order of impact:
1. Tree silhouettes → your own SVG or alpha-mapped PNG layers (biggest visual gain per hour)
2. The island → a modelled or AI-generated matte painting, used as a textured plane
3. Sky and fog gradient → a hand-painted ramp
4. A rendered video for Act I–II, scrubbed by scroll, with Act III staying live DOM

Option 4 is worth knowing about: it is the highest visual ceiling and you have After Effects and AI
video generation already. Keep Act III interactive whichever route you take — the landmarks must stay
real links.

Keep each seam behind a single component so swapping art never means rewriting the scroll logic.

---

## 9. Build order

Stop after each and show me.

0. **Placeholder routes** — the nine stubs in §3a, so nothing the island links to can 404. Small, fast, first.
1. **Route and skeleton** — `/` renders a full-height canvas, Lenis scroll, a GSAP timeline with the camera moving along a fixed path. Grey boxes for trees. Prove the scroll drives the camera smoothly.
2. **Act I** — instanced trees, fog, particles, the title resolving out of blur, the scroll cue. Tune until it feels like standing still in a wood at night.
3. **Act II** — the treeline opening, water plane, island silhouette emerging, the cold-to-warm shift.
4. **Act III** — the island resolved, nine landmark meshes, DOM overlay projecting labels, all links working.
5. **The once-only rule** — `localStorage` arrival flag, direct-to-Act-III on return, **Travel again** control.
6. **Accessibility pass** — reduced-motion route, skip, keyboard, focus-moves-camera, labels.
7. **Performance pass** — mobile build, instance counts, DPR cap, visibility pause, auto-degrade. Measure on a real phone.
8. **Sound** — optional, off by default.

---

## 10. Acceptance criteria

1. `npm run build` passes, no type errors, no console warnings in production.
2. First visit plays the full journey. Second visit lands on Act III with no journey.
3. **Travel again** replays it and does not break the back button.
4. All nine landmarks are real `<a>` elements with their real final `href` and accessible names —
   and every one of those routes resolves, via the §3a placeholders where the section is not built yet.
5. Keyboard alone can reach every landmark and navigate to every section.
6. `prefers-reduced-motion` gives a complete static island with all links, no motion at all.
7. 30fps or better on a real mid-range phone through the whole journey.
8. First contentful paint under 1.5s on a throttled 4G profile.
9. Rendering stops when the tab is hidden.
10. Sound is off until the user turns it on.
11. Nothing in the scene uses a hard-coded colour — all from the tokens in `BUILD_PROMPT.md §11`.
12. Skipping the journey lands on `/latest` in under 300ms.
13. No landmark 404s. Clicking all nine in turn returns to the island each time.
14. Every §3a placeholder carries the PLACEHOLDER comment on its first line.

---

## 11. What not to build

No scroll hijacking — follow the scroll, never fight it. No loading screen with a percentage. No
autoplaying sound. No cursor trail. No parallax on the landmark labels. No "scroll down" arrow that
bounces forever. No text baked into the canvas. No landmark that is only reachable by mouse. And no
second cinematic anywhere else in the site — this is the front door, and a front door is the only place
that gets one.
