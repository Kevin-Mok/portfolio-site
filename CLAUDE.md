# CLAUDE.md

Guidance for Claude/Codex-style coding agents working in this repository.

This is a Next.js portfolio site, not a mobile app.

---

## Quick Start

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Dev server:

```text
http://localhost:3000
```

### Quality checks

```bash
npm run typecheck
```

```bash
npm run lint
```

### Production build

```bash
npm run build
```

---

## Project Overview

- Framework: Next.js 15.5.4 (App Router)
- Language: TypeScript (strict)
- Styling: Tailwind CSS v4 + modular CSS files in `app/styles/`
- State: React Context (`FocusContext`, `ViewContext`)
- Fonts: Geist, Geist Mono, JetBrains Mono
- Themes: CSS variable presets (Tokyo Night, Nord, Solarized Light)

---

## Repository Structure

- `app/` - App Router routes and layout
- `components/` - UI building blocks and tile content
- `contexts/` - app-wide state/context providers
- `lib/` - typed content/data and utilities
- `public/` - static assets (icons, resume PDFs)
- `docs/` - canonical feature and maintenance docs
- `docs/claude/` - supplemental AI-generated docs by feature

---

## Implementation Patterns

### Component architecture

- Keep components focused and composable.
- Keep files small (prefer under ~200 lines for components when practical).
- Separate data/model logic from presentation.
- Use typed interfaces for props and shared data.

### Styling architecture

- Primary CSS variable definitions: `app/styles/01-theme-variables.css`
- Keep style concerns modular in `app/styles/XX-*.css`
- Avoid large inline style blocks unless local + justified
- Preserve existing design system unless a redesign is explicitly requested

### Performance and UX

- Use memoization only where it provides clear benefit.
- Maintain responsive behavior on mobile + desktop.
- Keep animation intentional and lightweight.

---

## Resume Feature (Important)

Status: live and content-driven.

Single source of truth:

- `lib/resume-data.ts`

Core files:

- `components/tiles/content/ResumeContent.tsx`
- `components/tiles/content/resume/ResumeHeader.tsx`
- `components/tiles/content/resume/ResumeSection.tsx`
- `components/tiles/content/resume/ProjectEntry.tsx`
- `components/tiles/content/resume/WorkEntry.tsx`
- `components/tiles/content/resume/EducationEntry.tsx`
- `app/styles/13-resume-latex.css`
- `app/resume/page.tsx`

Assets:

- `public/resume/` (PDF variants)
- `public/icons/resume/` (resume contact icons)

Rules:

- Resume view should remain print-ready and professional.
- Keep white background and black text for resume rendering.
- If resume content changes, verify both homepage tile and `/resume` page.

Read before major resume changes:

- `docs/README_RESUME.md`
- `docs/RESUME_FEATURE_OVERVIEW.md`
- `docs/RESUME_ARCHITECTURE.md`
- `docs/RESUME_MAINTENANCE.md`

---

## Required Documentation Workflow

For every feature or behavior change:

1. Update `docs/TODO.md` (uppercase path only) with status + timestamp.
2. Update root `QUICK_SMOKE_TEST.md` so coverage map matches checked TODO items.
3. Create or update:
   - `docs/claude/<feature-slug>/QUICK_SMOKE_TEST.md`
   - `docs/claude/<feature-slug>/SUMMARY.md`

Do not place ad-hoc AI docs at repo root.

---

## Testing Expectations

Minimum before marking complete:

- Relevant command checks pass (`typecheck`, `lint`, and/or build as needed)
- Manual UI verification for changed flows (desktop + mobile viewport)
- Smoke test steps are documented and copy/paste runnable

If you could not run a validation step, call it out explicitly.

---

## Safety / Change Discipline

- Keep diffs minimal and reversible.
- Do not silently alter unrelated functionality.
- If instructions conflict, prioritize root `AGENTS.md` and explicit user direction.
- If uncertain, surface assumptions before significant edits.
