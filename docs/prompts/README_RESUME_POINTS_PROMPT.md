# ChatGPT Prompt: Update Project READMEs With Resume-Ready Points

Use this prompt in ChatGPT to update project READMEs with short, variant-aware resume points that maximize recruiter impact.

## Attach These Files First

Required resume targeting context:
- `/home/kevin/coding/portfolio-site/docs/resume/RESUME_VARIANT_POSITIONING.md`
- `/home/kevin/coding/portfolio-site/lib/resume-data.ts`

Required project docs:
- `/home/kevin/coding/quit-weed/README.md`
- `/home/kevin/coding/portfolio-site/README.md`
- `/home/kevin/coding/stb-mkt/README.md`

`nomar-stocks` fallback context (root `README.md` currently missing):
- `/home/kevin/coding/nomar-stocks/docs/requirements.md`
- `/home/kevin/coding/nomar-stocks/docs/client-notes.md`
- `/home/kevin/coding/nomar-stocks/docs/research.md`

Optional if available:
- `/home/kevin/coding/nomar-stocks/README.md`

## Copy/Paste Prompt

```text
You are helping me create resume-ready project bullets inside each project README.

I attached:
1) Resume variant intent docs (`RESUME_VARIANT_POSITIONING.md`, `lib/resume-data.ts`)
2) Project README/docs for:
   - quit-weed
   - portfolio-site
   - stb-mkt
   - nomar-stocks (docs only if README is missing)

Goal:
Update each project README so it includes a compact section with brief, high-impact, resume-ready points aligned to what each resume variant is trying to sell.

Output format requirements:
- Return unified diffs only (one diff per project file).
- If a target README does not exist (for example nomar-stocks), first create it with a short standard structure and include the new resume points section.
- Do not modify unrelated content.

Content requirements:
- Add a section titled exactly: `## Resume-ready points by variant`
- Under that section, provide one short bullet per variant id:
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
- Keep each bullet to a single sentence.
- Length target per bullet: 12-22 words (hard max: 28 words).
- Use aggressive, recruiter-effective wording while remaining fully defensible and accurate.
- Keep wording concrete: action + technical/context signal + outcome/impact.
- Match each variant's positioning from `RESUME_VARIANT_POSITIONING.md`.
- Style should fit existing resume bullet density in `lib/resume-data.ts` (concise, specific, employer-facing).

Editing constraints:
- Keep Markdown clean and scannable.
- Preserve the project's voice and existing heading style.
- If a variant is weakly related to a project, still provide a transferable, honest bullet (do not leave blank).

Before final diffs:
- Briefly list any unsupported claims you removed, softened, or converted from numeric to qualitative wording.
- Confirm all 10 variants are represented in each project's new section.
- Confirm each bullet is one sentence and within the length constraint.
```

## Notes

- This prompt is designed for README edits, not direct edits to `lib/resume-data.ts`.
- After README updates are approved, a second pass can map the strongest bullets into resume variants.
