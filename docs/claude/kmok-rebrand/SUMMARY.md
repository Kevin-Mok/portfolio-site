# Kmok Rebrand - Summary

Status: READY

## What's new

- Replaced targeted legacy brand and creator strings with `kmok` across code, content, and docs.
- Renamed matching asset files in `public/images/` and `public/images/profile/` to `kmok-*` and updated references.
- Updated repo-wide and feature-level smoke test docs.

## Files changed

- `package.json`
- `README.md`
- `app/api/contact/route.ts`
- `components/assets/KmokVectorLogo.tsx`
- `components/assets/archAscii.ts`
- `components/layout/Polybar.tsx`
- `components/tiles/NeofetchTile.tsx`
- `config/projects.config.ts`
- `content/blog/building-software-like-a-builder/index.mdx`
- `content/blog/local-ai-prepping-2025/index.mdx`
- `content/projects/agent-state-machine/index.mdx`
- `content/projects/llm-security-auditor/index.mdx`
- `content/projects/peak-ai-agent-stack/index.mdx`
- `content/projects/rin-streams/index.mdx`
- `content/projects/rinai-multimodal-vtuber/index.mdx`
- `docs/CDN_DEPLOYMENT_SPEC.md`
- `docs/CONTACT_FORM_SPEC.md`
- `docs/TODO.md`
- `lib/config.ts`
- `lib/image-paths.ts`
- `next.config.ts`
- `public/images/kmok-homelab.webp`
- `public/images/kmok-tower-crane.webp`
- `public/images/profile/kmok-shinjuku.webp`
- `public/images/profile/kmok-shinjuku-RF-DETR.webp`
- `public/robots.txt`
- `QUICK_SMOKE_TEST.md`
- `docs/claude/kmok-rebrand/QUICK_SMOKE_TEST.md`
- `docs/claude/kmok-rebrand/SUMMARY.md`

## Key behaviors / invariants

- All targeted strings requested by user are now `kmok`.
- Runtime asset references remain valid due coordinated file renames.
- Root smoke gate is aligned with completed TODO entries.

## Risks / limitations

- External links/domains/usernames were string-replaced and may require real-world verification (DNS/repo handles).
- This change is textual and does not validate ownership or availability of new domains/handles.

## How to test

- Run `docs/claude/kmok-rebrand/QUICK_SMOKE_TEST.md`.

## Rollback plan

- Revert this change set in git to restore prior branding strings and asset names.
