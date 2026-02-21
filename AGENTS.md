# AGENTS.md

Project-specific instructions for AI assistants working in the `portfolio-site` codebase.

> Base rules live in `AGENTS-BASE.md`.
> This file adds strict repo-local rules and does not loosen base constraints.

---

## 0) Prime Directive

- Do not break production behavior unless explicitly asked.
- Prefer small, safe, reversible changes.
- Default to minimal diffs and avoid drive-by refactors.

---

## 1) Critical Path Rules

### Canonical TODO path (Linux case-sensitive)

The canonical TODO file is exactly `docs/TODO.md` (uppercase).

- Never create `docs/todo.md`.

If lowercase `docs/todo.md` appears anywhere, treat it as a bug and fix it.

### Root + nested instruction precedence

- Root `AGENTS.md` always applies.
- Nested `AGENTS.md` files can only add stricter local rules.
- Local rules never override root/base safety constraints.

---

## 2) Workflow

### Read before write

- Start with `docs/TODO.md` to confirm active scope.
- Skim relevant docs in `docs/` and nearby code before editing.
- Infer intent from existing patterns when requirements are implicit.

### Keep changes focused

- One change, one intent.
- Avoid unrelated cleanup in feature work.
- Use follow-up commits for refactors.

### Update docs in the same change

If behavior changes, docs must change immediately.

- Update setup/run/test notes for new workflows.
- Document gotchas and risks when non-obvious.

### Commit + push policy

- When an agent creates a commit, it must push that commit in the same task unless the user explicitly says not to push yet.
- Default push target is `origin` on the active branch (for `main`, use `git push origin main`).
- Before committing, `npm run validate-resume-pdfs` and `npm run calibrate:resume-layout` must pass.
- If validation or calibration fails, run `npm run build` and then rerun both checks until they pass.
- Commit message first line (subject) should be at most 80 characters.
- Document all meaningful changes in the commit message body instead of overloading the subject line.

---

## 3) Optional Feature Docs

Do not require per-feature docs in `docs/claude/` for normal changes.

- Only create/update `docs/claude/<feature-slug>/` when explicitly requested.
- Keep feature slugs kebab-case when those docs are used.
- Prefer root `QUICK_SMOKE_TEST.md` + `docs/TODO.md` as the default documentation path.

### Smoke test formatting rules

- Each shell command in its own code block.
- Each Discord command in its own code block.
- Explicit expected results.
- Include failure modes and where to debug.

---

## 4) Repo-Wide Smoke Gate

Root `QUICK_SMOKE_TEST.md` is the quick validation reference.

- Keep runtime fast (target 15-25 minutes).

---

## 5) Repo Commands (`portfolio-site`)

### Shell preference

- Always provide shell commands in Fish syntax by default.
- Use `fish` fenced code blocks for shell snippets unless a different shell is explicitly requested.
- If Bash syntax is required, label it explicitly.

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

Dev server URL:

```text
http://localhost:3000
```

---

## 6) Architecture & Conventions

### Stack

- Next.js 15.5.4 App Router
- TypeScript strict mode
- Tailwind CSS v4
- Modular CSS in `app/styles/`
- React Context for app-level UI/navigation state

### Key patterns

- Keep components focused and small.
- Separate presentation from business logic.
- Use typed interfaces for shared data.
- Prefer explicit, readable code over clever abstractions.

### Styling constraints

- Theme variables: `app/styles/01-theme-variables.css`
- Keep styles modular (add/update focused CSS modules)
- Avoid inline styling except narrow exceptions
- Preserve established visual language unless asked to redesign

---

## 7) Resume Feature Rules

Single source of truth:

- `lib/resume-data.ts`

Primary files:

- `components/tiles/content/ResumeContent.tsx`
- `components/tiles/content/resume/*`
- `app/styles/13-resume-latex.css`
- `app/resume/page.tsx`

Resume constraints:

- Keep Computer Modern-style resume presentation.
- Maintain white background and black text for print-ready output.
- If content changes, verify `/resume` and homepage tile rendering.
- Regenerate `public/resume/*.pdf` variants when resume copy changes.
- After any resume content change, recalibrate per-variant page fill (`--resume-print-scale` in `app/styles/13-resume-latex.css`) so each resume variant fills a single US Letter page.
- Run `npm run validate-resume-pdfs` after regeneration and resolve all failures before considering the resume change done.

Before major resume edits, read:

- `docs/resume/README_RESUME.md`
- `docs/resume/RESUME_ARCHITECTURE.md`
- `docs/resume/RESUME_MAINTENANCE.md`

---

## 8) Logging & Troubleshooting

- Error messages must be actionable and context-rich.
- Prefer clear failure surfaces over silent fallbacks.
- Validate responsive behavior on mobile for UI changes.

---

## 9) PR Checklist

- Test steps included and runnable
- Conventional commit suggested
- No unnecessary churn

PR sections to include in output:

- Summary
- Why
- What changed
- Risks / edge cases
- How to test
- Rollback plan

---

## 10) Done Output Format For Agents

For coding tasks, return:

1. Atomic plan
2. Cursor prompt
3. Test plan (exact commands + manual checks)
4. Docs updates (when relevant)
5. Conventional commit suggestion
6. Additional validation notes (if any)
