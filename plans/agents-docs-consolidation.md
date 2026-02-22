# Consolidate Agent Instructions Around Canonical AGENTS.md

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows `.agent/PLANS.md`.

## Purpose / Big Picture

This change makes `AGENTS.md` the single shared instructions entrypoint used across repositories, while preserving portfolio-site-specific rules in a separate file. After this change, a contributor can open `AGENTS.md` first in any repo, then apply `AGENTS.repo.md` for local constraints, with an optional local stricter override file that is intentionally not committed.

## Progress

- [x] (2026-02-22 22:50 UTC) Reviewed existing `AGENTS.md`, `AGENTS-BASE.md`, `CLAUDE.md`, `.agent/PLANS.md`, `.gitignore`, and `docs/TODO.md`.
- [x] (2026-02-22 22:51 UTC) Created canonical shared `AGENTS.md` with explicit precedence and local override model.
- [x] (2026-02-22 22:51 UTC) Created `AGENTS.repo.md` and moved portfolio-site-specific constraints there.
- [x] (2026-02-22 22:51 UTC) Added `AGENTS.override.template.md` and ignored `AGENTS.override.local.md`.
- [x] (2026-02-22 22:52 UTC) Retired `CLAUDE.md` and converted `AGENTS-BASE.md` into a deprecation shim.
- [x] (2026-02-22 22:52 UTC) Updated `docs/TODO.md` and ran validation checks for the new instruction graph.
- [x] (2026-02-22 22:57 UTC) Restored `AGENTS.md` to near-parity with `/home/kevin/coding/quit-weed/AGENTS-BASE.md` while preserving layered precedence and local override sections.

## Surprises & Discoveries

- Observation: Existing `AGENTS.md` currently mixes global and repo-specific rules.
  Evidence: Sections include universal process guidance and highly specific resume calibration gates.
- Observation: Existing `.gitignore` ignores `.claude/` but has no local override ignore entry.
  Evidence: No `AGENTS.override.local.md` pattern found in `.gitignore`.
- Observation: The first shared `AGENTS.md` rewrite was too compressed and dropped substantial baseline guidance expected by the user.
  Evidence: User flagged missing content relative to `/home/kevin/coding/quit-weed/AGENTS-BASE.md`.

## Decision Log

- Decision: Use `AGENTS.md` as the canonical shared runtime policy file across repositories.
  Rationale: Consistent entrypoint minimizes ambiguity and reduces tooling-specific branching.
  Date/Author: 2026-02-22 / Codex
- Decision: Keep repo-specific constraints in `AGENTS.repo.md`.
  Rationale: Preserves portability of shared instructions while retaining strict local requirements.
  Date/Author: 2026-02-22 / Codex
- Decision: Deprecate `AGENTS-BASE.md` instead of deleting it.
  Rationale: Avoids abrupt breakage for workflows still referencing the old filename.
  Date/Author: 2026-02-22 / Codex
- Decision: Keep `AGENTS.md` comprehensive (near-parity with legacy base guidance) rather than minimal.
  Rationale: Shared cross-repo entrypoint should preserve rich behavioral guardrails, not a summary subset.
  Date/Author: 2026-02-22 / Codex

## Outcomes & Retrospective

The repository now has a layered instruction model centered on `AGENTS.md`, with repository-specific policy isolated in `AGENTS.repo.md` and optional local stricter overrides handled through an untracked file pattern. After user feedback, `AGENTS.md` was expanded back to a full guidance baseline (near parity with `quit-weed`'s `AGENTS-BASE.md`) instead of a compressed summary.

Remaining gap for future cross-repo rollout: this repo is now migrated, but other repositories still need the same file layout and shared `AGENTS.md` sync process.

## Context and Orientation

Current repository instruction files are:

- `AGENTS.md`: active root policy but currently repo-specific.
- `AGENTS-BASE.md`: generic reusable rules.
- `CLAUDE.md`: overlapping guidance with partial duplication.
- `.agent/PLANS.md`: ExecPlan authoring/maintenance specification.

Target layout after this task:

- `AGENTS.md`: shared canonical instructions.
- `AGENTS.repo.md`: portfolio-site-specific requirements (resume gates, command preferences, repo paths).
- `AGENTS.override.template.md`: template for local stricter-only overrides.
- `AGENTS.override.local.md`: optional ignored local file.
- `AGENTS-BASE.md`: deprecation shim.

## Plan of Work

Rewrite `AGENTS.md` to remove portfolio-site operational specifics while preserving durable engineering rules and explicit precedence. Create `AGENTS.repo.md` and move all local repository policies there, including TODO casing, fish command formatting, resume constraints, and pre-push gate details. Add a tracked override template and gitignore entry for local override usage. Remove `CLAUDE.md` and replace `AGENTS-BASE.md` content with a deprecation notice that points to the new canonical files.

## Concrete Steps

Run from `/home/kevin/coding/portfolio-site`:

- Edit `AGENTS.md` to canonical shared policy.
- Create `AGENTS.repo.md` with repo-specific policy.
- Create `AGENTS.override.template.md`.
- Update `.gitignore` with `AGENTS.override.local.md`.
- Remove `CLAUDE.md`.
- Replace `AGENTS-BASE.md` content with deprecation notice.
- Update `docs/TODO.md` with a completion entry.
- Validate with `rg` and `test` checks for precedence and file presence.

## Validation and Acceptance

Acceptance is met when:

- `AGENTS.md` states precedence and shared intent with no portfolio-site-only operational details.
- `AGENTS.repo.md` contains portfolio-site-specific constraints.
- `AGENTS.override.template.md` exists and documents stricter-only local usage.
- `.gitignore` contains `AGENTS.override.local.md`.
- `CLAUDE.md` is removed.
- `AGENTS-BASE.md` explicitly states deprecation and points to `AGENTS.md`.
- `docs/TODO.md` records the task.

## Idempotence and Recovery

Edits are documentation-only and safe to reapply. If conflicts occur, re-open each file and ensure precedence wording remains consistent: `AGENTS.md` then `AGENTS.repo.md` then `AGENTS.override.local.md`.

## Artifacts and Notes

Validation commands (final run expected):

- `rg -n "AGENTS.repo.md|AGENTS.override.local.md|precedence|stricter" AGENTS.md AGENTS.repo.md AGENTS.override.template.md`
- `test -f AGENTS.repo.md`
- `test -f AGENTS.override.template.md`
- `rg -n "^AGENTS\\.override\\.local\\.md$" .gitignore`
- `test ! -f CLAUDE.md`
- `rg -n "deprecated|Canonical policy" AGENTS-BASE.md`

## Interfaces and Dependencies

No runtime code interfaces are changed. Policy interfaces are documentation paths and precedence semantics:

1. `AGENTS.md` shared baseline.
2. `AGENTS.repo.md` repository-specific strict additions.
3. `AGENTS.override.local.md` optional local strict additions.

Revision Note (2026-02-22): Updated this plan after implementation to mark progress complete, record outcomes, and preserve restartable context for future contributors.
