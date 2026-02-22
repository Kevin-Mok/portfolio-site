# ChatGPT Prompt: Refresh Resume Variants After Portfolio Bullet Changes

Use this prompt when `portfolioSiteProject` bullets changed and you want to refresh resume variants in `lib/resume-data.ts` so relevant points are updated and weaker projects/bullets are replaced where role fit improves.

## Attach These Files

Core context:
- `/home/kevin/coding/portfolio-site/docs/resume/RESUME-READMES.md`
- `/home/kevin/coding/portfolio-site/docs/resume/RESUME_VARIANT_POSITIONING.md`
- `/home/kevin/coding/portfolio-site/docs/resume/resume-generation-spec.md`
- `/home/kevin/coding/portfolio-site/lib/resume-data.ts`
- `/home/kevin/coding/portfolio-site/app/styles/13-resume-latex.css`

Source content:
- All README/MD files listed in `docs/resume/RESUME-READMES.md`

## Updated Portfolio Source (Authoritative)

Treat this as the latest approved `portfolioSiteProject` source when selecting portfolio bullets:

```ts
const portfolioSiteProject: ResumeProject = {
  name: 'www.kevin-mok.com',
  url: 'https://kevin-mok.com/',
  languages: ['TypeScript', 'Next.js', 'Tailwind CSS'],
  date: 'Jan 2026 — Feb 2026',
  bullets: [
    '<strong>Engineered</strong> an automated resume generation pipeline using <strong>Node.js</strong>, eliminating <strong>100%</strong> of manual maintenance for <strong>10</strong> role-specific resume variants.',
    '<strong>Orchestrated</strong> a multi-layer spam mitigation system via the <strong>Resend API</strong>, featuring rate-limiting and honeypots that filtered <strong>95%</strong> of junk submissions to prioritize high-value inquiries.',
    '<strong>Architected</strong> a dual-mode layout system using <strong>Framer Motion</strong>, delivering a fluid <strong>60fps</strong> tiled desktop experience and a high-engagement parallax mobile interface.',
    '<strong>Centralized</strong> content management using <strong>Content Collections</strong>, improving site update speeds by <strong>50%</strong> through a strictly-typed MDX workflow that validates data at build time.',
    '<strong>Optimized</strong> asset delivery by integrating <strong>Cloudflare R2</strong> and <strong>Next.js Image</strong> patterns, reducing global image loading latency by <strong>35%</strong>.',
    '<strong>Implemented</strong> advanced focus-management logic in <strong>React</strong>, increasing user engagement by <strong>22%</strong> through keyboard-driven "Zen Mode" navigation and intuitive directional controls.',
    '<strong>Refined</strong> frontend performance by preloading critical <strong>JetBrains Mono</strong> assets and implementing dynamic preconnects, achieving a <strong>100/100</strong> score on Lighthouse SEO and Accessibility audits.',
    '<strong>Developed</strong> a modular theme engine supporting <strong>15</strong> color presets and <strong>3</strong> layout modes, ensuring <strong>100%</strong> cross-device readability and a personalized user experience.',
    '<strong>Streamlined</strong> deployment workflows using <strong>Railway Railpacks</strong>, achieving zero-config production builds and maintaining <strong>99.9%</strong> uptime for high-traffic recruitment periods.',
    '<strong>Standardized</strong> styling architecture into <strong>12</strong> micro-modules under <strong>200</strong> lines each, reducing technical debt and cutting future maintenance rework by <strong>40%</strong>.',
  ],
};
```

## Copy/Paste Prompt

```text
You are refreshing resume variants in portfolio-site after portfolio-site project bullets were revised.

Attached files include:
- docs/resume/RESUME-READMES.md
- docs/resume/RESUME_VARIANT_POSITIONING.md
- docs/resume/resume-generation-spec.md
- lib/resume-data.ts
- app/styles/13-resume-latex.css
- all README/MD files listed in RESUME-READMES.md

You are also given an authoritative updated `portfolioSiteProject` snippet in this prompt. Use that snippet as the latest approved source for portfolio-site project bullets.

Goal:
Update resume variants so changed portfolio bullets are reflected where relevant, and replace weaker or less-relevant project selections/bullets when stronger role-fit evidence exists.

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

Source policy:
1) Use equal weighting across all attached revised sources.
2) Do not force portfolio-site bullets into every variant.
3) For each variant, choose the strongest project + bullet mix based on role fit and impact.
4) Use the authoritative updated `portfolioSiteProject` snippet for portfolio-site bullets.

Selection and replacement policy (strict):
1) Update variant bullets that should change because the portfolio-site source changed.
2) Replace weaker or repetitive bullets with stronger alternatives when available.
3) Replace less relevant projects if another project better sells that variant's purpose.
4) Prefer concrete outcomes, ownership, and scannability.
5) Do not invent claims, metrics, dates, employers, tools, or outcomes.

Edit scope:
- Required: lib/resume-data.ts
- Optional (last resort only): app/styles/13-resume-latex.css print controls:
  - --resume-print-scale
  - --resume-print-leading
  - --resume-print-top-offset
- Do not modify other files.

One-page fit workflow (strict order):
1) Select the strongest role-relevant project set and bullets.
2) Reduce project/bullet count where needed.
3) Only if overflow remains, tune per-variant print variables.

Formatting and structure constraints:
- Preserve all variant IDs, labels, and filenames.
- Preserve TypeScript structure and types in lib/resume-data.ts.
- Keep Computer Modern resume appearance, white background, and black text for print output.
- Keep claims defensible and consistent with attached evidence.

Output requirements:
1) Return unified diffs only.
2) Include diffs only for files you changed.
3) Before diffs, include:
   - variant-by-variant project selection summary,
   - project and bullet counts per variant,
   - which weaker projects/bullets were replaced and why.

Acceptance checks to run and report:
- npm run build
- npm run verify:resume-layout
- npm run validate-resume-pdfs

Failure handling:
If any acceptance check fails, update diffs, rerun checks, and report final passing status.
```

## Validation Checklist

- All 10 canonical variant IDs remain present and unchanged.
- Updated portfolio bullets are reflected where they improve role relevance.
- Weaker or less-relevant projects/bullets are replaced only when a stronger role-fit alternative exists.
- No invented or inflated claims beyond attached source evidence.
- One-page output constraints are preserved across variants.

## Notes

- This workflow updates resume variants, not README bullet sections.
- This prompt is intentionally selective: strongest role-fit subset wins, not blanket inclusion.
