# Resume Social Icons - Summary

Status: READY

## What's new

- Fixed resume header LinkedIn icon path.
- Fixed resume header GitHub icon path.

## Files changed

- `components/tiles/content/resume/ResumeHeader.tsx`
- `docs/TODO.md`
- `QUICK_SMOKE_TEST.md`
- `docs/claude/resume-social-icons/QUICK_SMOKE_TEST.md`
- `docs/claude/resume-social-icons/SUMMARY.md`

## Key behaviors / invariants

- Resume header social icons must load from `public/icons/resume/`.
- Phone/email icon behavior is unchanged.
- Social links still open in new tab.

## Risks / limitations

- This change only addresses static icon file paths.

## How to test

- See `docs/claude/resume-social-icons/QUICK_SMOKE_TEST.md`.

## Rollback plan

- Revert `components/tiles/content/resume/ResumeHeader.tsx` to previous icon paths.

