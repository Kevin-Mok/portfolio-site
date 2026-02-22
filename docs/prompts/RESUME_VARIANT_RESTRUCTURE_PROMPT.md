# ChatGPT Prompt: Restructure Resume Variants From README Variant Points

Use this prompt to rebuild `lib/resume-data.ts` resume variant content from project README variant bullets, while keeping each variant to a single page with print spacing aligned to the legacy baseline look.

## Attach These Files (Single Pass)

Core context:
- `/home/kevin/coding/portfolio-site/docs/archive/UPDATED_README_PATHS.md`
- `/home/kevin/coding/portfolio-site/docs/resume/RESUME_VARIANT_POSITIONING.md`
- `/home/kevin/coding/portfolio-site/docs/resume/resume-generation-spec.md`
- `/home/kevin/coding/portfolio-site/lib/resume-data.ts`
- `/home/kevin/coding/portfolio-site/app/styles/13-resume-latex.css`

Source project files listed in `UPDATED_README_PATHS.md`:
- `/home/kevin/coding/quit-weed/README.md`
- `/home/kevin/coding/portfolio-site/README.md`
- `/home/kevin/coding/stb-mkt/README.md`
- `/home/kevin/coding/nomar-stocks/README.md`
- `/home/kevin/coding/me-sniper/README.md`
- `/home/kevin/coding/kanban-calendar/README.md`
- `/mnt/linux-files-3/github-repos/astronofty/README.md`
- `/mnt/linux-files-3/github-repos/gobcog/README.md`
- `/mnt/linux-files-3/github-repos/spotify-lib-vis/README.md`
- `/home/kevin/coding/red-hat-contributions/RED-HAT-CONTRIBUTIONS.md`

Reference visual baseline (for style/spacing feel):
- `/home/kevin/coding/mf-site/public/pdf/kevin-mok-resume-web-dev.pdf`

## Copy/Paste Prompt

```text
You are updating portfolio-site resume variants by selecting the strongest existing bullets from attached README variant sections.

Attached files include:
- docs/archive/UPDATED_README_PATHS.md
- docs/resume/RESUME_VARIANT_POSITIONING.md
- docs/resume/resume-generation-spec.md
- lib/resume-data.ts
- app/styles/13-resume-latex.css
- all project README/MD files listed in UPDATED_README_PATHS.md
- reference PDF: /home/kevin/coding/mf-site/public/pdf/kevin-mok-resume-web-dev.pdf

Goal:
Restructure each resume variant in lib/resume-data.ts so each variant sells the correct role angle and fits one US Letter page cleanly in the existing print system.

Primary source rule:
For each attached project file, read:
## Resume-ready points by variant
and its 10 variant subsections.

Variant IDs (must remain unchanged):
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

Selection policy (strict):
1) Pick the most impressive and role-relevant projects/bullets for each variant.
2) Use the strongest subset of sources per variant (do NOT force every README into every variant).
3) Prefer bullets with concrete metrics, ownership, and clear outcomes.
4) If needed for one-page fit, use fewer projects and fewer bullets per project.
5) Do not invent claims, numbers, dates, employers, or technologies.
6) Keep claims defensible and aligned with attached source text.

Scoring rubric for candidate bullets:
- 40% role relevance for the target variant positioning
- 30% quantified impact/outcome strength
- 20% ownership/technical depth
- 10% clarity/scannability

Edit scope:
- Required: update lib/resume-data.ts
- Optional (last resort only): adjust per-variant print variables in app/styles/13-resume-latex.css:
  - --resume-print-scale
  - --resume-print-leading
  - --resume-print-top-offset
- Do not modify other files.

One-page fit workflow (strict order):
1) Choose strongest bullets/projects.
2) Reduce bullet counts and project counts where necessary.
3) Only if overflow remains, tune the three print variables per affected variant.

Formatting and structure constraints:
- Keep all existing variant IDs, labels, and file names.
- Preserve TypeScript structure and types in lib/resume-data.ts.
- Preserve Computer Modern-style print appearance, white background, and black text behavior.
- Keep bold emphasis where supported by existing source bullets.

Output requirements:
1) Return unified diffs only.
2) Include diffs for only files you changed.
3) Before diffs, provide:
   - a variant-by-variant selection summary listing which source repos were used,
   - project count and bullet count chosen per variant,
   - any claims softened/removed due to insufficient proof.

Acceptance checks to run and report:
- npm run build
- npm run verify:resume-layout
- npm run validate-resume-pdfs

If any acceptance check fails:
- explain the failing variant(s),
- update diffs to fix,
- rerun checks until passing.
```

## Validation Checklist

- `lib/resume-data.ts` keeps all 10 canonical variant IDs and valid TypeScript structure.
- Each variant uses selected high-impact bullets aligned to `RESUME_VARIANT_POSITIONING.md`.
- No invented metrics/claims beyond attached source evidence.
- One-page fit is preserved across variants.
- If CSS print variables changed, only per-variant `--resume-print-*` controls were edited.

## Notes

- This workflow is intentionally selective: strongest subset per variant, not blanket inclusion.
- Content density should prioritize recruiter impact and readability over maximum bullet count.
