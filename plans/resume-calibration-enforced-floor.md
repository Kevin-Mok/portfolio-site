# Calibrate All Resume Variants With Enforced Typography Floor

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows `.agent/PLANS.md`.

## Purpose / Big Picture

The resume variants must keep a strict visual hierarchy while still fitting on one US Letter page. After this change, every variant will preserve `section header > company > job title = evidence link > bullet text`, and calibration will no longer reduce print scale below the enforced floor. The user-visible result is larger, more readable typography without overflow for the Python and other variants.

## Progress

- [x] (2026-02-23 18:54 UTC) Reviewed active typography and calibration files plus repository planning requirements.
- [x] (2026-02-23 18:54 UTC) Created this ExecPlan to track enforced-floor calibration work.
- [ ] Run full resume calibration for all variants using the new print-size floor.
- [ ] If calibration cannot converge because of content density, remove minimal bullets only in affected variants.
- [ ] Re-run build and layout verification to confirm one-page fit under the enforced hierarchy.

## Surprises & Discoveries

- Observation: Increasing all variant print scales improved readability but immediately created large whitespace mismatch and occasional overflow against baseline verification.
  Evidence: `npm run verify:resume-layout` reported large positive/negative deltas across most variants after scale changes.

## Decision Log

- Decision: Keep the new typography hierarchy enforced by shared CSS variables rather than per-selector ad hoc values.
  Rationale: This prevents future drift where one label (for example, evidence link) accidentally becomes smaller than job title.
  Date/Author: 2026-02-23 / Codex
- Decision: Use a hard minimum calibration floor at or above the user-approved Python size.
  Rationale: The user requested that Python be the minimum and that all variants stay at least that large.
  Date/Author: 2026-02-23 / Codex

## Outcomes & Retrospective

Pending implementation.

## Context and Orientation

Relevant files for this task:

- `app/styles/13-resume-latex.css`: visual hierarchy and per-variant print variables (`--resume-print-scale`, `--resume-print-leading`, `--resume-print-top-offset`).
- `scripts/calibrate-resume-layout.mjs`: iterative calibration logic and minimum scale enforcement by variant.
- `scripts/lib/resume-calibration-solver.mjs`: computes next calibration settings each iteration.
- `lib/resume-data.ts`: variant-specific resume content; bullet trimming happens here when needed.

The calibration process compares generated PDFs to a whitespace baseline and updates per-variant print variables in CSS. If a variant cannot fit one page at the enforced minimum scale, the fallback is targeted bullet removal in that variant and recalibration.

## Plan of Work

Run full calibration with current enforcement values first to measure real failures. If a variant still fails with `pages > 1` or cannot reach baseline tolerance at the floor, reduce content density by removing one low-priority bullet from that variant only, preferring project bullets over experience bullets unless user direction says otherwise. Repeat calibration and verify until all variants pass one-page constraints with the hierarchy still enforced.

## Concrete Steps

Run from `/home/kevin/coding/portfolio-site`:

1. `npm run calibrate:resume-layout`
2. `npm run verify:resume-layout`
3. If needed, edit `lib/resume-data.ts` to remove minimal bullets in failing variants.
4. Re-run:
   - `npm run build`
   - `npm run calibrate:resume-layout`
   - `npm run verify:resume-layout`

## Validation and Acceptance

Acceptance criteria:

- Every resume variant remains one page.
- `npm run verify:resume-layout` reports all variants `OK` within tolerance.
- Typography hierarchy remains enforced in `app/styles/13-resume-latex.css` with section header size > company size > job title/evidence-link size > bullet size.
- Calibration floor in `scripts/calibrate-resume-layout.mjs` prevents dropping below the user-approved minimum scale.

## Idempotence and Recovery

Calibration is safe to re-run; it rewrites only the per-variant print variables in `app/styles/13-resume-latex.css`. If a calibration pass regresses a variant, re-run calibration after restoring or trimming content for that variant. Content edits are isolated to `lib/resume-data.ts` and can be adjusted incrementally.

## Artifacts and Notes

Expected proof artifacts:

- Calibration iteration logs from `npm run calibrate:resume-layout`.
- Final pass output from `npm run verify:resume-layout` showing all `OK`.

## Interfaces and Dependencies

No API interfaces change. This task uses existing scripts and data structures:

- `npm run calibrate:resume-layout`
- `npm run verify:resume-layout`
- `resumeVariants` in `lib/resume-data.ts`

Revision Note (2026-02-23): Created plan for enforcing global minimum print size and recalibrating all variants under locked typography hierarchy.
