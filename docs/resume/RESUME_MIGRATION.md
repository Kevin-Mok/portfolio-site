# Resume Migration from Old Site

## Overview

This document describes what was migrated from the old Hugo-based site (`/home/kevin/coding/mf-site`) to the new Next.js portfolio.

## Content Migration

### Source Files

**Old site resume location**: `/home/kevin/coding/mf-site/content/resume/_index.md`

**Old site structure**: Hugo static site with shortcodes and Markdown

### Migrated Content

All content was preserved and converted from Hugo shortcodes to TypeScript structures.

#### Projects (3 total)

**Rarity Surf** (March 2025)
- **Old format**: Hugo shortcode with nested bullets
- **New format**: TypeScript object with `bullets` array
- **Technologies**: TypeScript, JavaScript, Node.js, React
- **Achievements migrated**:
  - Full-stack web app for NFT rarity rankings
  - 80% improvement in market research efficiency
  - 3,000+ concurrent request handling
  - 50% load time reduction
  - Discord bot increasing engagement by 80%

**Kanban Calendar** (Mar 2024)
- **Old format**: Hugo shortcode
- **New format**: TypeScript object
- **Technologies**: TypeScript, JavaScript, React, Next.js
- **Achievements migrated**:
  - Responsive Kanban board with Next.js/Tailwind
  - Intuitive cross-device navigation
  - Swipe gestures and infinite scrolling

**Astronofty** (Jan 2023)
- **Old format**: Hugo shortcode
- **New format**: TypeScript object
- **Technologies**: JavaScript, React, Solidity
- **Achievements migrated**:
  - 2nd place finish at UofTHacks X hackathon
  - React component optimization for IPFS
  - 80% user engagement improvement during demo

#### Work Experience (1 position)

**Red Hat Cloud/Software Engineer Intern** (May 2022 — Aug 2023)
- **Old format**: Hugo shortcode with 5 bullet achievements
- **New format**: TypeScript object with `bullets` array
- **Technologies**: Kubernetes, GoLang, Jenkins
- **Achievements migrated**:
  - 80% reduction in manual configuration errors
  - 66% deployment time reduction (45min → 15min)
  - 50% reduction in startup failures
  - 30% improvement in probe accuracy
  - 60% reduction in CI pipeline manual intervention

#### Skills (22 technologies)

**Old format**: Space/comma-separated list with **bold** formatting

**New format**: TypeScript string array

**Skills migrated**:
1. TypeScript (highlighted)
2. JavaScript (highlighted)
3. React (highlighted)
4. Node.js (highlighted)
5. Python (highlighted)
6. Django
7. PostgreSQL
8. MongoDB
9. Bash
10. Git (highlighted)
11. Linux (highlighted)
12. Command Line
13. Go(Lang)
14. AWS
15. Kubernetes
16. Terraform
17. Docker
18. Compose
19. Jenkins
20. Groovy
21. Solidity
22. C

#### Education (1 degree)

**University of Toronto (St. George)**
- **Old format**: Hugo shortcode
- **New format**: TypeScript object
- **Details**:
  - Degree: Computer Science Specialist
  - GPA: 3.84
  - Years: 2019 — 2024
  - Status: Graduated with High Distinction

#### Contact Information

**Migrated contact details**:
- Phone: 647-685-2500
- Email: me@kevin-mok.com
- LinkedIn: linkedin.com/in/Kev-Mok
- GitHub: github.com/Kevin-Mok

## Asset Migration

### PDFs

**Old location**: `/home/kevin/coding/mf-site/static/pdf/`

**New location**: `/home/kevin/coding/portfolio-site/public/resume/`

**All 40+ PDF variants migrated**, including:

#### Primary Resumes
- `kevin-mok-resume-web-dev.pdf`
- `kevin-mok-resume-colored.pdf`

#### Technology-Specific Variants
- `kevin-mok-resume-aws.pdf`
- `kevin-mok-resume-aws-web-dev.pdf`
- `kevin-mok-resume-aws-python.pdf`
- `kevin-mok-resume-python.pdf`
- `kevin-mok-resume-python-aws.pdf`
- `kevin-mok-resume-python-selenium.pdf`
- `kevin-mok-resume-web-dev-aws.pdf`
- `kevin-mok-resume-web-dev-django.pdf`
- `kevin-mok-resume-web-dev-graphql.pdf`
- `kevin-mok-resume-c.pdf`

#### Company/Role-Specific Variants
- `kevin-mok-resume-canonical-openstack.pdf`
- `kevin-mok-resume-digital-ocean.pdf`
- `kevin-mok-resume-it-support.pdf`
- `kevin-mok-resume-it-support-aws.pdf`
- `kevin-mok-resume-it-support-aws-2.pdf`
- `kevin-mok-resume-call-centre.pdf`
- `kevin-mok-resume-call-centre-verisk.pdf`
- `kevin-mok-resume-sales.pdf`
- `kevin-mok-resume-verisk.pdf`
- `kevin-mok-resume-rbc-aml.pdf`

#### Interview-Specific Variants
- `kevin-mok-resume-blue-url.pdf`
- `1pg-sm.pdf`
- `1pg-lg.pdf`

#### Cover Letters (not integrated into web version)
- Multiple cover letters in `public/resume/` (optional)

### Icons

**Old location**: `/home/kevin/coding/mf-site/static/img/`

**New location**: `/home/kevin/coding/portfolio-site/public/icons/resume/`

**Icons migrated**:
- `smartphone.svg` (from `img/resume/`)
- `envelope.svg` (from `img/resume/`)
- `linkedin.svg` (from `img/social/`)
- `github.svg` (from `img/social/`)

## Styling Migration

### LaTeX Font

**Old implementation**: CDN link in HTML header

**Old code**:
```html
<link rel="stylesheet" type="text/css"
    href="https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/fonts.css">

<style>
  font-family: "Computer Modern Serif";
</style>
```

**New implementation**: CDN link in `app/layout.tsx`

**New code**:
```tsx
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/fonts.css"
/>
```

**Same CDN**, integrated into Next.js layout system.

### Color Palette

**Old colors** (from Hugo site SCSS):

```scss
/* Section headers */
$header-color: #000000;
$header-size: 1.3em;

/* Project titles */
$project-title-color: #66cccc;

/* Company names */
$company-color: #000000;
$company-size: 1.2em;

/* Tech stack */
$tech-color: #747369;

/* Links */
$link-color: #4287cd;
```

**New CSS** (in `13-resume-latex.css`):

```css
.entry-title {
  color: #66cccc;        /* Same sky blue */
}

.entry-company {
  color: #000000;        /* Same black */
  font-size: 1.2em;
}

.entry-tech {
  color: #747369;        /* Same gray */
}

.contact-item a {
  color: #4287cd;        /* Same blue */
}
```

**Color consistency**: All colors preserved exactly from old site.

### Typography

**Old values** (from SCSS):
- Line height: 1.57
- Base font size: 17px
- Font family: Computer Modern Serif

**New values** (in CSS):
```css
.resume-latex {
  font-family: "Computer Modern Serif", Georgia, serif;
  font-size: clamp(15px, 2.5vw, 17px);  /* Responsive, base 17px */
  line-height: 1.57;
}
```

**Improvements**: Added responsive scaling for mobile while preserving desktop appearance.

### Layout

**Old structure**: Bootstrap grid-based layout

**New structure**: CSS Grid and Flexbox

**Preserved behaviors**:
- Contact info in 2x2 grid (desktop)
- Section headers above content
- Bullets with proper indentation
- Responsive stacking on mobile

## Format Conversions

### Markdown to HTML Bullets

**Old format** (Hugo Markdown):
```markdown
- **Developed a full-stack web application (TypeScript/JavaScript)** to generate
  rarity rankings for NFTs, integrating with **leading marketplace's API**...
```

**New format** (TypeScript with HTML):
```typescript
bullets: [
  'Developed a full-stack web application (TypeScript/JavaScript) to generate rarity rankings for NFTs, integrating with <strong>leading marketplace\'s API</strong>...'
]
```

**Conversion process**:
- `**text**` → `<strong>text</strong>`
- Maintained original achievement language
- Preserved quantified metrics (80%, 66%, 50%, etc.)
- Converted markdown links to HTML

### Date Formats

**Preserved exactly**:
- "March 2025" (projects)
- "Mar 2024" (projects)
- "Jan 2023" (projects)
- "May 2022 — Aug 2023" (work experience)
- "2019 — 2024" (education)

## Navigation Integration

### Old Site Navigation

**Old structure**: Hugo menu with resume as dedicated page

**Old URL**: `/resume/`

**Old navigation**: Built into Hugo site structure

### New Site Navigation

**New structure**: Integrated into portfolio tile system

**New access points**:
1. **Sidebar navigation**: "Resume" menu item (after About)
2. **Polybar workspaces**: "resume" button (after about)
3. **Full-page route**: `/resume`

**Advantages**:
- Resume as peer to About/Projects/Blog
- Consistent navigation experience
- Accessible from homepage tile view
- Direct shareable URL

## Data Transformation

### Old Format: Hugo Shortcodes

```markdown
{{% resume/project name="Project Name"
languages="Tech1, Tech2, Tech3"
date="Month Year" show="true" %}}
- Bullet point
{{% /resume/project %}}
```

### New Format: TypeScript Objects

```typescript
{
  name: 'Project Name',
  languages: ['Tech1', 'Tech2', 'Tech3'],
  date: 'Month Year',
  bullets: [
    'Bullet point'
  ]
}
```

### Benefits of New Format

1. **Type safety**: TypeScript prevents errors
2. **Easier to maintain**: Direct data structure
3. **Better IDE support**: Autocomplete and refactoring
4. **No build step**: No shortcode processing needed
5. **Single source of truth**: Direct data references

## Features Preserved

✅ **LaTeX font styling** - Computer Modern Serif via CDN
✅ **Professional color scheme** - All original colors
✅ **Contact information** - Phone, email, LinkedIn, GitHub
✅ **Project descriptions** - All 3 projects with full details
✅ **Work experience** - Red Hat internship with achievements
✅ **Skills list** - All 22 technologies
✅ **Education details** - University of Toronto info
✅ **PDF downloads** - All 40+ variants
✅ **Icon styling** - Contact icons with proper sizing
✅ **Responsive design** - Mobile-friendly layout
✅ **Achievement formatting** - Bold text, metrics, links

## Features Enhanced

✨ **Dynamic PDF variants** - Dropdown selector for different resumes
✨ **Integrated navigation** - Tile-based access alongside other content
✨ **SEO optimization** - Metadata for search engines
✨ **Responsive fonts** - `clamp()` for mobile scaling
✨ **Touch-optimized** - Proper target sizes for mobile
✨ **Theme overrides** - Professional appearance regardless of site theme
✨ **Accessibility** - Semantic HTML, keyboard navigation
✨ **Component-based** - Reusable sub-components

## Features Not Migrated

❌ **Cover letters** - Old site had multiple cover letters, not integrated into web version
  - *Still available* in `public/resume/` for reference
  - Could be added as separate feature if needed

❌ **LinkedIn recommendations PDF** - `linkedin-recommendations.pdf` not integrated
  - Available in `public/resume/` if needed

❌ **Interview-specific notes** - `kevin-mok-team-rankings-8zogk.pdf` and similar
  - Available in `public/resume/` for reference

These could be added as future enhancements if needed.

## Data Integrity

### Verification Checklist

✅ All 3 projects migrated with full bullet points
✅ Red Hat work experience migrated with 5 achievement bullets
✅ All 22 skills preserved in correct order
✅ Education details migrated (institution, degree, GPA, dates)
✅ Contact information preserved exactly
✅ All 40+ PDFs copied to new location
✅ All 4 icons copied to new location
✅ Color values preserved exactly (#66cccc, #747369, #4287cd)
✅ Typography values preserved (1.57 line height, 17px font)
✅ Font family preserved (Computer Modern Serif with fallbacks)
✅ Achievement language and metrics preserved

## Migration Testing

### Content Verification

1. ✅ Verified all project names and dates
2. ✅ Verified all bullet point text
3. ✅ Verified all tech stack entries
4. ✅ Verified work experience details
5. ✅ Verified education information
6. ✅ Verified contact details

### Asset Verification

1. ✅ All PDFs copied (40+ files)
2. ✅ All icons copied (4 SVG files)
3. ✅ File sizes reasonable (PDFs ~100KB each)
4. ✅ SVG icons render correctly

### Styling Verification

1. ✅ Computer Modern font loads from CDN
2. ✅ Colors match exactly (#66cccc sky blue, #747369 gray)
3. ✅ Typography matches (1.57 line height)
4. ✅ Layout responsive on mobile

### Navigation Verification

1. ✅ Sidebar "Resume" menu item works
2. ✅ Polybar "resume" workspace works
3. ✅ Full `/resume` route loads
4. ✅ PDF downloads function correctly

## Rollback Plan

If issues arise, can quickly revert to old site:

```bash
# Old site still available at
/home/kevin/coding/mf-site/

# Reverting would require:
# 1. Removing resume components from new site
# 2. Redirecting users to old site for resume
# 3. Updating navigation to hide resume
```

**Note**: Not currently needed - migration is complete and verified.

## Related Documentation

- [RESUME_FEATURE_OVERVIEW.md](./RESUME_FEATURE_OVERVIEW.md) - Feature overview
- [RESUME_ARCHITECTURE.md](./RESUME_ARCHITECTURE.md) - Technical details
- [RESUME_MAINTENANCE.md](./RESUME_MAINTENANCE.md) - How to maintain
