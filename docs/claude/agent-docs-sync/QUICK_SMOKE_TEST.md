# Agent Docs Sync - Quick Smoke Test

## Prerequisites

- Repo is on latest local branch state.
- `AGENTS.md` and `CLAUDE.md` exist at repo root.

## Smoke Tests

### T1 - AGENTS.md is portfolio-site specific

Objective: Confirm root agent policy references this Next.js repo and doc workflow.

Steps:

```bash
rg -n "portfolio-site|docs/TODO\.md|QUICK_SMOKE_TEST\.md|npm run dev" AGENTS.md
```

Expected results:
- Hits show portfolio-site wording and required docs workflow.
- No references to Expo mobile app flows.

Failure modes / debugging notes:
- If output includes Expo/mobile instructions, re-edit `AGENTS.md` and remove mismatched guidance.

### T2 - CLAUDE.md is portfolio architecture specific

Objective: Confirm assistant context is aligned to Next.js, resume feature, and this repo structure.

Steps:

```bash
rg -n "Next\.js 15\.5\.4|app/styles|lib/resume-data\.ts|public/icons/resume" CLAUDE.md
```

Expected results:
- Hits confirm stack and resume architecture guidance.

Failure modes / debugging notes:
- If expected patterns are missing, update `CLAUDE.md` architecture and resume sections.

### T3 - No quit-weed mobile stack remnants

Objective: Ensure copied docs no longer contain React Native/Expo instructions.

Steps:

```bash
rg -n "React Native|Expo|eas build|docs/ai-framework" AGENTS.md CLAUDE.md
```

Expected results:
- Command returns no matches.

Failure modes / debugging notes:
- Any hit indicates stale copied content from quit-weed; remove those sections.

## Cleanup

- None.

## Success criteria checklist

- [ ] AGENTS.md references portfolio-site workflow.
- [ ] CLAUDE.md references Next.js portfolio architecture.
- [ ] No Expo/React Native remnants remain.

