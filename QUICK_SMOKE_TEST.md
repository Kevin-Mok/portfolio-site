# Repo-Wide Quick Smoke Test

Target runtime: 15-25 minutes

## Coverage map

- [x] `docs/TODO.md` - Fix resume header social icon paths so LinkedIn/GitHub icons load correctly.
- [x] `docs/TODO.md` - Adapt `AGENTS.md` and `CLAUDE.md` to portfolio-site project guidance.
- [x] `docs/TODO.md` - Replace legacy branding tokens and legacy creator phrase with `kmok` across code/content/docs and renamed image assets.

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
rg -n "Next\.js 15\.5\.4|npm run dev|docs/TODO\.md|QUICK_SMOKE_TEST\.md" AGENTS.md CLAUDE.md
```

```bash
rg -n "expo|React Native|eas build" AGENTS.md CLAUDE.md
```

Expected results:
- First command finds portfolio-site guidance in both files.
- Second command returns no hits.

Failure modes / debugging notes:
- If mobile keywords still appear, re-open both files and remove remaining quit-weed/Expo references.

## T3 - Kmok rebrand strings are complete

Objective: Ensure all target legacy tokens were replaced and renamed assets exist.

Steps:

```bash
rg -n -P --hidden -S -g '!.git/**' -g '!.next/**' -g '!node_modules/**' "(?i)\\x64\\x6c\\x65\\x65\\x72|\\x6f\\x72\\x69\\x67\\x69\\x6e\\x61\\x6c\\x20\\x63\\x72\\x65\\x61\\x74\\x6f\\x72" .
```

```bash
ls -l public/images/kmok-homelab.webp public/images/kmok-tower-crane.webp public/images/profile/kmok-shinjuku.webp public/images/profile/kmok-shinjuku-RF-DETR.webp
```

Expected results:
- First command returns no output.
- Second command lists all four files successfully.

Failure modes / debugging notes:
- If `rg` finds matches, update remaining files and re-run.
- If image files are missing, check rename operations in `public/images/` and `public/images/profile/`.
- Deep test details: `docs/claude/kmok-rebrand/QUICK_SMOKE_TEST.md`.
