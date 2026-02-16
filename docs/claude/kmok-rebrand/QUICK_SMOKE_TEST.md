# Kmok Rebrand - Quick Smoke Test

## Prerequisites

- Local branch includes kmok rename changes.
- Dependencies installed.

## Smoke Tests

### T1 - No remaining legacy tokens

Objective: Verify source/docs/config no longer include targeted legacy strings.

Steps:

```bash
rg -n -P --hidden -S -g '!.git/**' -g '!.next/**' -g '!node_modules/**' "(?i)\\x64\\x6c\\x65\\x65\\x72|\\x6f\\x72\\x69\\x67\\x69\\x6e\\x61\\x6c\\x20\\x63\\x72\\x65\\x61\\x74\\x6f\\x72" .
```

Expected results:
- Command returns no output.

Failure modes / debugging notes:
- If any match appears, replace it with `kmok` and rerun.
- Ignore `.git` internals and build artifacts.

### T2 - Renamed image assets resolve

Objective: Verify renamed `kmok-*` image files exist.

Steps:

```bash
ls -l public/images/kmok-homelab.webp
```

```bash
ls -l public/images/kmok-tower-crane.webp
```

```bash
ls -l public/images/profile/kmok-shinjuku.webp
```

```bash
ls -l public/images/profile/kmok-shinjuku-RF-DETR.webp
```

Expected results:
- All commands return existing files.

Failure modes / debugging notes:
- If missing, confirm file rename operations in `public/images/` and `public/images/profile/`.

### T3 - App compiles under updated names

Objective: Verify TypeScript build graph remains valid after replacements.

Steps:

```bash
npm run typecheck
```

Expected results:
- Command exits successfully with no TypeScript errors.

Failure modes / debugging notes:
- If errors reference renamed symbols/paths, update imports and file paths.

## Success criteria checklist

- [ ] No targeted legacy tokens remain.
- [ ] Renamed kmok image assets exist.
- [ ] Typecheck passes.
