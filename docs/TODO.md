# TODO

Last updated: 2026-02-18 17:43 UTC

## What's Done

- [x] 2026-02-16 14:19 UTC - Fix resume header social icon paths so LinkedIn/GitHub icons load correctly from `public/icons/resume/`.
- [x] 2026-02-16 14:23 UTC - Adapt `AGENTS.md` and `CLAUDE.md` from quit-weed instructions to portfolio-site-specific guidance; keep shared `AGENTS-BASE.md`.
- [x] 2026-02-16 14:28 UTC - Replace legacy branding tokens and legacy creator phrase with `kmok` across app code, content, docs, and matching asset filenames.
- [x] 2026-02-16 14:35 UTC - Replace browser favicon with bracket-style `[K]` icon and wire metadata to use `/favicon.svg`.
- [x] 2026-02-16 14:38 UTC - Regenerate `app/favicon.ico` from the bracket-style `[K]` icon so browsers requesting `/favicon.ico` receive updated branding.
- [x] 2026-02-16 14:42 UTC - Update favicon mark to square `KM` (no brackets) using the same color palette and mono font, and regenerate `app/favicon.ico`.
- [x] 2026-02-16 18:03 UTC - Upgrade mobile homepage parity with desktop visual system: remove forced mobile theme lock, add `Resume` CTA + inline `Settings` sections to parallax flow, and fix section navigation to use real element offsets.
- [x] 2026-02-16 18:07 UTC - Make mobile parallax backgrounds transparent (remove gray section/frame backplates) and tune panel/settings fill opacity so wallpaper shows through.
- [x] 2026-02-16 18:09 UTC - Convert mobile Neofetch from fixed background layer to a top hero section that scrolls away; restore functional accent palette interactions in Neofetch.
- [x] 2026-02-16 18:11 UTC - Fix Neofetch mobile accent swatch taps by preventing the hero bottom gradient overlay from capturing pointer events.
- [x] 2026-02-16 18:13 UTC - Remove redundant Neofetch accent swatch palette in both desktop and mobile layouts; keep accent control only in dedicated settings/accent tiles.
- [x] 2026-02-16 18:16 UTC - Force mobile parallax surfaces to stay transparent across accent changes by removing theme-surface gray fills from section cards/settings and Neofetch hero wrapper.
- [x] 2026-02-16 18:35 UTC - Fix mobile wallpaper switching so Settings -> Background controls update the active parallax wallpaper instead of staying pinned to the default image.
- [x] 2026-02-16 18:38 UTC - Make Web Development resume PDF the default selection on desktop resume view and the default PDF link in mobile Resume CTA.
- [x] 2026-02-18 16:36 UTC - Add deploy recovery tooling with `rebuild-restart-portfolio.sh` and `docs/DEPLOY_RECOVERY.md` to rebuild, restart `portfolio.service`, and verify Next.js chunk health after deploy drift.
- [x] 2026-02-18 17:35 UTC - Fix OG metadata quality checks by lengthening SEO title/description, switching fallback OG image paths to `opengraph-image.jpg`, and regenerating a 1200x630 CTA image under WhatsApp size guidance.
- [x] 2026-02-18 17:43 UTC - Use the new `public/opengraph-image.png` asset as the default OG image by optimizing it in-place to 1200x630 (~305 KB) and repointing fallback metadata/image URLs from `.jpg` to `.png`.
