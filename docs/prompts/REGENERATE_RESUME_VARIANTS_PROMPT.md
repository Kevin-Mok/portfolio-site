# ChatGPT Prompt: Regenerate All Resume Variants From `lib/resume-data.ts`

Use this prompt when you want to rebalance all resume variants to use the strongest project/bullet combinations while treating `lib/resume-data.ts` as the source of truth.

## Attach These Files

Required:
- `/home/kevin/coding/portfolio-site/lib/resume-data.ts`

Recommended:
- `/home/kevin/coding/portfolio-site/docs/resume/RESUME_VARIANT_POSITIONING.md`
- `/home/kevin/coding/portfolio-site/app/styles/13-resume-latex.css`
- `/home/kevin/coding/portfolio-site/docs/resume/resume-generation-spec.md`

## Copy/Paste Prompt

```text
You are regenerating all resume variants in portfolio-site, using lib/resume-data.ts as the single source of truth.

Attached files include:
- lib/resume-data.ts (required)
- docs/resume/RESUME_VARIANT_POSITIONING.md (recommended)
- app/styles/13-resume-latex.css (recommended)
- docs/resume/resume-generation-spec.md (recommended)

Goal:
Rebuild every resume variant in lib/resume-data.ts by selecting the strongest project combinations and strongest bullet subsets for each role angle, while preserving one-page US Letter output for every variant.

Canonical variant IDs (must remain unchanged):
- web-dev
- aws
- python
- aws-web-dev
- aws-python
- web-dev-django
- it-support
- it-support-aws
- sales
- call-centre

Primary source rule (strict):
1) Treat lib/resume-data.ts as the only source of truth.
2) Reuse only projects, bullet content, dates, companies, and technologies already defined there.
3) Do not invent or import new claims, metrics, timelines, employers, tools, or outcomes.

Selection policy (strict):
1) For each variant, keep only the projects with the strongest role relevance.
2) Within selected projects, keep only the strongest bullets for that variant.
3) Prefer quantified impact, ownership, technical depth, and clear business/user outcomes.
4) Remove weaker, repetitive, or generic bullets even if they are recent.
5) Keep each variant focused; do not force every project into every variant.

Scoring rubric for bullet selection:
- 40% role relevance to the target variant
- 30% impact strength (metrics/outcomes)
- 20% ownership/complexity
- 10% clarity/scannability

Edit scope:
- Required: lib/resume-data.ts
- Optional (last resort only): app/styles/13-resume-latex.css per-variant print variables:
  - --resume-print-scale
  - --resume-print-leading
  - --resume-print-top-offset
- Do not modify other files.

One-page fit workflow (strict order):
1) Select strongest projects and bullets per variant.
2) Reduce project count and bullet count where needed.
3) Only if overflow remains, tune per-variant print variables.

Formatting and structure constraints:
- Preserve TypeScript types and object structure in lib/resume-data.ts.
- Preserve all variant IDs, labels, and file names.
- Preserve Computer Modern-style print behavior, white background, and black text.
- Keep claims concise, recruiter-readable, and defensible.

Output requirements:
1) Return unified diffs only.
2) Include diffs only for files changed.
3) Before diffs, include:
   - variant-by-variant project selection summary,
   - bullet count per project in each variant,
   - any softened/removed claims and why.

Mandatory acceptance checks (run in order and report status):
- npm run build
- npm run calibrate:resume-layout
- npm run verify:resume-layout
- npm run validate-resume-pdfs

Failure handling:
If any check fails, update diffs, rerun checks, and report final passing status.
```

## Validation Checklist

- All 10 canonical variant IDs remain present and unchanged in `lib/resume-data.ts`.
- Variant project/bullet choices are strongest-role-fit selections from existing source content.
- No invented claims or imported evidence outside `lib/resume-data.ts`.
- One-page layout checks pass for all variants after regeneration.
- CSS print variable changes are only used when content pruning alone is insufficient.
