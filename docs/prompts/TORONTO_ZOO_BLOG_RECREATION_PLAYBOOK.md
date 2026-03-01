# TORONTO_ZOO_BLOG_RECREATION_PLAYBOOK

## Purpose

Reusable instructions to recreate the Toronto Zoo media-first post format from a new source folder.

## Request History From This Session (Chronological)

Use this section as the full requirement log. When requirements conflict, the later request overrides earlier ones.

1. Create Toronto Zoo blog/page content from local source documents/media.
2. Writing angle: media-first + audio recording summaries.
3. Include audio summaries as **1-3 short paragraphs** (later evolved to animal-specific talk sections).
4. Slug changes requested over time:
   - `/toronto-zoo/2/28`
   - `/toronto-zoo/26/2/28`
   - final canonical: `/toronto-zoo/2026/2/28`
5. Do not require OpenAI API key.
6. Prefer offline tooling; user mentioned Ollama image recognition as an available option.
7. Content focus must include media + audio summaries from animal recordings.
8. Need free offline transcription on Ubuntu CLI.
9. Keep stock photos.
10. Add captions for **all included pictures**, even without narrative snippet.
11. Add modern scrolling/fade-in animation.
12. Page should render fast and be server-generated.
13. Must be mobile-friendly.
14. Theme does not need to match terminal theme.
15. Visual inspiration from Toronto Zoo website: mostly white + green.
16. Theme direction: environmental / wildlife preservation aligned.
17. Use canonical name spellings from recordings:
   - `Pemba`
   - `Jita`
   - `Zoya`
   - `Minu`
   - `Akron` (destination reference)
18. Keep transcripts in repo under docs.
19. Handle hydration mismatch caused by extension-injected attributes.
20. Add legacy route aliases so old short slugs redirect to canonical route.
21. Media curation requests changed over time:
   - max 2 photos per animal
   - then merge reference + onsite
   - then only 1 photo per animal
   - then request changed again: pick 2 highlights per animal + 1 video each
22. Crop videos to focus on animals.
23. Keep same crop framing but retain near-original quality.
24. Make selected animal visuals full-width for better landscape viewing.
25. Ensure titles are not monospaced.
26. Final structure request: separate section per animal talk with at least 2 short paragraphs each.
27. Keep media selection at exactly **2 photos + 1 video per animal**.
28. Use media from `/mnt/linux-files-3/hevin/2.28.26 - Toronto Zoo`.
29. Select the most zoomed-in photos where the animal is the primary subject.
30. For problematic wide shots, crop tighter to animal-only framing.
31. Keep the same crop style across animal videos, but retain original quality as much as possible.
32. Ensure video previews are visible (poster images + compatible encoding).
33. Keep images/videos at a shared max-height target (~2/3 viewport) for desktop balance.
34. Photo pair for each animal should be side-by-side in one row.
35. Do not use scroll-triggered animations.

## Current Canonical Output Spec (Apply These By Default)

If recreating from scratch today, use this as the baseline unless explicitly overridden:

1. Canonical route: `/toronto-zoo/YYYY/M/D` (example: `/toronto-zoo/2026/2/28`).
2. Provide redirects from shorter legacy forms if needed.
3. Server-generated page + optimized media for fast rendering.
4. Mobile-first responsive layout.
5. White/green conservation visual language.
6. Non-monospace headings (theme-consistent typography).
7. Separate sections for each animal talk.
8. Each animal section contains at least 2 short paragraphs.
9. Include exactly 2 highlighted images per animal (if available).
10. Include one focused video per animal where source media exists.
11. Source media from `/mnt/linux-files-3/hevin/2.28.26 - Toronto Zoo` unless user supplies a new source directory.
12. Prioritize the most zoomed-in animal photos; crop wide photos tighter when needed so the animal is the focal subject.
13. Keep one consistent crop style for all animal highlight videos and re-encode from original source media at high quality.
14. Animal feature blocks can be full-width for landscape impact.
15. Photo pairs for each animal should display side-by-side in one row on desktop.
16. Keep a shared media max-height cap for photos/videos (target around 2/3 viewport).
17. Use video posters so previews are visible before playback.
18. All displayed images must have captions.
19. Audio-derived text should use transcript-grounded summaries, not verbatim quotes unless manually verified.
20. Store transcript artifacts under docs for reproducibility.
21. Do not add scroll-triggered animations.

## File + Asset Conventions

Use these conventions for repeatable output:

- Page route files:
  - `app/toronto-zoo/YYYY/M/D/page.tsx`
  - `app/toronto-zoo/YYYY/M/D/page.module.css`
- Optional legacy redirects:
  - `app/toronto-zoo/M/D/page.tsx`
  - `app/toronto-zoo/YY/M/D/page.tsx`
- Images:
  - `public/images/blog/toronto-zoo-YYYY-MM-DD/*`
- Videos:
  - `public/videos/blog/toronto-zoo-YYYY-MM-DD/*`
- Preferred media selection per animal:
  - 2 most zoomed-in photos
  - 1 cropped high-quality video
- Transcript docs:
  - `docs/toronto-zoo/YYYY-MM-DD/README.md`
  - `docs/toronto-zoo/YYYY-MM-DD/transcripts/*.txt`

## Offline Transcription Workflow (Ubuntu, No API Key)

### Recommended options

1. `openai-whisper` (Python package), CPU mode.
2. Start fast with `tiny.en` for draft summaries.
3. Upgrade to `base.en` for better coherence.
4. Use `large-v3-turbo` only when hardware/runtime budget allows.

### Suggested model choice

- `tiny.en`: fastest, lowest accuracy.
- `base.en`: good speed/quality balance for rough field recordings.
- `small.en`/`medium.en`: higher quality, slower.
- `large-v3-turbo`: strong quality, still heavy on CPU.
- `large-v3`: highest quality, slowest.

## Video Cropping Guidance (Animal Focus)

1. Identify crop window from frame sheets.
2. Apply consistent crop window per clip.
3. Re-encode from original source (not previously compressed outputs) for best quality retention.
4. Use `-movflags +faststart` for web playback.
5. Keep codec settings browser-safe (H.264 + AAC, `yuv420p`) and provide poster images.

Example high-quality command pattern:

```bash
ffmpeg -i INPUT -vf "crop=1080:1080:0:Y_OFFSET" \
  -c:v libx264 -preset slow -crf 14 \
  -c:a aac -b:a 192k -movflags +faststart OUTPUT
```

## Quality Gates Checklist

1. Canonical route loads and legacy aliases redirect correctly.
2. No hydration mismatch warnings from extension-injected attributes (`suppressHydrationWarning` on root html if needed).
3. Build passes.
4. Media loads on desktop + mobile.
5. Captions exist for all displayed images.
6. Animal sections contain at least 2 short paragraphs each.
7. Each animal uses exactly 2 photos + 1 video from the specified source directory (or explicit override).
8. Photo pairs for each animal are side-by-side on desktop.
9. Media max-height is capped consistently (~2/3 viewport target).
10. Video previews appear before playback (poster + compatible encoding).
11. Canonical name spellings are consistent in authored copy.

## Reusable Master Prompt (Copy/Paste)

```text
Build a server-rendered, mobile-friendly Toronto Zoo field-notes page from:
{{SOURCE_DIR}}

Requirements:
- Canonical slug: /toronto-zoo/{{YEAR}}/{{MONTH}}/{{DAY}}
- Add legacy redirects from short forms if needed.
- White + green conservation theme inspired by Toronto Zoo branding.
- Non-monospace headings and no scroll-triggered animation.
- Separate sections for each animal talk, with at least 2 short paragraphs each.
- Curate exactly 2 highlight photos per animal (if available), prioritizing the most zoomed-in animal framing, with captions for every displayed image.
- Include exactly one focused video per animal when source video exists.
- Crop videos to keep the animal centered; keep one consistent crop style across species and re-encode from original source at high quality.
- Keep stock/reference photos when needed.
- Use offline transcription only (no OpenAI API key), prioritize tiny.en -> base.en -> higher models only if needed.
- Store transcripts under docs/toronto-zoo/{{DATE_ISO}}/transcripts and add a README with canonical name spellings.
- Use canonical spellings in authored copy: Pemba, Jita, Zoya, Minu, Akron.
- Use video poster images and browser-compatible encode settings so previews are visible.
- Keep media max-height aligned across images/videos (target ~2/3 viewport desktop).
- Render each animal's two photos side-by-side in one row on desktop.
- Ensure build passes and route loads without hydration warnings.
```
