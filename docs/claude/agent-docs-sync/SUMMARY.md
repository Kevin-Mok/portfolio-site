# Agent Docs Sync - Summary

Status: READY

## What's new

- Replaced root `AGENTS.md` with portfolio-site-specific instruction set.
- Replaced root `CLAUDE.md` with portfolio-site architecture and workflow guidance.
- Kept `AGENTS-BASE.md` as shared reusable base instructions.
- Added smoke coverage for agent-doc adaptation.

## Files changed

- `AGENTS.md`
- `CLAUDE.md`
- `AGENTS-BASE.md` (added from quit-weed as shared base)
- `docs/TODO.md`
- `QUICK_SMOKE_TEST.md`
- `docs/claude/agent-docs-sync/QUICK_SMOKE_TEST.md`
- `docs/claude/agent-docs-sync/SUMMARY.md`

## Key behaviors / invariants

- Root agent docs now describe Next.js portfolio workflows and commands.
- Canonical TODO path remains `docs/TODO.md`.
- Root smoke test remains synced with checked TODO items.

## Risks / limitations

- Future repo architecture changes require manual updates to both root instruction files.

## How to test

- Run steps in `docs/claude/agent-docs-sync/QUICK_SMOKE_TEST.md`.

## Rollback plan

- Restore previous versions of `AGENTS.md` and `CLAUDE.md` from git history.

