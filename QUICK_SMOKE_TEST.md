# Repo-Wide Quick Smoke Test

Target runtime: 15-25 minutes

## Coverage map

- [x] `docs/TODO.md` - Fix resume header social icon paths so LinkedIn/GitHub icons load correctly.
- [x] `docs/TODO.md` - Adapt `AGENTS.md` and `CLAUDE.md` to portfolio-site project guidance.

## T1 - Resume social icons render

Objective: Verify LinkedIn and GitHub icons are visible on the resume header.

Steps:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/resume
```

Expected results:
- LinkedIn icon is visible next to `linkedin.com/in/Kev-Mok`.
- GitHub icon is visible next to `github.com/Kevin-Mok`.
- Phone and email icons still render.
- No broken-image placeholders appear in the resume header.

Failure modes / debugging notes:
- If icons are broken, verify `components/tiles/content/resume/ResumeHeader.tsx` uses `/icons/resume/linkedin.svg` and `/icons/resume/github.svg`.
- Verify files exist:

```bash
ls -l public/icons/resume
```

## T2 - Agent docs match portfolio-site stack

Objective: Verify agent guidance references Next.js portfolio workflows (not Expo mobile flows).

Steps:

```bash
rg -n \"Next\\.js 15\\.5\\.4|npm run dev|docs/TODO\\.md|QUICK_SMOKE_TEST\\.md\" AGENTS.md CLAUDE.md
```

```bash
rg -n \"expo|React Native|eas build\" AGENTS.md CLAUDE.md
```

Expected results:
- First command finds portfolio-site guidance in both files.
- Second command returns no hits.

Failure modes / debugging notes:
- If mobile keywords still appear, re-open both files and remove remaining quit-weed/Expo references.
