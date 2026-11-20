<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Instructions for coding agents working in this repo.

## Project

A website presenting a **sample brand system for Candid**, an owner's engineering firm for gas-fired power. Six pages: Overview, Color, Typography, Visual language, Templates, Applications. Prepared by Abdulqahar Usman as a pitch for Candid's cofounder.

**The full spec is in `docs/BRIEF.md`.** It holds every token value, the layout, all page copy, the PlotPlan drawing coordinates, the build order and the acceptance checklist. Read it before starting any task, and treat it as the source of truth. If this file and the brief disagree, follow the brief and flag it.

## Stack

- Next.js (App Router, TypeScript, `src/` directory, `@/*` alias)
- Tailwind CSS v4: CSS-first config in `src/app/globals.css` (`@theme inline`). There is no `tailwind.config.js`; do not create one.
- Framer Motion (`framer-motion`)
- Geist and Geist Mono via `next/font/google`
- No UI component libraries, no CMS, no extra dependencies without asking.

## Commands

```bash
npm run dev     # local dev server
npm run build   # must pass before you finish a task
npm run lint    # must pass before you finish a task
```

## Hard rules

1. **No em dashes** (the long dash) anywhere: copy, UI text, comments, commit messages. Use commas, colons, periods or "to".
2. **Tokens only.** Never write raw hex or Tailwind palette colors (`bg-gray-100`, `text-black`) in components. Use the semantic utilities: `bg-canvas`, `bg-surface`, `bg-raised`, `border-line`, `border-line-strong`, `text-fg`, `text-fg-2`, `text-fg-3`, `text-on-accent`, `text-redline-text`, `bg-redline`, `text-draft`, `stroke-draft`, `text-verified`, `stroke-drawing`. Raw primitives are allowed only in `src/app/globals.css` and `src/lib/tokens.ts`.
3. **Light is the default theme.** Dark is set with `data-theme="dark"` on `<html>`. Any element can force a theme with `data-theme` plus the `theme-scope` utility.
4. **Mono is sparing.** `font-mono` only for drawing annotations, deliverable and document codes (D04, D05, OP-01), token names, hex values and the browser-mockup URL. Eyebrows, labels, table headers and stats use Geist.
5. **One Redline per view.** Red marks the single thing to look at. The only other red allowed in a view is the primary button.
6. **Red text is `text-redline-text`** (darker in light mode for contrast). Text on a red fill is `text-on-accent`. Never white on red.
7. **Copy comes from `docs/BRIEF.md` section 8.** Do not invent, rewrite or "improve" copy. If something is missing, leave a clear `TODO` and mention it.
8. **Accessibility:** semantic HTML, one `h1` per page, visible focus rings (`focus-visible:outline-draft`), AA contrast, the theme switcher is a `radiogroup`, SVG drawings get a `role="img"` and an `aria-label`.
9. **Motion respects `prefers-reduced-motion`** (use Framer Motion's `useReducedMotion`). Reduced motion means no transforms and no draw-in animation.

## Conventions

- Server Components by default. Add `"use client"` only for interactivity or motion (theme switcher, sidebar active state, `Reveal`, animated `PlotPlan`).
- File names in kebab-case, components in PascalCase, named exports.
- Folders: `src/components/shell`, `ui`, `drawings`, `templates`, `applications`; data in `src/lib` (`nav.ts`, `tokens.ts`). See brief section 11.
- Page data (swatches, token table, type scale rows) lives in typed arrays and is rendered with `map`, not hand-repeated JSX.
- Corner radius is 2px (`rounded-[2px]`) for cards, chips, swatches and buttons. Borders are 1px `border-line`.
- Type uses the scale utilities only: `text-display-xl`, `text-display-l`, `text-h1`, `text-h2`, `text-h3`, `text-body-l`, `text-body-m`, `text-body-s`, `text-label`, `text-label-mono`, `text-code`, `text-stat`. No arbitrary font sizes except inside slide and one-pager thumbnails.
- SVG drawings use CSS variables for color (`stroke="var(--accent-draft)"`) so they follow the theme.
- Theme switching follows `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`: inline script in `<head>`, `suppressHydrationWarning` on `<html>`, storage key `candid-theme`.

## Workflow

- Follow the build order in brief section 12. Finish and verify one step before starting the next.
- After each step: run `npm run build` and `npm run lint`, then check the page in both Light and Dark and at 375px and 1280px widths.
- Before saying a task is done, go through the acceptance checklist in brief section 13 for the pages you touched.
- Keep commits small and descriptive, one step per commit, no em dashes in messages.

## Do not

- Add dependencies, analytics, or tracking without asking.
- Use placeholder images or stock photos. Visuals are drawn with SVG and tokens.
- Show fake functionality (search boxes, download buttons) that does nothing.
- Change token values without updating both `globals.css` and `lib/tokens.ts`, and noting it in the brief.
- Resolve the open items in brief section 14 yourself. Leave them as written.