# Candid Brand System: Build Brief

> **Branch `brand-guidelines`:** the site on this branch follows the Figma section "Candid Brand Guidelines" (node 70:2): nine light-only pages, new copy and new site neutrals (the `--ui-*` tokens in `globals.css`). Where that design and this brief disagree, the design wins on this branch. The sections below still describe the six-page version and have not been rewritten.

This brief tells a coding agent everything it needs to build the Candid brand system sample as a website. The source design is a Figma file (page "Candid Brand System (Sample)"). This document is the source of truth for tokens, structure, copy and behavior.

---

## 1. What we are building

A small documentation website that presents a **sample brand system for Candid**, an owner's engineering firm for gas-fired power. It is a pitch piece: it shows Candid's cofounder what a brand system is and what it does for their website and customer materials.

- **Six pages:** Overview, Color, Typography, Visual language, Templates, Applications.
- **Layout:** fixed left sidebar navigation, a large page title band, content rows, previous/next footer.
- **Light mode by default**, with a Light/Dark switcher. Every color comes from tokens.
- **Feel:** calm, exact, technical. Engineering-drawing aesthetic. Restrained motion.

Audience for the site: Talha Faiz (cofounder, Candid) and his team. Prepared by Abdulqahar Usman.

---

## 2. Stack

- **Next.js** (App Router, TypeScript, `src/` directory, `@/*` import alias)
- **Tailwind CSS v4** (CSS-first config with `@theme`, no `tailwind.config.js`)
- **Framer Motion** (`framer-motion` package)
- **Fonts:** Geist and Geist Mono via `next/font/google`
- No UI library. No CMS. Content lives in the page files or small typed data files.

> **Important for the agent:** recent Next.js versions have breaking changes. Before writing code, read the docs bundled at `node_modules/next/dist/docs/` (especially layouts/pages, linking, fonts, and the guide "preventing-flash-before-hydration" for the theme script). Follow `AGENTS.md` if the scaffold creates one.

### Scaffold

```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
npm i framer-motion
```

---

## 3. Non-negotiable rules

1. **No em dashes anywhere** in copy, code comments or UI text. Use commas, colons, periods or "to".
2. **Never use raw hex in components.** Use semantic token utilities (`bg-canvas`, `text-fg`, `border-line`...). Raw primitives are only allowed on the Color page swatches and token table, which display them on purpose.
3. **Mono is used sparingly.** Geist Mono appears only on: drawing annotations, deliverable codes (D04, D05, OP-01), token names and hex values, and the URL in the browser mockup. Everything else (eyebrows, labels, table headers, stats, captions) is Geist.
4. **One Redline per view.** Red marks the one thing to look at. The only other red allowed in a view is the primary button.
5. **Red text uses `text-redline-text`**, never `text-redline`. (In light mode red text must be the darker Redline 600 for contrast.)
6. **Light is the default theme.** Dark is opt-in via the switcher.
7. Respect `prefers-reduced-motion`: no movement, only instant or opacity changes.
8. Accessible: semantic HTML, visible focus rings, AA contrast, the switcher is a proper radio group.

---

## 4. Design tokens

### 4.1 Color primitives (never change)

| Token | Hex | Notes |
|---|---|---|
| ink-950 | #0A0A0A | From Candid's current site |
| ink-900 | #111111 | |
| ink-850 | #171717 | |
| ink-800 | #1F1F1F | |
| ink-700 | #2B2B2B | |
| ink-600 | #3D3D3B | |
| ink-500 | #5E5E5A | |
| ink-400 | #8A8A85 | |
| ink-300 | #B4B4AE | |
| paper-200 | #DCDCD5 | |
| paper-100 | #ECECE6 | |
| paper-50 | #F6F6F2 | Light canvas |
| redline-600 | #C8401C | Red text on light (4.6:1 on paper-50) |
| redline-500 | #F2542D | Fills, lines, dark-mode text |
| redline-400 | #FF7A57 | |
| redline-100 | #FDE3DA | Tint, selection |
| draft-600 | #3566C8 | Drawing lines on light |
| draft-500 | #5B8DEF | |
| draft-300 | #9DBBF7 | Drawing lines on dark |
| stamp-600 | #177A45 | Verified on light |
| stamp-500 | #2FBF71 | Verified on dark |

### 4.2 Semantic tokens (switch per theme)

| Token | Light (default) | Dark | Tailwind name | Use |
|---|---|---|---|---|
| bg/canvas | paper-50 | ink-950 | `canvas` | Page and slide background |
| bg/surface | paper-100 | ink-900 | `surface` | Cards, panels, sidebar, title band |
| bg/raised | paper-200 | ink-800 | `raised` | Hover, selected, inputs, switcher track |
| border/default | paper-200 | ink-700 | `line` | Hairlines and dividers |
| border/strong | ink-300 | ink-600 | `line-strong` | Outlined buttons, chips, table chip outlines |
| text/primary | ink-950 | paper-50 | `fg` | Headings and body |
| text/secondary | ink-600 | ink-300 | `fg-2` | Supporting copy |
| text/muted | ink-500 | ink-500 | `fg-3` | Captions, metadata |
| text/on-accent | ink-950 | ink-950 | `on-accent` | Text on Redline fills |
| text/redline | redline-600 | redline-500 | `redline-text` | Red text: eyebrows, links, callout labels |
| accent/redline | redline-500 | redline-500 | `redline` | One key action or callout per view |
| accent/draft | draft-600 | draft-300 | `draft` | Drawing linework, charts, data |
| status/verified | stamp-600 | stamp-500 | `verified` | PE-stamped, verified, on track |
| line/drawing | ink-500 | ink-400 | `drawing` | Construction lines, boundaries |

### 4.3 Implementation (`src/app/globals.css`)

- Primitives as CSS variables on `:root`.
- Semantic variables on `:root, [data-theme="light"]` and on `[data-theme="dark"]`. Because they are attribute-scoped, **any element can force a theme** with `data-theme="dark"` and its children follow. This powers the side-by-side Light/Dark demos.
- Map semantic variables into Tailwind with `@theme inline` so utilities like `bg-canvas`, `text-fg-2`, `border-line`, `stroke-draft` exist.
- Add a `theme-scope` utility (sets `background-color: var(--bg-canvas); color: var(--text-primary)`) for forced-theme blocks.
- Add a `bg-blueprint` utility: 40px minor grid plus a heavier line every 200px, using `--grid-minor` (border/default at about 55%) and `--grid-major` (border/default).
- `::selection` uses redline-100 with ink-950 text.
- Body background/color transition 200ms, disabled under reduced motion.

Reference skeleton:

```css
@import "tailwindcss";

:root { --ink-950:#0a0a0a; /* ...all primitives... */ }

:root, [data-theme="light"] {
  --bg-canvas: var(--paper-50);
  --text-primary: var(--ink-950);
  --text-redline: var(--redline-600);
  --accent-draft: var(--draft-600);
  /* ...all semantic tokens, light values... */
  color-scheme: light;
}
[data-theme="dark"] {
  --bg-canvas: var(--ink-950);
  --text-primary: var(--paper-50);
  --text-redline: var(--redline-500);
  --accent-draft: var(--draft-300);
  /* ...all semantic tokens, dark values... */
  color-scheme: dark;
}
[data-theme] {
  --grid-minor: color-mix(in oklab, var(--border-default) 55%, transparent);
  --grid-major: var(--border-default);
}

@theme inline {
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
  --color-canvas: var(--bg-canvas);
  --color-surface: var(--bg-surface);
  --color-raised: var(--bg-raised);
  --color-line: var(--border-default);
  --color-line-strong: var(--border-strong);
  --color-fg: var(--text-primary);
  --color-fg-2: var(--text-secondary);
  --color-fg-3: var(--text-muted);
  --color-on-accent: var(--text-on-accent);
  --color-redline: var(--accent-redline);
  --color-redline-text: var(--text-redline);
  --color-draft: var(--accent-draft);
  --color-verified: var(--status-verified);
  --color-drawing: var(--line-drawing);
  /* type scale, see 4.4 */
}
```

### 4.4 Type tokens

Two families. Geist does almost everything. Geist Mono is for drawings and codes only.

| Style | Tailwind | Family / weight | Size | Line height | Tracking | Case | Use |
|---|---|---|---|---|---|---|---|
| Display XL | `text-display-xl` | Geist Medium | 144px (clamp 72 to 144) | 92% | -4% | | Hero statements, one per page |
| Display L | `text-display-l` | Geist Medium | 96px (clamp 56 to 96) | 98% | -3% | | Page titles, cover titles |
| Heading H1 | `text-h1` | Geist Medium | 56px (clamp 40 to 56) | 105% | -2% | | Slide and hero titles |
| Heading H2 | `text-h2` | Geist Medium | 36px (clamp 28 to 36) | 115% | -1.5% | | Section headings |
| Heading H3 | `text-h3` | Geist Medium | 24px | 125% | -0.5% | | Row and card titles |
| Body L | `text-body-l` | Geist Regular | 20px | 150% | -0.2% | | Lead paragraphs, row descriptions |
| Body M | `text-body-m` | Geist Regular | 16px | 155% | 0 | | Default body |
| Body S | `text-body-s` | Geist Regular | 14px | 150% | 0 | | Captions, table cells |
| Label | `text-label` | Geist Medium | 12px | 140% | +4% | UPPER | Eyebrows, small labels, table headers |
| Label Mono | `text-label-mono` | Geist Mono Medium | 12px | 140% | +8% | UPPER | Drawing labels and deliverable codes only |
| Code Mono | `text-code` | Geist Mono Regular | 14px | 150% | 0 | | Token names, hex values only |
| Data Stat | `text-stat` | Geist Medium | 64px (clamp 44 to 64) | 100% | -3% | | Big numbers: ±15%, 4 weeks, 350+ GW |

Define each in `@theme inline` using Tailwind v4 sub-properties, for example:

```css
--text-h1: clamp(2.5rem, 4.4vw, 3.5rem);
--text-h1--line-height: 1.05;
--text-h1--letter-spacing: -0.02em;
```

Weights are applied with `font-medium` / `font-normal`; uppercase with `uppercase`.

### 4.5 Spacing and shape

- Spacing scale (px): 4, 8, 12, 16, 24, 32, 40, 56, 80, 120. Use Tailwind defaults that match.
- Content width 1200px inside a 40px gutter. Rows: 76px top padding, 40px bottom.
- Corner radius: 2px for cards, chips, swatches, buttons (engineering-sharp). 4px for the browser mockup. Switcher track 8px, thumb 6px.
- Borders: 1px `border-line`. Card = `bg-surface border border-line rounded-[2px]`.

---

## 5. Theme switching

Follow the Next.js guide "How to prevent flash before hydration" (in the bundled docs).

- `<html lang="en" data-theme="light" suppressHydrationWarning>`.
- Inline script in `<head>` reads `localStorage["candid-theme"]` and sets `data-theme` before paint, wrapped in try/catch.
- `ThemeSwitcher` client component:
  - Reads the theme with `useSyncExternalStore` (server snapshot `"light"`), subscribing to a custom `candid-theme-change` event and `storage`.
  - On change: write localStorage, set `data-theme` on `<html>`, dispatch the event.
  - `useLayoutEffect` re-applies the stored theme once (React dev remount clears the attribute).
  - Markup: `role="radiogroup"` with two `role="radio"` buttons (Light with sun icon, Dark with moon icon), `aria-checked`.
  - Visual: track `bg-raised`, padding 3px, radius 8px. Selected thumb `bg-canvas border border-line`, subtle shadow `0 1px 2px rgb(0 0 0 / 0.08)`, radius 6px, animated with a Framer Motion `layoutId` (spring, stiffness 500, damping 38). Selected label and icon `text-fg`; unselected `text-fg-2`, hover `text-fg`. **Never red.**
- Place the switcher in the sidebar footer, and also on the Typography page header area (as in Figma).

---

## 6. Layout shell

```
┌──────────┬───────────────────────────────────────────┐
│ Sidebar  │ Title band (bg-surface)                    │
│ 232px    │   eyebrow / huge page title                │
│ sticky   ├───────────────────────────────────────────┤
│          │ Content (bg-canvas), rows of label + body  │
│          │ ...                                        │
│          ├─────────────────────┬─────────────────────┤
│          │ ← Previous page     │ Next page →         │
└──────────┴─────────────────────┴─────────────────────┘
```

### Sidebar (`bg-surface`, right border `border-line`)
- Top: "Candid" (Geist Semibold 15px, `text-fg`) with "Brand system" below (12.5px, `text-fg-3`).
- Nav list, in order: Overview `/`, Color `/color`, Typography `/typography`, Visual language `/visual-language`, Templates `/templates`, Applications `/applications`.
- Item: 14px, `text-fg-3`, hover `text-fg`; active `text-fg font-medium` with a 2px `bg-fg` indicator bar on the left animated via `layoutId`.
- Bottom: theme switcher, then "Prepared by Abdulqahar Usman" (11.5px, `text-fg-3`).
- Below 1024px: the sidebar becomes a top bar (brand left, switcher right) with a horizontally scrollable nav row underneath.

### Title band (`bg-surface`)
- Overview: two lines, "Candid" / "Brand system", in `text-display-xl`. Top row inside the band: "Candid" left (Semibold 17px), "Sample for review, November 2026" right (13px, `text-fg-2`).
- Other pages: the page title in `text-display-l`/`text-display-xl` sized to fit (e.g. "Visual language").
- Generous height (about 460px desktop, title anchored to the bottom).

### Content rows (`Row` component)
- Two columns, 588px each, 24px gap, stacking on mobile.
- Left: eyebrow (`text-label uppercase text-redline-text`, e.g. "01 / Company") then title (`text-h3 text-fg`).
- Right: description (`text-body-l text-fg-2`).
- Visual blocks (grids, tables, drawings) sit below a row at full 1200px width with 24px top padding.

### Footer
- Two halves: previous page (`bg-surface`) and next page (`bg-raised`), each with the page title (22px) and an arrow. Overview has no previous. Applications' next is "Back to overview".

---

## 7. Shared components

| Component | Spec |
|---|---|
| `Row` | See section 6. Props: `eyebrow`, `title`, `children` (description). |
| `Eyebrow` | `text-label font-medium uppercase text-redline-text`. Variant `muted` uses `text-fg-3`. |
| `Card` | `bg-surface border border-line rounded-[2px] p-6`. Optional code eyebrow, `text-h3` title, `text-body-s text-fg-2` body. Cards in a row share equal height. |
| `Button` | Primary: `bg-redline text-on-accent`, Geist Medium 15px, padding 12/18, radius 2. Secondary: transparent, `border border-line-strong text-fg`. |
| `Chip` | `border border-line-strong rounded-[2px] px-3 py-2 text-body-s text-fg` with a trailing "→" in `text-fg-3`. |
| `CodeTag` | Two cells inside one `border-line-strong` outline: code cell (`bg-raised`, `text-label-mono text-redline-text`, e.g. "D05") and name cell (`text-label-mono uppercase text-fg`, e.g. "PLOT PLAN"). |
| `StatCard` | Card with a 48x2 `bg-redline` rule, Label eyebrow, `text-stat` value, `text-body-m text-fg-2` caption. |
| `Reveal` | Framer Motion wrapper: fade in and rise 12px when scrolled into view, once, 0.5s, ease `cubic-bezier(0.2,0.7,0.2,1)`. Reduced motion: no transform. |
| `ThemeScope` | `<div data-theme="light|dark" className="theme-scope">` to force a theme on a demo block. |
| `PlotPlan` | The signature SVG drawing. See section 9. |

---

## 8. Page content

All copy below is final for the sample. Keep wording exactly unless a rule above forces a change.

### 8.1 Overview (`/`)

Title band: "Candid" / "Brand system".

1. **01 / Company: What Candid is.** Candid is an owner's engineering firm for gas-fired power. We take projects from concept to final investment decision in weeks, not months. Software tests every configuration, and PE-licensed engineers stamp the result.
2. **02 / Purpose: What this system is.** A kit of rules and ready-made parts: color, type, technical drawings and templates. It keeps every deck, one-pager and webpage recognizably Candid, even when no designer is in the room.
3. **03 / Audiences: Who it speaks to.** Owners pay for the work, but three other groups must trust it before a project moves. Every material should answer the question each of them is asking.
   - Four cards (code eyebrow, title, quote):
     - A1, Owners and developers: "Can we reach FID faster, with numbers our board will back?"
     - A2, EPCs: "Is this package good enough to price and build from?"
     - A3, Lenders and independent engineers: "Can we trust the cost, the schedule and the method?"
     - A4, Permitting agencies: "Is the design complete, consistent and properly stamped?"
4. **04 / Voice: How Candid sounds.** Calm, exact and technical. The brand earns trust the way an engineer does: by showing the work and putting a number on it.
   - Three cards:
     - V1, Show the work: Lead with deliverables, drawings and backtests. Proof does more than adjectives ever will.
     - V2, Say the number: ±15%, 4 weeks, 12 scenarios. Always give the stage and the unit, so the claim holds up.
     - V3, Engineer to engineer: Plain and direct. No "revolutionary", no "magic". Write it so a PE would sign it.
5. **05 / Note: About this sample.** This is a working sample to show the approach. Colors, type and visual rules are proposals built from Candid's current site, and would be refined with the team in the first sprint.

### 8.2 Color (`/color`)

1. **01 / Primitives: Palette.** Candid is light by default: warm paper whites, near-black ink and one sharp accent. Redline is the color engineers use to mark what changed, so we use it the same way: sparingly, to point at what matters. Draft blue is for drawings and data.
   - Three swatch groups, each with a Label heading ("INK", "PAPER", "SIGNAL"):
     - Ink: 950 ("Ink 950, text"), 900, 800, 700, 500, 300. Chip height 140px.
     - Paper: 200, 100, 50 ("Paper 50, canvas"). Chip height 120px.
     - Signal: Redline, Redline 600, Redline light (400), Redline tint (100), Draft 600, Draft (500), Draft light (300), Stamp 600, Stamp (500). Chip height 120px.
   - Swatch: color chip on top, then name (Geist Medium 16px) and hex plus token name in `text-code text-fg-3` (12px). Outline `border-line`, radius 2.
2. **02 / Balance: Proportion.** Mostly canvas. Accents are rare, so they carry meaning. If a page has more than one Redline element, one of them is probably wrong.
   - A 180px tall horizontal bar: Canvas 66% (paper-50, outlined), Surface 16% (paper-100), Ink 12% (ink-950), Draft 4% (draft-600), Red 2% (redline-500). Percent labels below in `text-label text-fg-3`.
3. **03 / Tokens: Semantic tokens.** Designs use these names, never raw hex values. Each token points to a primitive and switches automatically between Light and Dark.
   - Table columns: Token (mono) | Light (default) | Dark | Use. Each value cell shows a 20px swatch plus the primitive name in mono. Rows: every token from section 4.2 except text/on-accent and line/drawing. Header row in `text-label text-fg-3`, rows divided by `border-line`.
4. **04 / Screen and print: Color modes.** Two modes from one set of tokens. Light is the default, for the website, documents and print. Dark is for presentations, events and hero moments. Switch the mode and every color follows.
   - Two demo cards side by side, forced with `ThemeScope` (Light left, Dark right). Each: eyebrow "LIGHT (DEFAULT)" / "DARK", `text-h2` "Pre-FEED in 4 weeks.", body "Plot plan, heat balance, single-line, CAPEX and schedule, stamped by PE-licensed engineers.", and a stamp pill outlined in `border-verified` with `text-verified` text "PE STAMPED  D04 / D05 / D06" (the codes are mono).
5. **05 / Contrast: Accessibility.** Text on a Redline fill is always Ink 950 (5.7:1). White on Redline is only 3.5:1, so it fails. On light backgrounds, red text uses Redline 600 (#C8401C, 4.6:1); Redline 500 is for fills, lines and dark mode.

### 8.3 Typography (`/typography`)

Header area includes the Light/Dark switcher (top right of the content, as in Figma).

1. **01 / Families: Typefaces.** Geist does almost all the work: headlines, body copy, labels and numbers. Geist Mono is used sparingly, only where an engineer would expect it: drawing annotations, deliverable codes and token names. Both are free and open source.
   - Two specimen cards: "GEIST" with huge "Aa" (Display XL), subtitle "Headlines, body copy, labels and numbers", and the alphabet set A to Z, a to z, 0 to 9, ±%$ in `text-fg-3`. "GEIST MONO" with huge "D05" in Geist Mono, subtitle "Drawing annotations and deliverable codes only", same character set in mono.
2. **02 / Scale: Type scale.** Twelve styles cover every deck, document and page. Only two are mono, and they stay on drawings and codes. Each one is a Figma text style and a code token, so design and the website stay in sync.
   - One row per style: left column (300px) shows the style name (Geist Medium 16px) and its spec in `text-label text-fg-3` (e.g. "56 / 105%  -2%  MEDIUM"). Right column shows a live sample:
     - Display XL: "±15%"
     - Display L: "Concept to FID."
     - Heading H1: "Pre-FEED in 4 weeks."
     - Heading H2: "Backtested against built plants."
     - Heading H3: "PE-stamped, in your format"
     - Body L: "Software evaluates 12 configurations for your site. Engineers take the best one to the next gate."
     - Body M: "Vendor quotes and lead times keep cost and schedule current, right up to delivery."
     - Body S: "Estimate accuracy depends on stage. Class 4 at Pre-FEED, Class 3 at FEED."
     - Label: "Why Candid  ·  How it works  ·  The package"
     - Label Mono: "D05 plot plan  ·  Rev B  ·  Site A"
     - Code Mono: "HRSG duty 412.6 MMBtu/hr  ·  GT 2 × 7HA.02"
     - Data Stat: "350+ GW"
3. **03 / Usage: Rules.** A few rules keep the system consistent, even when someone outside design builds the slide.
   - Four cards:
     - T1, Mono, sparingly: Only on drawings, deliverable codes and token names. Never for headlines, stats or sentences.
     - T2, Numbers carry units: Write 4 weeks, ±15%, 500 MW. Give the stage with any accuracy claim.
     - T3, Sentence case: Headlines in sentence case. Small labels in uppercase Geist Medium, tracked +4%.
     - T4, One display line: Use a Display style once per page or slide. Let it carry the message.

### 8.4 Visual language (`/visual-language`)

1. **01 / Principle: Drawings are the brand.** Candid's work is drawings: plot plans, single-lines and heat balances. So instead of stock photos, the brand uses that linework as its main visual. It is honest, specific to the work, and hard for anyone else to copy.
   - Full-width `PlotPlan` (section 9) with the draw-in animation.
2. **02 / Linework: Line weights.** Three weights, borrowed from engineering drafting. Heavier lines are things that get built. Lighter lines explain them.
   - Rows with a 280px line sample, name, spec label, use:
     - Primary: 2px `draft`. "Equipment, buildings, anything that gets built"
     - Secondary: 1px `draft`. "Pipes, ducts, connections, leader lines"
     - Construction: 1px dashed 10/6 `drawing`. "Property lines, boundaries, centerlines, future scope"
     - Grid: 1px `line` at reduced opacity. "Background grid only. Never behind body text"
3. **03 / Labels: Annotation.** Labels explain the drawing without cluttering it. They follow one pattern everywhere: on drawings, in charts and on the website.
   - 300px tall `bg-blueprint` panel: an "HRSG-1" box (2px `draft`, `bg-surface`), a leader starting on a 4px dot at the box edge, running right then bending 45 degrees up to a label "DUTY  412.6 MMBTU/HR" with a second line "SUPPLEMENTARY FIRING  ·  OFF" (`text-fg-3`). Three numbered red markers (20px circles, `bg-redline`, number in `text-on-accent`) with a legend on the right:
     1. Name sits inside the object, top-left, 12px in.
     2. Leader: 1px, starts on a 4px dot, one bend at 45°.
     3. Value first, unit always. Second line for context.
4. **04 / Codes: Deliverable codes.** Candid already numbers its deliverables. We turn those codes into a visual system: tags that mark sections in decks, documents and on the website, so a reader always knows which part of the package they are looking at.
   - `CodeTag` row: D04 Heat and material balance, D05 Plot plan, D06 Single-line diagram, D16 CAPEX estimate, D17 Schedule.
5. **05 / Emphasis: Redline, once.** In drafting, red marks a change. In Candid materials it marks the one thing to look at: a revision, a saving, a key number. One Redline callout per view. The only other red allowed is the primary button.
   - Two cards. **DO** (pill outlined `verified`): three equipment boxes in `draft`, one dashed red ellipse around the middle one, label "−$4.2M  ·  REV B" in `text-redline-text`. Caption: "One callout. The reader knows exactly where to look." **DON'T** (pill outlined `redline`): two of three boxes outlined red, red labels "NEW", "UPDATED", "REVISED", "!!  SEE NOTE". Caption: "Everything is red, so nothing stands out, and it reads as an error."
6. **06 / Grid: Blueprint grid.** A 40px grid with a heavier line every 200px. Use it on covers, hero sections and behind diagrams to say "engineered" without a single word. Keep it off text-heavy pages.
   - 320px `bg-blueprint` panel with eyebrow "CONCEPT TO FID  ·  GAS-FIRED POWER" and `text-h1` "Months of engineering, done in weeks."

### 8.5 Templates (`/templates`)

1. **01 / Why: Templates, not one-offs.** Ready-made layouts for the materials the team makes most. Each one is built from the tokens on the previous pages, so anyone can make a deck or one-pager that looks right the first time.
2. **02 / Deck: Slide layouts.** Four layouts cover most sales and investor decks: open strong, prove it with numbers, explain the process, then show the deliverables.
   - 2x2 grid of 16:9 slide thumbnails (`bg-canvas`, outlined), each with a caption in `text-label text-fg-3`. Every slide has a footer: "CANDID" left, slide number right (Label, 8 to 9px).
     - **A · Title. Grid background, one claim.** `bg-blueprint` (24px grid). Eyebrow "OWNER'S ENGINEERING  ·  GAS-FIRED POWER". Title "Concept to FID, in weeks." Sub "PE-stamped Pre-FEED and FEED packages for owners and developers."
     - **B · Proof. Three stats, one in Redline.** Eyebrow "WHY CANDID", title "Faster, and it holds up." Three columns, each with a top rule, stat, label and caption: "4 wks" Pre-FEED "Concept to a stamped package"; "12 wks" FEED "Ready for EPC bids"; "±15%" Backtested "Against 14 built plants" (this one's rule and value in red).
     - **C · Process. Four steps on a timeline.** Eyebrow "HOW IT WORKS", title "From constraints to a stamped package." Horizontal line with four dots (last dot `verified`, others `draft`): 01 Your constraints "Site, interconnection, turbines"; 02 12 scenarios "Software tests every option"; 03 Live quotes "Cost and lead times stay current"; 04 PE-stamped "Delivered in your format".
     - **D · Deliverables. Codes beside a drawing.** Eyebrow "THE PACKAGE", title "What you take to your board." List with mono codes: D04 Heat balance, D05 Plot plan, D06 Single-line, D16 CAPEX, D17 Schedule. Right side: a small gridded drawing slot with three `draft` boxes, caption "D05  PLOT PLAN" (mono).
3. **03 / Parts: Components.** The parts that repeat across the website, decks and documents. Built once, reused everywhere, and ready to become code components on the website.
   - Three equal cards:
     - `StatCard`: "PRE-FEED", "4 weeks", "From your constraints to a PE-stamped package."
     - Proof card: eyebrow "BACKTEST  ·  14 BUILT PLANTS", 170px scatter chart (axes in `line-strong`, dashed diagonal in `fg-3`, 14 `draft` dots close to the diagonal), axis label "ESTIMATE VS ACTUAL INSTALLED COST", caption "Every estimate within ±15% of what the plant actually cost."
     - CTA card: eyebrow "FREE REVALIDATION", title "Send us a plant you have already built.", body "We run it blind and show you how close we land. No cost, no commitment.", primary button "Book a call", secondary button "Get sample deliverables".
4. **04 / Document: One-pager grid.** US Letter, 12 columns, 36pt margins. The same six zones every time, so a new one-pager is a matter of filling in the blanks. Light by default, Dark for presentations.
   - Left: a Letter-ratio wireframe (about 476x616) with 12 faint red columns (7% opacity) and six dashed `draft` zones labelled in mono: 1 HEADER · LOGO, DOC CODE; 2 CLAIM · DISPLAY + LEAD; 3 PROOF · THREE STAT CARDS; 4 PROCESS · FOUR STEPS; 5 DRAWING · D05 EXCERPT; 6 CTA + CONTACT.
   - Right: numbered notes:
     1. Header: Candid wordmark left, document code right (e.g. OP-01, REV A).
     2. Claim: one Display line and a two-sentence lead. The single most important message.
     3. Proof: three stat cards. Stage and unit on every number.
     4. Process: the four-step timeline from the deck, same order and wording.
     5. Drawing: a cropped excerpt of a real deliverable, labeled with its code.
     6. Call to action and contact. One Redline button, nothing else in red.

### 8.6 Applications (`/applications`)

1. **01 / Overview: The system at work.** Applied to what Candid needs most right now: the website and the customer materials. Same tokens, same type, same drawings.
2. **02 / Website: Website, hero.** The hero fixes three things: accuracy is stated per stage, so ±15% and ±40% no longer contradict each other; the drawing replaces generic imagery; and each audience gets its own path in.
   - A browser mockup (radius 4, outlined): bar with three dots and a URL pill "candid.engineering" (mono). Then:
     - Nav: "Candid" (22px) left; links Process, Proof, Deliverables, Security, FAQ centered; **secondary** button "Book a call" right.
     - Hero, two columns: left has eyebrow "OWNER'S ENGINEERING  ·  GAS-FIRED POWER", H1 "Months of engineering, done in weeks.", lead "Concept to FID for gas-fired power. Software tests every configuration for your site, and PE-licensed engineers stamp the package in your format.", buttons "Book a call" (primary) and "Get sample deliverables" (secondary), then "I AM AN" label and chips "Owner / developer", "EPC", "Lender / IE". Right has a scaled `PlotPlan`.
     - Stage strip, four equal cells divided by `border-line`: PRE-FEED "4 weeks" "Class 4 estimate, ±40%"; FEED "12 weeks" "Class 3 estimate, ±15%"; SCENARIOS "12" "Configurations tested per site"; DELIVERY "PE-stamped" "In your templates". All neutral (no red here, the red is the hero button and the drawing callout).
3. **03 / Customer materials: One-pager.** The same page in both modes. Light by default for print, PDF and email. Dark for presentations and events. Built on the one-pager grid, so the team can swap the claim, stats and drawing for each project.
   - Two one-pagers side by side (about 580x750 each), Light then Dark via `ThemeScope`, captions "LIGHT (DEFAULT)" and "DARK". Content:
     - Header: "Candid" left, "OP-01  ·  REV A" (mono) right, bottom border.
     - Eyebrow "OWNER'S ENGINEERING  ·  GAS-FIRED POWER", title "Concept to FID, in weeks.", lead "Pre-FEED and FEED packages for gas-fired power, produced with software and stamped by PE-licensed engineers. Built in your templates, ready for your board, lender and EPC."
     - Three stat boxes: PRE-FEED "4 wks" Class 4 estimate; FEED "12 wks" Class 3 estimate; BACKTESTED "±15%" vs. 14 built plants.
     - Process list (HOW IT WORKS, steps 01 to 04 with the deck wording; step 4 detail "D04 to D17, in your format") beside a cropped `PlotPlan` excerpt (230x180) captioned "D05  PLOT PLAN".
     - CTA bar: "Free revalidation" / "Send us a plant you have built. We run it blind." with primary button "Book a call".
     - Footer: "CANDID.ENGINEERING" left, "HOUSTON  ·  SAN FRANCISCO" right, Label size 8.

---

## 9. The PlotPlan drawing

A reusable SVG component, `viewBox="0 0 1200 640"`, `preserveAspectRatio="xMidYMid meet"`, scaling to its container. All colors via CSS variables so it follows the theme. Labels are `font-mono`, 12px, uppercase, letter-spacing 0.08em.

Elements (coordinates in the viewBox):

| Element | Spec |
|---|---|
| Background | `bg-canvas` with the blueprint grid (40px minor, 200px major) drawn as SVG lines or a pattern |
| Site boundary | rect 60,60 820x520, 1px `--line-drawing`, dash 10 6. Label "SITE A  ·  PROPERTY LINE" at 72,40 (`fg-3`) |
| GT-1, GT-2 | rects 160,140 and 160,330, 160x90, 2px `--accent-draft`, fill `--bg-surface`. Labels "GT-1  7HA.02", "GT-2  7HA.02" inside top-left (`fg`) |
| HRSG-1, HRSG-2 | rects 360,140 and 360,330, 150x90, same style. Labels inside |
| Stacks | circles r16 at 545,185 and 545,375 |
| ST-1 | rect 610,230 130x120, label "ST-1" |
| ACC | rect 560,460 280x80 with five r16 fan circles (1px) centered on y 500, x 600 to 800 step 50. Label "ACC  ·  5 CELLS" below (`fg-3`) |
| Switchyard | rect 760,90 100x120 with four vertical 1px bus lines. Label "SWITCHYARD  345 KV" below (`fg-3`) |
| Connections | 1px ducts GT to HRSG to stack; dashed 4 4 steam lines from each HRSG to ST-1; generator lead from ST-1 to the switchyard with one corner |
| Gas lateral | 2px dashed 14 6 line from the left edge at y 470 to x 240, then up into GT-2. Label "GAS LATERAL  ·  4.1 MI" (`fg-3`) |
| Dimension | 1px `fg-3` line from 60 to 880 at y 605 with end ticks, label "1,240 FT" centered (`fg-2`) |
| North arrow | circle r26 at 960,110 (1px `fg-3`), 2px `fg` arrow, "N" above |
| Revision callout | dashed (6 4) 2px Redline ellipse around the gap between GT-1 and GT-2 (x 120 to 360, y 225 to 335). A filled Redline triangle with "B" (on-accent) and the label "REV B: GT SPACING +20 FT" in `--text-redline`, placed between the HRSG rows without overlapping ST-1 |
| Title block | bottom-right panel at x 920, 240 wide, `bg-surface`, `border-strong` 1px, five rows divided by hairlines: "Candid" (Geist Medium 22px), "D05  PLOT PLAN", "SITE A  ·  2×1 CC", "SCALE 1:1000  ·  REV B", "PE STAMPED  ·  NOV 2026" (last in `--status-verified`) |

Animation (Framer Motion, client component, opt-in via an `animate` prop):
- When scrolled into view (once): equipment outlines draw in with `pathLength` 0 to 1 over 0.9s, staggered 0.06s; connections follow; labels fade in after; the Redline callout draws last (0.4s delay after the rest).
- Reduced motion: render the final state with no animation.
- Excerpts (one-pagers, website hero) render static.

---

## 10. Motion guidelines

- Purpose over decoration. Motion explains order (drawings drawing in) or confirms an action (switcher thumb).
- Durations: 150 to 250ms for UI feedback, 500 to 900ms for drawing reveals.
- Easing: `cubic-bezier(0.2, 0.7, 0.2, 1)` for reveals; springs for the switcher and the nav indicator.
- Page content rows use `Reveal` (fade plus 12px rise), once per element.
- Theme change: 200ms color transition on body; no other animation.
- Everything respects `prefers-reduced-motion`.

---

## 11. Suggested file structure

```
src/
  app/
    layout.tsx              # fonts, theme script, Shell
    globals.css             # tokens (section 4)
    page.tsx                # Overview
    color/page.tsx
    typography/page.tsx
    visual-language/page.tsx
    templates/page.tsx
    applications/page.tsx
  components/
    shell/  sidebar.tsx, theme-switcher.tsx, title-band.tsx, page-footer.tsx, shell.tsx
    ui/     row.tsx, card.tsx, eyebrow.tsx, button.tsx, chip.tsx, code-tag.tsx, stat-card.tsx, reveal.tsx, theme-scope.tsx
    drawings/ plot-plan.tsx, annotation-anatomy.tsx, redline-examples.tsx, scatter.tsx
    templates/ slide-title.tsx, slide-proof.tsx, slide-process.tsx, slide-deliverables.tsx, one-pager-grid.tsx
    applications/ website-hero.tsx, one-pager.tsx
  lib/
    nav.ts                  # page list + prev/next helper
    tokens.ts               # primitive + semantic token data for the Color page tables
```

Keep token data for the Color page (swatches, semantic table) in `lib/tokens.ts` so the page renders from data and stays in sync with `globals.css`.

---

## 12. Build order

1. Scaffold, fonts, `globals.css` tokens, theme script and switcher. Verify Light/Dark on a blank page with no flash on reload.
2. Shell: sidebar, title band, footer, `Row`, responsive behavior.
3. Overview and Color pages (tokens on display, forced-theme demo).
4. Typography page (scale from data).
5. `PlotPlan` component, then the Visual language page.
6. Templates page.
7. Applications page (reuses `PlotPlan`, `StatCard`, buttons, chips).
8. Polish: motion, focus states, mobile layout, metadata ("Candid Brand System, sample").

---

## 13. Acceptance checklist

- [ ] `npm run build` and `npm run lint` pass with no errors.
- [ ] Loads in Light by default; Dark persists across reloads and navigation with no flash.
- [ ] Switching theme recolors everything, including drawings; forced-theme demos stay fixed.
- [ ] No raw hex outside `globals.css` and `lib/tokens.ts`.
- [ ] Mono only appears on drawings, deliverable and document codes, token names and hex values, and the browser URL.
- [ ] No more than one Redline element per view, plus the primary button.
- [ ] Red text uses `text-redline-text`; text on red fills uses `text-on-accent`.
- [ ] No em dashes in any text.
- [ ] All six pages match the copy in section 8.
- [ ] Keyboard: every link and button reachable with visible focus; switcher works with arrow keys or Tab plus Enter/Space.
- [ ] Works at 375px, 768px, 1280px and 1512px widths.
- [ ] Reduced motion: no transforms or drawing animations.

---

## 14. Open items (confirm with Candid before going public)

- "Class 4 estimate, ±40%" and "Class 3 estimate, ±15%" is our reading of the two figures on candid.engineering. Confirm wording with Talha.
- "14 built plants" comes from the backtest chart on their site.
- The "Candid" wordmark is set in Geist as a placeholder until real logo files arrive.
- The drawing is a sketch for the sample; swap in an excerpt from a real Candid deliverable when available.