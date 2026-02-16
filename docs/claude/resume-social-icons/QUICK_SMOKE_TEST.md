# Resume Social Icons - Quick Smoke Test

## Prerequisites

- Dev dependencies installed.
- Local dev server can start.

## Smoke Tests

### T1 - Icons appear in resume header

Objective: Confirm GitHub and LinkedIn icons render in the resume header.

Steps:

```bash
npm run dev
```

```text
http://localhost:3000/resume
```

Expected results:
- LinkedIn icon is visible next to `linkedin.com/in/Kev-Mok`.
- GitHub icon is visible next to `github.com/Kevin-Mok`.
- Both icons are aligned with the other contact icons.

Failure modes / debugging notes:
- Broken icon placeholder indicates wrong static path.
- Verify icon refs in `components/tiles/content/resume/ResumeHeader.tsx`.
- Verify assets exist in `public/icons/resume/`.

## Cleanup

- Stop the dev server.

## Success criteria checklist

- [ ] LinkedIn icon renders.
- [ ] GitHub icon renders.
- [ ] No regressions for phone/email icons.

