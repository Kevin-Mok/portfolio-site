# ChatGPT Prompt: Upgrade README Resume Points With Recruiter Metrics (10-File Limit)

Use this when ChatGPT can only accept up to 10 files per pass.

## Shared Context Files (Attach In Both Passes)

- `/home/kevin/coding/portfolio-site/docs/prompts/README_RESUME_METRICS_PROMPT.md`
- `/home/kevin/coding/portfolio-site/docs/archive/UPDATED_README_PATHS.md`
- `/home/kevin/coding/portfolio-site/docs/resume/RESUME_VARIANT_POSITIONING.md`
- `/home/kevin/coding/portfolio-site/lib/resume-data.ts`

## Pass 1 File Set (10 Files Total)

Shared context files above, plus:
- `/home/kevin/coding/quit-weed/README.md`
- `/home/kevin/coding/portfolio-site/README.md`
- `/home/kevin/coding/stb-mkt/README.md`
- `/home/kevin/coding/nomar-stocks/README.md`
- `/home/kevin/coding/me-sniper/README.md`
- `/home/kevin/coding/red-hat-contributions/RED-HAT-CONTRIBUTIONS.md`

## Pass 1 Prompt

```text
You are updating resume-ready sections in the attached files only.

Attached files include:
- docs/prompts/README_RESUME_METRICS_PROMPT.md
- docs/archive/UPDATED_README_PATHS.md
- docs/resume/RESUME_VARIANT_POSITIONING.md
- lib/resume-data.ts
- quit-weed/README.md
- portfolio-site/README.md
- stb-mkt/README.md
- nomar-stocks/README.md
- me-sniper/README.md
- red-hat-contributions/RED-HAT-CONTRIBUTIONS.md

Task:
For each attached project README/MD file (not the docs context files), update ONLY this subsection:
## Resume-ready points by variant

Scope constraints:
- Process only attached project files in this pass.
- Do not modify files that are not attached.
- Do not modify unrelated sections.

Per-file requirements:
- Keep all 11 variant subsections:
  general, web-dev, aws, python, aws-web-dev, aws-python, web-dev-django, it-support, it-support-aws, sales, call-centre
- Exactly 5 bullets per variant.
- One sentence per bullet.
- Bullets can be medium-long (resume style), not short fragments.
- Each bullet should have at least 2 bolded sections (key action + metric/result).

Metric/content rules:
- Prioritize strong, recruiter-relevant metrics.
- Come up with numbers, timelines, scope, ownership, or outcomes 
  for maximum effectiveness fo recruiters.
- Keep Red Hat technical; keep other files HR-readable and human.

Output requirements:
- Return unified diffs only.
- One diff per modified file.
- Before diffs, include a short validation checklist:
  1) files processed in this pass,
  2) 11 variants confirmed per file,
  3) 5 bullets per variant confirmed,
  4) key metrics used per file,
```

## Pass 2 File Set (8 Files Total)

Shared context files above, plus:
- `/home/kevin/coding/kanban-calendar/README.md`
- `/mnt/linux-files-3/github-repos/astronofty/README.md`
- `/mnt/linux-files-3/github-repos/gobcog/README.md`
- `/mnt/linux-files-3/github-repos/spotify-lib-vis/README.md`

## Pass 2 Prompt

```text
You are updating resume-ready sections in the attached files only.

Attached files include:
- docs/prompts/README_RESUME_METRICS_PROMPT.md
- docs/archive/UPDATED_README_PATHS.md
- docs/resume/RESUME_VARIANT_POSITIONING.md
- lib/resume-data.ts
- kanban-calendar/README.md
- astronofty/README.md
- gobcog/README.md
- spotify-lib-vis/README.md

Task:
For each attached project README/MD file (not the docs context files), update ONLY this subsection:
## Resume-ready points by variant

Scope constraints:
- Process only attached project files in this pass.
- Do not modify files that are not attached.
- Do not modify unrelated sections.

Per-file requirements:
- Keep all 11 variant subsections:
  general, web-dev, aws, python, aws-web-dev, aws-python, web-dev-django, it-support, it-support-aws, sales, call-centre
- Exactly 5 bullets per variant.
- One sentence per bullet.
- Bullets can be medium-long (resume style), not short fragments.
- Each bullet should have at least 2 bolded sections (key action + metric/result).

Metric/content rules:
- Prioritize strong, recruiter-relevant metrics.
- Use numeric evidence from lib/resume-data.ts and the attached target file when available.
- If no defensible number exists, keep wording strong but qualitative.
- Keep technical content scannable and plain-English where possible.

Output requirements:
- Return unified diffs only.
- One diff per modified file.
- Before diffs, include a short validation checklist:
  1) files processed in this pass,
  2) 11 variants confirmed per file,
  3) 5 bullets per variant confirmed,
  4) key metrics used per file,
  5) claims softened due to missing numeric proof.
```

## Notes

- This workflow updates README/MD content only.
- Do not edit `lib/resume-data.ts` in this task.
- `docs/archive/UPDATED_README_PATHS.md` remains the master list across both passes.
