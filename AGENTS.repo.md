# AGENTS.repo.md

Repository-specific instructions for AI coding agents working in `portfolio-site`.

This is a Next.js portfolio site, not a mobile app repository.

---

## Scope and Precedence

This file extends `AGENTS.md`.

Apply instructions in this order:

1. `AGENTS.md`
2. `AGENTS.repo.md`
3. `AGENTS.override.local.md` (optional, stricter-only)

Rules here can tighten or specialize shared policy, but cannot relax it.

---

## Required Reading

- Start with the user request and relevant docs for the touched area.
- If an active ExecPlan exists for the task (check `plans/`), read it fully and treat it as the active spec.
- For non-trivial tasks, follow `.agent/PLANS.md` requirements while maintaining the task's ExecPlan.

---

## Critical Path Rules

### Commit and push policy

- When an agent creates a commit, it must push in the same task unless explicitly told not to push yet.
- Default push target is `origin` on the active branch (for `main`, use `git push origin main`).
- Keep commit subjects at or under 80 characters.
- Put meaningful details in the commit body.

### Large file policy (Git LFS)

- Track large binary files with Git LFS before commit.
- Threshold: treat files larger than 5 MB as large by default.
- Always include `.gitattributes` updates in the same change when adding new LFS patterns.
- Before committing media-heavy changes, run:

```fish
find . -path ./.git -prune -o -path ./node_modules -prune -o -path ./.next -prune -o -type f -size +5M -print
```

- For newly introduced large file types, add/update LFS patterns first, then stage files so they are stored as LFS pointers.

---

## Repo Commands (`portfolio-site`)

### Shell preference

- Provide shell commands in Fish syntax by default.
- Use `fish` fenced blocks unless another shell is explicitly requested.
- If Bash is required, label it explicitly.

### Setup

```fish
npm install
```

### Running

```fish
npm run cleanup
```

```fish
npm run dev
```

Dev server URL:

```text
http://localhost:3000
```

### Quality checks

```fish
npm run typecheck
```

```fish
npm run lint
```

### Build

```fish
npm run build
```

---

## Architecture and Conventions

### Stack

- Next.js 15.5.4 App Router
- TypeScript strict mode
- Tailwind CSS v4
- Modular CSS in `app/styles/`
- React Context for app-level UI/navigation state

### Patterns

- Keep components focused and small.
- Separate presentation from business logic.
- Use typed interfaces for shared data.
- Prefer explicit readable code over clever abstractions.

### Styling constraints

- Theme variables live in `app/styles/01-theme-variables.css`.
- Keep styles modular (focused CSS files).
- Avoid inline styles except narrow justified cases.
- Preserve established visual language unless redesign is requested.

---

## Resume Feature Rules

Single source of truth:

- `lib/resume-data.ts`

Primary files:

- `components/tiles/content/ResumeContent.tsx`
- `components/tiles/content/resume/*`
- `app/styles/13-resume-latex.css`
- `app/resume/page.tsx`

Resume constraints:

- Keep Computer Modern-style presentation.
- Maintain white background and black text for print-ready output.
- If content changes, verify `/resume` and homepage resume tile rendering.
- Regenerate `public/resume/*.pdf` variants when resume copy changes.
- After resume content changes, recalibrate per-variant page fill (`--resume-print-scale` in `app/styles/13-resume-latex.css`) so each variant fills one US Letter page.
- Run `npm run validate-resume-pdfs` after regeneration and resolve failures before considering resume work complete.

Mandatory resume pre-commit gate (run in order):

```fish
npm run build
```

```fish
npm run calibrate:resume-layout
```

```fish
npm run verify:resume-layout
```

```fish
npm run validate-resume-pdfs
```

Additional resume gate rules:

- If calibration updates files, include those updates in the same change and rerun verify/validate.
- Do not commit or push resume-affecting changes until all four commands pass.
- Enforce via `.githooks/pre-push`.
- On new clones, activate hooks once:

```fish
git config core.hooksPath .githooks
```

Before major resume edits, read:

- `docs/resume/README_RESUME.md`
- `docs/resume/RESUME_ARCHITECTURE.md`
- `docs/resume/RESUME_MAINTENANCE.md`

---

## Smoke and Validation Guidance

- Root `QUICK_SMOKE_TEST.md` is the quick validation reference.
- Keep smoke runtime fast (target 15-25 minutes).
- Manual UI checks should include desktop and mobile behavior when UI changes.

---

## Toronto Zoo Blog Standard

For any Toronto Zoo blog/page work, apply these defaults unless the user explicitly overrides them:

- Route pattern: `app/toronto-zoo/YYYY/M/D/page.tsx` with canonical path `/toronto-zoo/YYYY/M/D`.
- Add legacy aliases when requested (for example `/toronto-zoo/M/D` or `/toronto-zoo/YY/M/D`) that redirect to the canonical route.
- Use server-rendered pages (App Router server components) and keep media optimized for fast load.
- Keep the visual direction white/green with a wildlife-preservation tone.
- Ensure headings are non-monospace and theme-consistent.
- Ensure mobile-friendly layout with no scroll-triggered animations.
- Structure content with separate sections for each animal talk when source material supports it.
- For animal talk sections, write at least 2 short paragraphs per animal.
- Media baseline per animal: exactly 2 highlight photos + 1 highlight video when source files exist.
- Toronto Zoo source-of-truth directory for this format: `/mnt/linux-files-3/hevin/2.28.26 - Toronto Zoo`.
- Choose the most zoomed-in photos where the animal fills the frame; crop wide shots tighter to animal-only framing when needed.
- Keep one consistent animal-focused crop style across all highlight videos.
- Re-encode videos from original source media with quality retention prioritized (`-movflags +faststart`, compatibility-safe H.264).
- Caption every displayed image.
- Keep video poster images enabled so previews are visible before playback.
- Keep media max height aligned across images/videos (target about two-thirds viewport on desktop) for balanced layout.
- Photo pairs for each animal should render side-by-side in one row on desktop breakpoints.
- Animal feature media can use full-width treatment for landscape emphasis.
- Keep transcript artifacts under `docs/toronto-zoo/YYYY-MM-DD/transcripts/` and include a README.
- Prefer offline transcription workflows (no API key requirement).
- Use canonical spellings in authored copy: `Pemba`, `Jita`, `Zoya`, `Minu`, `Akron`.

---

## Logging and Troubleshooting

- Error messages must be actionable and context-rich.
- Prefer clear failure surfaces over silent fallbacks.
