# AGENTS.md
A "README for coding agents" — project-specific instructions that help AI assistants work effectively in this repo.

This file is written for tools that automatically load `AGENTS.md` (and sometimes nested `AGENTS.md` files).

---

## ⚠️ CRITICAL: Canonical TODO File Path (Linux Case-Sensitive)

**The canonical TODO file is EXACTLY `docs/TODO.md` (uppercase).**

- Never create or write `docs/todo.md` (lowercase). It is a different file on Linux and indicates a bug.
- Every code change must update `docs/TODO.md` with correct status + timestamp.
- Sync `QUICK_SMOKE_TEST.md` (root) with checked items in `docs/TODO.md`.

If you find references to lowercase `docs/todo.md`, treat them as bugs and fix them.

---

## Instruction discovery & precedence (important)
- Keep a **root** `AGENTS.md` at the repository top-level for shared rules.
- For larger repos, add **nested** `AGENTS.md` files in subdirectories to provide tighter, local rules for that area.
- If tool support differs, assume **root `AGENTS.md` always applies**, and nested files can only *add* stricter local constraints (never loosen global rules).

---

## 0) Prime directive
- **Do not break production behavior** unless explicitly asked.
- Prefer **small, safe, reversible** changes.
- Default to minimal diffs.

---

## 1) Workflow (how to work in this repo)
### 1.1 Read before you write
- Scan `docs/TODO.md` for current scope and priorities.
- Skim relevant module docs (`README.md`, `docs/*`) before making changes.
- If you’re uncertain about intent, infer it from existing code patterns + TODO.

### 1.2 Make changes in small commits
- Keep commits focused (one change, one intent).
- Avoid “drive-by refactors” in feature commits.
- Prefer a follow-up refactor commit after behavior is stable.

### 1.3 Update docs as part of the change
- If behavior changes, update docs in the same PR (or immediately after if move-only).
- If new commands or admin flows are added, document:
  - Setup
  - How to run
  - How to test
  - Known gotchas / risks
- Keep docs short but precise.

### 1.4 REQUIRED: Claude-style smoke tests for every feature (Codex must do this)
Every feature implementation MUST include a **quick smoke test doc**.

Reason: smoke tests are **fast checks of core functionality** used as a go/no-go gate before deeper testing or deployment.
Write them so another human can run them quickly and confidently.

**Per-feature doc bundle (required):**
Create a feature folder:
- `docs/claude/<feature-slug>/`

And create at minimum:
1) `docs/claude/<feature-slug>/QUICK_SMOKE_TEST.md` (REQUIRED)
2) `docs/claude/<feature-slug>/SUMMARY.md` (REQUIRED)

Optional but encouraged for non-trivial features:
- `docs/claude/<feature-slug>/TESTING.md` (deep test plan like MARKET_BOARD_TESTING.md style)
- `docs/claude/<feature-slug>/IMPLEMENTATION.md` (implementation notes / design decisions)
- `docs/claude/<feature-slug>/QUICK_REF.md` (operator quick reference / “3 second summary”)

**Feature slug rules:**
- kebab-case, short, domain-correct
- examples: `catalog-sync`, `market-board`, `buy-flow`, `listing-expiry`

**Hard formatting rules for smoke tests (copy/paste friendly):**
- Each Discord command MUST be in its own code block (no multi-command blocks).
- Each shell command MUST be in its own code block (no multi-command blocks).
- Prefer explicit expected outputs (what should change / what should stay the same).
- Include failure modes + where to look (log path / command to run).

**QUICK_SMOKE_TEST.md template (copy this structure):**
- Title: `<Feature Name> — Quick Smoke Test`
- Prerequisites
  - Cog load / slash sync / home guild
  - Any required channels/config
- Smoke Tests (T1..Tn)
  - Objective
  - Steps (each command in its own code block)
  - Expected results
  - Failure modes / debugging notes
- Cleanup (if needed)
- Success criteria checklist (checkboxes)

**SUMMARY.md template:**
- Status (READY / WIP)
- What’s new (bullets)
- Files changed (bullets)
- Key behaviors / invariants
- Risks / limitations
- How to test (link to QUICK_SMOKE_TEST.md)
- Rollback plan (high-level)


### 1.5 REQUIRED: Keep the repo-wide `QUICK_SMOKE_TEST.md` in sync with `docs/TODO.md`
In addition to per-feature docs under `docs/claude/`, this repo has a **root-level** `QUICK_SMOKE_TEST.md`
that acts as the **single go/no-go smoke test**.

**Rules:**
- It must cover **every** `[x]` item in `docs/TODO.md` (including the “What’s Done” section and any checked items elsewhere).
- When you mark a TODO item `[x]`, you MUST also:
  1) add/update the matching section in `QUICK_SMOKE_TEST.md`
  2) keep the “Coverage map” section accurate
- Keep it fast: target **15–25 minutes** total. Link to `docs/claude/<feature-slug>/QUICK_SMOKE_TEST.md` for deeper testing.
- Preserve the copy/paste rules: **one Discord command per code block** and **one shell command per code block**.

---

## 2) Output format requirements (what agents should return)
When asked for implementation help, produce:

1. **Atomic plan** (short, ordered)
2. **Cursor prompt** (ready to paste, includes file paths)
3. **Test plan** (exact commands + manual steps)
4. **Docs updates** (which files to edit)
5. **Conventional Commit** suggestion

### 2.1 REQUIRED: When implementing any feature, Codex must also generate docs files
For any feature PR, the agent output must include:
- The full contents of:
  - `docs/claude/<feature-slug>/QUICK_SMOKE_TEST.md`
  - `docs/claude/<feature-slug>/SUMMARY.md`
- Also update the repo-wide `QUICK_SMOKE_TEST.md` so it covers this feature (and stays aligned with `[x]` items in `docs/TODO.md`).
- And a short list of exact `mkdir -p` + `git add` commands needed.

If an existing feature folder already exists, update the existing smoke test + summary rather than creating duplicates.

---

## 3) Repo conventions
### 3.1 Style
- Prefer readable, explicit code over cleverness.
- Favor pure functions for business logic; keep Discord interaction glue thin.
- Use type hints and docstrings.
- Handle errors defensively with actionable logs.

### 3.2 Naming
- Use domain language consistently (this project uses “brainrot” as the item type).
- Avoid ambiguous abbreviations unless already established in code.

### 3.3 Persistence
- Any stored state must be versioned or resilient to schema drift.
- Validate config / persisted data on load and fail loudly with clear error messages.

---

## 4) Code architecture guidance
### 4.0 General module guidance
- Keep Discord UI (`discord.ui.View`, `Modal`, etc.) separate from business logic.
- Keep persistence and state machine logic in `services/` or dedicated modules.
- Keep commands thin: they should orchestrate, validate, call services, and present UI/output.
- Don’t add heavy dependencies unless justified; prefer stdlib and existing project deps.

### 4.1 Keep files small and focused (required)
- Prefer **multiple cohesive modules** over a single “god file”.
- **Target size:** keep most `.py` files under ~800 lines. If a file crosses ~1000 lines *or* spans multiple concerns (commands + UI + background tasks), split it.
- **Hard rule:** do not add new features to a file that is already >1000 lines unless the same change also **splits/organizes** it.
- Use clear subpackages inside the cog package as the project grows:
  - `commands/` (slash commands grouped by domain: admin, listings, buy/sell)
  - `ui/` (views, modals, wizards)
  - `tasks/` (background loops like expiry)
  - `services/` (business logic + persistence helpers)
- Keep the main cog entrypoint (`cog.py`) mostly as **orchestration/wiring**; push heavy logic into the modules above.
- When splitting, avoid circular imports (prefer `commands → services → models/utils`) and use `__init__.py` re-exports if you need stable import paths.

### 4.2 AI-generated docs quarantine (required)
Keep the repo root clean: any ad-hoc docs generated during AI-assisted work (Claude, Codex, ChatGPT, etc.)
must live under `docs/claude/` (absolute path: `/home/kevin/coding/stb-mkt/docs/claude/`).

Rules:
- These docs are **supplemental** (PR summaries, implementation notes, test guides, quick refs).
  Canonical docs remain `README.md` and `docs/*` unless explicitly promoted.
- Organize by feature area using kebab-case directories:
  - `docs/claude/catalog-sync/`
  - `docs/claude/market-board/`
  - Add more folders as new features land.
- Prefer a **move-only commit** when reorganizing docs (don’t rewrite content in the same commit)
  to keep diffs reviewable.

Legacy Claude-doc placement (move these if they exist at repo root):

NOTE: The root-level `QUICK_SMOKE_TEST.md` is the **repo-wide smoke test gate**. Do NOT move it into `docs/claude/`.

- Catalog sync / override:
  - `CATALOG_QUICK_REF.md` → `docs/claude/catalog-sync/`
  - `CATALOG_SYNC_IMPLEMENTATION.md` → `docs/claude/catalog-sync/`
  - `IMPLEMENTATION_SUMMARY.md` → `docs/claude/catalog-sync/`
  - `BEFORE_AFTER.txt` → `docs/claude/catalog-sync/overview/`
- Market board MVP:
  - `MARKET_BOARD_IMPLEMENTATION.md` → `docs/claude/market-board/`
  - `MARKET_BOARD_SUMMARY.md` → `docs/claude/market-board/`
  - `MARKET_BOARD_TESTING.md` → `docs/claude/market-board/`

If an AI doc becomes canonical (operators must read it), **promote** it into `docs/` (or `README.md`)
and remove/redirect the AI copy to avoid drift.

---

## 5) Repo-specific commands (fill these in per project)
(Replace these placeholders with the real commands used in this repo.)

### Setup
- Create venv:
  - `python -m venv stb-mkt-src`
- Activate venv:
  - `source stb-mkt-src/bin/activate` (bash/zsh)
  - `source stb-mkt-src/bin/activate.fish` (fish)
- Install deps:
  - `pip install -r requirements.txt`

### Running / debugging
- Start bot:
  - (Fill in actual launch command)
- Reload cog:
  - (Fill in actual redbot command)
- Tail logs:
  - (Fill in actual log path)

---

## 6) Discord / Red-DiscordBot specifics
### 6.1 Interaction rules
- Always use `interaction.response` properly:
  - First response: `send_message`, `send_modal`, `defer`, etc.
  - Follow-ups: `interaction.followup.send(...)`
- Respect ephemeral usage where appropriate (admin-only info, debug output).

### 6.2 Rate limit safety
- Board/leaderboard updates must be debounced or batched.
- Avoid editing many messages in a tight loop.
- Prefer caching computed aggregates and only updating diffs.

---

## 7) Feature-specific guidance
### 7.1 Listings lifecycle
- Enforce explicit states (e.g., Draft → Pending Collection → Active → Held → Sold / Cancelled).
- Validate allowed transitions; never allow illegal jumps.
- Logs should clearly show the previous state, next state, and actor.

### 7.2 Market boards
- Boards should show lowest Active listing per brainrot + mutation.
- Refresh must be resilient to:
  - Missing channel
  - Missing/deleted message
  - Permission errors
- Ensure home guild enforcement for writes.

---

## 8) Logging & troubleshooting
- Support verbose logging mode that writes to `log/` (gitignored).
- Default logging must still capture critical errors.
- Logs must include enough context to reproduce:
  - Interaction IDs
  - Guild/channel IDs
  - Listing IDs
  - State transitions
  - Exception stack traces

---

## 9) PR checklist (must satisfy)
- ✅ Smoke test doc created/updated: `docs/claude/<feature-slug>/QUICK_SMOKE_TEST.md`
- ✅ Summary doc created/updated: `docs/claude/<feature-slug>/SUMMARY.md`
- ✅ Repo-wide smoke test updated: `QUICK_SMOKE_TEST.md` covers all `[x]` items in `docs/TODO.md`
- ✅ Tests / smoke test steps included and runnable
- ✅ Docs updated (`docs/TODO.md` if notable)
- ✅ Conventional Commit message suggested
- ✅ No unnecessary churn
- ✅ Error handling + logs are actionable
- ✅ Permissions + home-guild enforcement respected

**PR template sections to include in output:**
- Summary
- Why
- What changed
- Risks / edge cases
- How to test (link the smoke test doc)
- Rollback plan (if risky)

**Docs requirement:** If the PR changes behavior, it must include docs changes (README and/or `docs/*`). Missing smoke test doc is a review blocker.

---

## 10) What “done” looks like (agent output format)
For any coding task, produce:

1. **Atomic plan** (short)
2. **Cursor prompt** (ready to paste)
3. **Test plan** (exact commands + manual steps)
4. **Docs updates** (which files to edit — always include `docs/TODO.md` if notable)
5. **Conventional Commit** suggestion
6. **Per-feature docs bundle output**
   - Provide the full contents of:
     - `docs/claude/<feature-slug>/QUICK_SMOKE_TEST.md`
     - `docs/claude/<feature-slug>/SUMMARY.md`
   - Provide exact `mkdir -p` and `git add` commands
7. **Repo-wide smoke test update**
   - Update `QUICK_SMOKE_TEST.md` (root) with smoke steps for the new/changed behavior and keep its “Coverage map” aligned with `docs/TODO.md`.
