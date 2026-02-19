# Resume Feature Documentation

## Quick Start

The resume feature is fully implemented and live on your portfolio site.

**Quick access**:
- Homepage tile: Click "Resume" in sidebar or "resume" in polybar
- Full page: Visit `/resume`
- PDF download: Select variant and click "Download PDF"

## Documentation Index

### Choose your documentation based on your needs:

#### 🔍 **I want an overview of what was built**
→ Read: **[RESUME_FEATURE_OVERVIEW.md](./RESUME_FEATURE_OVERVIEW.md)**

This file covers:
- What's in the resume
- Key files and their purposes
- PDF variants available
- Feature highlights
- Technology stack

**Reading time**: 5-10 minutes

---

#### 🏗️ **I want to understand how it works technically**
→ Read: **[RESUME_ARCHITECTURE.md](./RESUME_ARCHITECTURE.md)**

This file covers:
- Component hierarchy and data flow
- Content structure and interfaces
- Styling system and CSS architecture
- Navigation integration
- Font system and performance
- Responsive design approach

**Reading time**: 15-20 minutes
**For**: Developers, architects, contributors

---

#### ✏️ **I want to update my resume content**
→ Read: **[RESUME_MAINTENANCE.md](./RESUME_MAINTENANCE.md)**

This file covers:
- How to update content (single source of truth: `lib/resume-data.ts`)
- Adding new projects, jobs, skills, education
- Regenerating PDFs
- Managing PDF variants
- Customizing styling
- Testing changes
- Troubleshooting

**Reading time**: 10-15 minutes
**For**: Resume owner (frequent task)

---

#### 📦 **I want to know what was migrated from the old site**
→ Read: **[RESUME_MIGRATION.md](./RESUME_MIGRATION.md)**

This file covers:
- What content was brought over
- What styling was preserved
- What assets were copied
- Format conversions (Hugo → TypeScript)
- Features enhanced vs. preserved
- Data integrity verification

**Reading time**: 10-15 minutes
**For**: Understanding the migration process

---

#### 📁 **I want to understand the file organization**
→ Read: **[RESUME_FILE_STRUCTURE.md](./RESUME_FILE_STRUCTURE.md)**

This file covers:
- Complete directory tree
- File breakdown by category
- Component hierarchy
- Data organization
- Styling organization
- Asset organization
- Import dependencies
- Quick reference for common tasks

**Reading time**: 10-15 minutes
**For**: Navigation, finding files, understanding structure

---

## Common Tasks Quick Links

### Update Your Resume
1. Open `lib/resume-data.ts`
2. Update `resumeVariants` entries for the variants you maintain:
   - Contact info
   - Projects array
   - Experience array
   - Skills array plus optional `skillsBold` / `skillsHtmlLines` formatting controls
   - Education array
3. Test on `/resume`
4. Regenerate PDFs
5. Run layout validation (`npm run validate-resume-pdfs`) and tune page fill if needed
6. Commit changes

**Full guide**: [RESUME_MAINTENANCE.md § Updating Resume Content](./RESUME_MAINTENANCE.md#updating-resume-content)

### Add New Project
1. Add entry to the target variant's `projects` array in `resumeVariants` (`lib/resume-data.ts`)
2. Include: name, url, languages, date, bullets
3. Test on `/resume`
4. Add PDF variant if creating new focused resume

**Full guide**: [RESUME_MAINTENANCE.md § Adding a New Project](./RESUME_MAINTENANCE.md#adding-a-new-project)

### Regenerate PDFs
1. Run build-time generator:

```bash
npm run build
```

2. Validate one-page/page-fill/font constraints:

```bash
npm run validate-resume-pdfs
```

3. If validation fails, adjust per-variant `--resume-print-scale` in `app/styles/13-resume-latex.css`, regenerate, and re-run validation.
4. Verify regenerated files in `public/resume/`
5. Commit changes

**Full guide**: [RESUME_MAINTENANCE.md § Regenerating PDFs](./RESUME_MAINTENANCE.md#regenerating-pdfs)

### Add New PDF Variant
1. Add variant content in `resumeVariants` (`lib/resume-data.ts`)
2. Add matching generator entry in `scripts/generate-resume-pdfs.mjs`
3. Run:

```bash
npm run generate-resume-pdfs
```

4. Test dropdown and download
5. Commit changes

**Full guide**: [RESUME_MAINTENANCE.md § Managing PDF Variants](./RESUME_MAINTENANCE.md#managing-pdf-variants)

### Change Resume Colors
1. Edit `app/styles/13-resume-latex.css`
2. Update colors in selectors like `.entry-title`, `.entry-tech`, etc.
3. Test on `/resume` and different themes
4. Commit changes

**Full guide**: [RESUME_MAINTENANCE.md § Styling Customization](./RESUME_MAINTENANCE.md#styling-customization)

### Test Changes
1. Start dev server: `npm run dev`
2. Click "Resume" in sidebar or polybar
3. Navigate to `/resume`
4. Test responsive design (resize browser)
5. Test PDF download with different variants
6. Switch themes (Tokyo Night, Nord, Solarized)

**Full guide**: [RESUME_MAINTENANCE.md § Testing Changes](./RESUME_MAINTENANCE.md#testing-changes)

## File Locations Reference

| Purpose | Location |
|---------|----------|
| Resume content | `lib/resume-data.ts` |
| Main component | `components/tiles/content/ResumeContent.tsx` |
| Resume styling | `app/styles/13-resume-latex.css` |
| PDF files | `public/resume/` |
| Contact icons | `public/icons/resume/` |
| Full-page route | `app/resume/page.tsx` |
| Navigation | `contexts/FocusContext.tsx`, `components/tiles/NavigationTile.tsx`, `components/layout/Polybar.tsx` |

## Architecture at a Glance

```
User navigates to resume
    ↓
FocusContext manages state
    ↓
ContentViewer routes to ResumeContent component
    ↓
ResumeContent reads variant-aware data from `lib/resume-data.ts`
    ↓
Sub-components render sections:
├─ ResumeHeader (contact info)
├─ ResumeSection × 4 (projects, work, skills, education)
└─ Sub-entries (ProjectEntry, WorkEntry, EducationEntry)
    ↓
CSS styling from 13-resume-latex.css applied
    ↓
Browser renders professional LaTeX-styled resume
```

## Key Features

✅ **Single source of truth**: `lib/resume-data.ts` controls all content
✅ **Professional styling**: Computer Modern Serif font, LaTeX aesthetic
✅ **Multiple PDF variants**: 40+ versions for different opportunities
✅ **Responsive design**: Mobile-friendly, works on all devices
✅ **SEO optimized**: Proper metadata, Open Graph tags
✅ **Easy to maintain**: Simple TypeScript data structure
✅ **Theme-proof**: Always white/professional regardless of site theme
✅ **Accessible**: Keyboard navigation, semantic HTML
✅ **No dependencies**: No additional npm packages needed

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: CSS (modular architecture)
- **Font**: Computer Modern Serif (CDN)
- **State**: React Context (FocusContext)
- **Components**: Modular React components

## Recent Changes Summary

### New Files Created (9 files)
- `lib/resume-data.ts` - Data structure
- `app/styles/13-resume-latex.css` - Styling
- `app/resume/page.tsx` - Full-page route
- `components/tiles/content/ResumeContent.tsx` - Main component
- `components/tiles/content/resume/` - 5 sub-components

### Files Modified (6 files)
- `contexts/FocusContext.tsx` - Added resume to ContentType
- `components/layout/Polybar.tsx` - Added resume workspace
- `components/tiles/NavigationTile.tsx` - Added resume menu item
- `components/tiles/ContentViewer.tsx` - Added resume handler
- `app/layout.tsx` - Added Computer Modern font
- `app/globals.css` - Added CSS import

### Assets Added (44+ files)
- 40+ PDF variants in `public/resume/`
- 4 contact icons in `public/icons/resume/`

### Documentation (5 files)
- This README
- RESUME_FEATURE_OVERVIEW.md
- RESUME_ARCHITECTURE.md
- RESUME_MAINTENANCE.md
- RESUME_MIGRATION.md
- RESUME_FILE_STRUCTURE.md

## Next Steps

### Immediate
1. Test resume functionality on your machine
2. Review the content to ensure it's current
3. Verify PDF downloads work correctly

### Short Term
1. Update any outdated content in `lib/resume-data.ts`
2. Regenerate PDFs from latest content
3. Commit changes to git

### Future Enhancements (Optional)
- Automated PDF generation from web version
- Resume builder UI for customization
- Analytics tracking for resume views
- Multiple language versions
- Print-optimized stylesheet

## Troubleshooting

**Font not loading?**
→ Check CDN availability, clear cache, hard refresh

**PDF download not working?**
→ Verify file exists, check filename spelling, try different browser

**Resume not showing?**
→ Verify FocusContext has resume type, check ContentViewer switch

**Styling looks wrong?**
→ Check CSS module import, verify .resume-latex class applied

**More help**: [RESUME_MAINTENANCE.md § Troubleshooting](./RESUME_MAINTENANCE.md#troubleshooting)

## Questions?

Each documentation file is comprehensive and self-contained. Look for the specific file that matches your needs from the index above.

## Document Hierarchy

```
README_RESUME.md (you are here)
├── RESUME_FEATURE_OVERVIEW.md
│   ├── What was built
│   ├── Quick access points
│   ├── Key files
│   └── Content structure
├── RESUME_ARCHITECTURE.md
│   ├── Component hierarchy
│   ├── Data flow
│   ├── Styling system
│   ├── Navigation integration
│   └── Performance
├── RESUME_MAINTENANCE.md
│   ├── How to update content
│   ├── Manage PDFs
│   ├── Customize styling
│   ├── Test changes
│   └── Troubleshooting
├── RESUME_MIGRATION.md
│   ├── What was migrated
│   ├── Content transformation
│   ├── Asset migration
│   ├── Styling preserved
│   └── Features enhanced
└── RESUME_FILE_STRUCTURE.md
    ├── Complete file organization
    ├── Component hierarchy
    ├── Data organization
    ├── Asset organization
    └── Quick reference
```

## Summary

The resume feature is **fully implemented, tested, and ready to use**.

- **Content** is managed in one place: `lib/resume-data.ts`
- **Styling** is centralized: `app/styles/13-resume-latex.css`
- **PDFs** are available in: `public/resume/`
- **Navigation** is integrated throughout the site

To get started, read the overview document, then the maintenance guide for your specific needs.

**Happy resuming! 📄**
