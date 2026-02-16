# Favicon KM - Quick Smoke Test

## Prerequisites

- Repo includes favicon KM changes.
- Local browser cache can be hard-refreshed.

## Smoke Tests

### T1 - Metadata points to SVG favicon

Objective: Verify root metadata is wired to `/favicon.svg`.

Steps:

```bash
rg -n "icons:\s*\{|icon:\s*'/favicon.svg'|shortcut:\s*'/favicon.svg'" app/layout.tsx
```

Expected results:
- Hits show `icon` and `shortcut` both set to `/favicon.svg`.

Failure modes / debugging notes:
- If missing, update `app/layout.tsx` metadata icons and rerun.

### T2 - Favicon assets exist for SVG and ICO

Objective: Confirm favicon files exist at expected paths.

Steps:

```bash
ls -l public/favicon.svg app/favicon.ico
```

```bash
rg -n "viewBox=\"0 0 64 64\"|>KM<" public/favicon.svg
```

```bash
file app/favicon.ico
```

Expected results:
- Files exist.
- SVG includes the expected viewBox and `KM` labeling.
- ICO reports multiple icon sizes.

Failure modes / debugging notes:
- If files are missing or malformed, recreate `public/favicon.svg` and regenerate `app/favicon.ico` from it.

### T3 - Browser displays new icon

Objective: Confirm the tab favicon is square `KM`.

Steps:

```bash
npm run cleanup
```

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Expected results:
- Browser tab icon shows square `KM` on dark background.

Failure modes / debugging notes:
- If old icon persists, hard refresh and clear site data.
- If still stale, stop all Next.js processes and restart dev server.

## Success criteria checklist

- [ ] Metadata icon path is `/favicon.svg`.
- [ ] `public/favicon.svg` exists and matches square `KM` design.
- [ ] `app/favicon.ico` exists and is regenerated from square `KM` icon.
- [ ] Browser tab displays new icon.
