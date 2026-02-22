# Repo-Wide Quick Smoke Test

Target runtime: 15-25 minutes

## Coverage map

- [x] `docs/TODO.md` - Fix resume header social icon paths so LinkedIn/GitHub icons load correctly.
- [x] `docs/TODO.md` - Adapt `AGENTS.md` and `CLAUDE.md` to portfolio-site project guidance.
- [x] `docs/TODO.md` - Replace legacy branding tokens and legacy creator phrase with `kmok` across code/content/docs and renamed image assets.
- [x] `docs/TODO.md` - Replace browser favicon with bracket-style `[K]` icon and metadata path `/favicon.svg`.
- [x] `docs/TODO.md` - Regenerate `app/favicon.ico` from bracket-style `[K]` icon to satisfy `/favicon.ico` requests.
- [x] `docs/TODO.md` - Update favicon to square `KM` mark (no brackets) and regenerate ICO.
- [x] `docs/TODO.md` - Upgrade mobile homepage parity with desktop visual system (theme parity, resume CTA, inline settings, and section navigation fixes).
- [x] `docs/TODO.md` - Make mobile parallax backgrounds transparent and reduce gray overlay fill on section/settings surfaces.
- [x] `docs/TODO.md` - Convert mobile Neofetch to a top hero that scrolls away and ensure Neofetch accent palette changes actually apply.
- [x] `docs/TODO.md` - Fix Neofetch mobile accent swatch taps by making the hero bottom gradient overlay non-interactive.
- [x] `docs/TODO.md` - Remove redundant Neofetch accent swatch palette from desktop/mobile and keep accent control in dedicated settings tiles.
- [x] `docs/TODO.md` - Keep mobile parallax surfaces transparent during accent changes by removing gray theme-surface fills.
- [x] `docs/TODO.md` - Fix mobile wallpaper switching so Settings -> Background controls apply to the active parallax wallpaper.
- [x] `docs/TODO.md` - Add deploy recovery tooling to rebuild, restart `portfolio.service`, and verify Next.js chunk health after deploy drift.
- [x] `docs/TODO.md` - Harden deploy recovery checks with bounded retries so transient post-restart `502` responses do not fail recovery.
- [x] `docs/TODO.md` - Fix OG metadata quality checks and regenerate a 1200x630 fallback image under WhatsApp size guidance.
- [x] `docs/TODO.md` - Use `public/opengraph-image.png` as default OG image and repoint fallback metadata URLs from `.jpg` to `.png`.
- [x] `docs/TODO.md` - Make Web Development resume PDF the default selection on desktop and mobile resume download links.
- [x] `docs/TODO.md` - Automate build-time generation of LaTeX-style resume PDFs from variant data with US Letter output and black-text styling.
- [x] `docs/TODO.md` - Rework resume header/layout density to match old one-page structure and remove Chrome print header/footer from generated PDFs.

## T1 - Resume social icons render

Objective: Verify LinkedIn and GitHub icons are visible on the resume header.

Steps:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/resume
```

Expected results:
- LinkedIn icon is visible next to `linkedin.com/in/Kev-Mok`.
- GitHub icon is visible next to `github.com/Kevin-Mok`.
- Phone and email icons still render.
- No broken-image placeholders appear in the resume header.

Failure modes / debugging notes:
- If icons are broken, verify `components/tiles/content/resume/ResumeHeader.tsx` uses `/icons/resume/linkedin.svg` and `/icons/resume/github.svg`.
- Verify files exist:

```bash
ls -l public/icons/resume
```

## T2 - Agent docs match portfolio-site stack

Objective: Verify agent guidance references Next.js portfolio workflows (not Expo mobile flows).

Steps:

```bash
rg -n "Next\.js 15\.5\.4|npm run dev|docs/TODO\.md|QUICK_SMOKE_TEST\.md" AGENTS.md CLAUDE.md
```

```bash
rg -n "expo|React Native|eas build" AGENTS.md CLAUDE.md
```

Expected results:
- First command finds portfolio-site guidance in both files.
- Second command returns no hits.

Failure modes / debugging notes:
- If mobile keywords still appear, re-open both files and remove remaining quit-weed/Expo references.

## T3 - Kmok rebrand strings are complete

Objective: Ensure all target legacy tokens were replaced and renamed assets exist.

Steps:

```bash
rg -n -P --hidden -S -g '!.git/**' -g '!.next/**' -g '!node_modules/**' "(?i)\\x64\\x6c\\x65\\x65\\x72|\\x6f\\x72\\x69\\x67\\x69\\x6e\\x61\\x6c\\x20\\x63\\x72\\x65\\x61\\x74\\x6f\\x72" .
```

```bash
ls -l public/images/kmok-homelab.webp public/images/kmok-tower-crane.webp public/images/profile/kmok-shinjuku.webp public/images/profile/kmok-shinjuku-RF-DETR.webp
```

Expected results:
- First command returns no output.
- Second command lists all four files successfully.

Failure modes / debugging notes:
- If `rg` finds matches, update remaining files and re-run.
- If image files are missing, check rename operations in `public/images/` and `public/images/profile/`.
- Deep test details: `docs/claude/kmok-rebrand/QUICK_SMOKE_TEST.md`.

## T4 - Square KM favicon is active for SVG and ICO

Objective: Verify browser favicon uses the new square `KM` icon for both `/favicon.svg` and `/favicon.ico`.

Steps:

```bash
rg -n "icons:\s*\{|icon:\s*'/favicon.svg'|shortcut:\s*'/favicon.svg'" app/layout.tsx
```

```bash
ls -l public/favicon.svg app/favicon.ico
```

```bash
file app/favicon.ico
```

Open:

```text
http://localhost:3000
```

Expected results:
- `app/layout.tsx` points icon and shortcut to `/favicon.svg`.
- `public/favicon.svg` and `app/favicon.ico` exist.
- `app/favicon.ico` contains multiple icon sizes.
- Browser tab shows square `KM` favicon on dark background.

Failure modes / debugging notes:
- If old icon appears, stop dev server and run `npm run cleanup`, then start `npm run dev` and hard refresh.
- If icon does not render, verify both SVG and ICO assets are present and not blocked by browser cache.
- Deep test details: `docs/claude/favicon-bracket-k/QUICK_SMOKE_TEST.md`.

## T5 - Mobile homepage parity and inline settings

Objective: Verify mobile homepage now carries desktop-level theme behavior and upgraded section flow.

Steps:

```bash
npm run dev
```

```bash
rg -n "window\\.innerWidth < 1024|setProperty\\('--accent-color'" contexts/ThemeContext.tsx hooks/useEnforceMobileTheme.ts components/layout/parallax/hooks/useParallaxTheme.ts
```

Open in mobile viewport (e.g. 390x844):

```text
http://localhost:3000
```

Expected results:
- Section sequence after Neofetch hero is `Bio` -> `Technologies` -> `Resume` -> `Settings`.
- Resume section includes CTA to `/resume` and a PDF link.
- Settings section shows working theme preset, accent, and background controls inline.
- Theme and accent changes apply immediately on mobile (no forced reset to Tokyo Night/cyan).
- Background carousel changes immediately update the visible mobile wallpaper.
- Keyboard section navigation (`Tab`, arrows) scrolls to the correct section boundaries.
- Section/frame backgrounds are transparent enough that wallpaper clearly shows through (no dominant flat gray backplate).
- Neofetch appears only as the top hero and is no longer visible as a persistent background while scrolling through lower sections.
- No accent swatch palette appears under Neofetch (desktop or mobile).
- Accent changes are done from dedicated settings controls only (Accent tile/settings section).
- Changing accent on mobile does not introduce gray panel/card backgrounds; surfaces remain transparent.

Failure modes / debugging notes:
- If theme resets on mobile, verify no force-set classes/inline accent in `hooks/useEnforceMobileTheme.ts` and `components/layout/parallax/hooks/useParallaxTheme.ts`.
- If keyboard jumps land in wrong places, debug `components/layout/parallax/hooks/useSectionNavigation.ts` target offset calculation.
- If sections are missing, verify section list and switch cases in `components/layout/MobileParallaxLayout.tsx`.
- If gray still dominates, inspect `components/layout/parallax/components/ParallaxScrollContainer.tsx`, `components/layout/parallax/components/ParallaxBorderFrame.tsx`, and `.parallax-panel` styles in `app/styles/10-mobile.css`.
- If background controls do not change mobile wallpaper, inspect `components/layout/Background.tsx` `minimalOverlay` wallpaper selection logic and confirm it uses `theme.backgroundImage`.
- If Neofetch persists behind content, inspect `components/layout/parallax/components/ParallaxScrollContainer.tsx` for fixed-position background usage.
- If Neofetch still shows swatches, inspect `components/tiles/NeofetchTile.tsx` for remaining `setAccentColor`/swatch button rendering.
- If gray returns when accent changes, inspect `app/styles/10-mobile.css` (`.parallax-panel`, `.parallax-settings-card`) and the Neofetch hero wrapper background in `components/layout/parallax/components/ParallaxScrollContainer.tsx`.

## T6 - Deploy recovery script rebuilds and validates live assets

Objective: Verify the deploy recovery workflow is present and catches stale Next.js chunk issues.

Steps:

```bash
ls -l rebuild-restart-portfolio.sh docs/ops/DEPLOY_RECOVERY.md
```

```bash
bash -n rebuild-restart-portfolio.sh
```

```bash
rg -n "npm run build|systemctl restart|wait_for_http_200|READINESS_MAX_ATTEMPTS|/_next/static/chunks/webpack-" rebuild-restart-portfolio.sh docs/ops/DEPLOY_RECOVERY.md
```

Run on server with restart permissions:

```bash
./rebuild-restart-portfolio.sh
```

Expected results:
- Script and runbook files exist.
- Shell syntax check passes with no output.
- Grep confirms build + restart + bounded readiness retry + chunk verification logic is present.
- Recovery command rebuilds, restarts `portfolio` service, waits through transient warm-up responses, returns `200` on homepage, and returns `200` on extracted webpack chunk URL.

Failure modes / debugging notes:
- If restart fails with auth error, run as a user with sudo access to `systemctl restart portfolio`.
- If homepage returns temporary `502` after restart, allow retry loop to run; tune `READINESS_MAX_ATTEMPTS` and `READINESS_SLEEP_SECONDS` if warm-up exceeds defaults.
- If chunk extraction fails, inspect homepage HTML for missing `/_next/static/chunks/webpack-*.js` references and verify app is serving the expected build.
- If homepage check fails, verify DNS and nginx routing for `kevin-mok.com` before re-running recovery.

## T7 - OG metadata fallback image and path

Objective: Verify fallback OG metadata points to optimized `opengraph-image.png` and the image stays within expected size.

Steps:

```bash
rg -n "opengraph-image\\.png|ogImage|openGraph|twitter" app/layout.tsx config/portfolio.config.ts
```

```bash
ls -lh public/opengraph-image.png
```

Expected results:
- Metadata config and layout fallback reference `/opengraph-image.png`.
- `public/opengraph-image.png` exists and remains close to ~300 KB (well under common social crawler size limits).

Failure modes / debugging notes:
- If metadata points to `.jpg` or a missing path, update `config/portfolio.config.ts` and `app/layout.tsx` fallback image references.
- If image is oversized, re-optimize to 1200x630 and keep file size constrained for crawler compatibility.

## T8 - Resume defaults (desktop + mobile)

Objective: Verify Web Development resume is the default download on desktop resume page and mobile homepage CTA.

Steps:

```bash
npm run dev
```

Open desktop:

```text
http://localhost:3000/resume
```

Open mobile viewport (e.g. 390x844):

```text
http://localhost:3000
```

Expected results:
- On `/resume`, download button points to `/resume/kevin-mok-resume-web-dev.pdf` before changing the variant selector.
- On `/resume`, selector initially shows `Web Development`.
- In mobile Resume section CTA, `PDF` link opens `/resume/kevin-mok-resume-web-dev.pdf`.

Failure modes / debugging notes:
- If desktop no longer defaults to the web-dev resume, inspect `lib/resume-data.ts` (`DEFAULT_RESUME_VARIANT_ID`) and `components/tiles/content/ResumeContent.tsx` variant initialization.
- If mobile PDF no longer opens web-dev resume, inspect `components/layout/parallax/sections/ParallaxResumeCtaSection.tsx` link target.

## T8 - Build-time resume PDF generation

Objective: Verify resume PDFs are regenerated from typed variant data during build.

Steps:

```bash
npm run build
```

```bash
for f in public/resume/kevin-mok-resume-web-dev.pdf public/resume/kevin-mok-resume-sales.pdf public/resume/kevin-mok-resume-aws.pdf; do echo "--- $f"; pdfinfo "$f" | rg "Page size|CreationDate"; done
```

```bash
pdffonts public/resume/kevin-mok-resume-web-dev.pdf
```

Expected results:
- Build completes and logs a resume PDF generation summary for 10 active variants.
- Generated files exist under `public/resume/` with current timestamps.
- PDFs report `Page size: 612 x 792 pts (letter)`.
- `pdffonts` output includes `CMUSerif-*` fonts.
- Generated PDFs do not include browser print chrome (date/time/title/url/footer text).

Failure modes / debugging notes:
- If generation fails before output, verify a Chrome/Chromium binary exists in PATH (`google-chrome`, `google-chrome-stable`, `chromium`, or `chromium-browser`) or set `CHROME_BIN`.
- If generation fails with `is not a snap cgroup for tag snap.chromium.chromium`, your `CHROME_BIN` is Snap Chromium and cannot run in this session; install a non-Snap Chrome/Chromium binary (for example `google-chrome-stable`) and set `CHROME_BIN` to that path.
- If generation fails with `No Next.js production build found at .next/BUILD_ID`, run `npm run build` first.
- If validation fails with `spawnSync pdfinfo/pdffonts/pdftohtml ENOENT`, install `poppler-utils` (Ubuntu/Debian: `sudo apt install -y poppler-utils`).
- If validation fails with `Missing generated resume PDF(s)`, run `npm run build` (or `npm run generate-resume-pdfs`) before validation.
- If server startup fails, inspect `scripts/generate-resume-pdfs.mjs` output for `Next.js server stdout/stderr`.
- If a variant file is missing, verify the variant exists in both `lib/resume-data.ts` and `scripts/generate-resume-pdfs.mjs`.

## T9 - Resume layout parity (old-style header + full-page usage)

Objective: Verify resume layout uses the old-style header arrangement and available page width.

Steps:

```bash
npm run dev
```

Open:

```text
http://localhost:3000/resume
```

```bash
pdftotext public/resume/kevin-mok-resume-web-dev.pdf - | sed -n '1,40p'
```

Expected results:
- `/resume` is not wrapped in the framed/glass border shell.
- Name (`Kevin Mok`) is larger, black, centered, and underlined.
- No `Software Engineer` subtitle appears below the name.
- Header contact rows are left/right split:
  - left side: phone above email
  - right side: LinkedIn above GitHub
- `pdftotext` output for generated web-dev PDF does not begin with date/time and does not include local URL/footer line.

Failure modes / debugging notes:
- If frame borders still appear, inspect `app/resume/page.tsx` and verify `FramedPageLayout` is not used.
- If header layout is stacked in one column on desktop, inspect `components/tiles/content/resume/ResumeHeader.tsx` and `.resume-contact-columns` in `app/styles/13-resume-latex.css`.
- If date/title/url footer text appears in PDFs, inspect `scripts/generate-resume-pdfs.mjs` Chrome flags and verify `--no-pdf-header-footer` is present.
