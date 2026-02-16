# Favicon KM - Summary

Status: READY

## What's new

- Added a square `KM` favicon asset at `public/favicon.svg` using existing dark/blue palette and mono font style.
- Regenerated `app/favicon.ico` from square `KM` favicon to satisfy default browser `/favicon.ico` requests.
- Updated root metadata icon mapping to use `/favicon.svg`.
- Added repo-wide and feature-level smoke coverage for favicon verification.

## Files changed

- `app/layout.tsx`
- `app/favicon.ico`
- `public/favicon.svg`
- `docs/TODO.md`
- `QUICK_SMOKE_TEST.md`
- `docs/claude/favicon-bracket-k/QUICK_SMOKE_TEST.md`
- `docs/claude/favicon-bracket-k/SUMMARY.md`

## Key behaviors / invariants

- Favicon now matches square `KM` identity requested for the navbar branding direction.
- Existing site functionality remains unchanged.

## Risks / limitations

- Browsers can aggressively cache favicons; stale icon may appear until hard refresh/clear site data.

## How to test

- Follow `docs/claude/favicon-bracket-k/QUICK_SMOKE_TEST.md`.

## Rollback plan

- Revert metadata icon path to previous value and restore prior favicon asset.
