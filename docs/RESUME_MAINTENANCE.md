# Resume Maintenance Guide

## Overview

This guide covers how to update, maintain, and manage the resume feature.

## Updating Resume Content

### Single Source of Truth

**File**: `lib/resume-data.ts`

All resume content lives in this single TypeScript file. Update this file to change what appears everywhere (homepage tile, `/resume` page, and PDF downloads).

### Updating Contact Information

**Location**: `resumeData.contact` object

```typescript
export const resumeData: Resume = {
  contact: {
    phone: '647-685-2500',           // Update phone number
    email: 'me@kevin-mok.com',       // Update email
    linkedin: 'linkedin.com/in/Kev-Mok',  // Update LinkedIn profile
    github: 'github.com/Kevin-Mok',       // Update GitHub username
  },
  // ... rest of data
};
```

**After updating**: Contact info updates on all views automatically.

### Adding a New Project

**Location**: `resumeData.projects` array

```typescript
projects: [
  {
    name: 'Project Name',
    url: 'https://github.com/your-url',  // Optional
    languages: ['TypeScript', 'React', 'Node.js'],
    date: 'Month YYYY',
    bullets: [
      'First bullet point describing achievement',
      '**Second bullet** with optional **bold** formatting',
      'Third point with [link text](https://example.com)',
    ],
  },
  // ... existing projects
];
```

**Format guidelines**:
- `name`: Project title
- `url`: Optional GitHub/demo link
- `languages`: Comma-separated tech stack
- `date`: "Month YYYY" or "Mar - Jun 2024"
- `bullets`: Array of achievement statements
  - Use `**text**` for bold
  - Use `[link](url)` for hyperlinks

### Updating Work Experience

**Location**: `resumeData.experience` array

```typescript
experience: [
  {
    company: 'Company Name',
    title: 'Job Title',
    languages: ['Kubernetes', 'Go', 'Python'],
    date: 'May 2022 — Aug 2023',
    bullets: [
      'Quantified achievement with **metric**',
      'Specific responsibility with **technology**',
      'Impact statement with **percentage improvement**',
    ],
  },
];
```

**Best practices**:
- Include specific metrics: "reduced by 66%", "improved by 80%"
- Highlight technologies used: **bold** them
- Use achievement-oriented language
- Focus on impact, not just tasks

### Updating Skills

**Location**: `resumeData.skills` array

```typescript
skills: [
  'TypeScript',
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'Django',
  // Add or remove skills here
  'NewTechnology',
],
```

Skills are:
- Displayed as comma-separated list
- Bolded in output
- Order matters (most relevant first)
- No special formatting needed

### Updating Education

**Location**: `resumeData.education` array

```typescript
education: [
  {
    institution: 'University of Toronto (St. George)',
    degree: 'Computer Science Specialist',
    gpa: '3.84 GPA',
    date: '2019 — 2024',
  },
  // Add additional degrees here if needed
];
```

Each education entry displays:
- Institution name (bold, large)
- Degree and credentials
- GPA (if applicable)
- Date range

## Regenerating PDFs

### Method 1: Browser Print Dialog (Recommended)

1. Navigate to `/resume` page
2. Press `Cmd+P` (Mac) or `Ctrl+P` (Windows)
3. Click "Save as PDF"
4. Save with appropriate filename (e.g., `kevin-mok-resume.pdf`)
5. Replace existing PDF in `public/resume/`

**Advantages**:
- Perfect visual match with web version
- No additional tools needed
- Exact styling preserved
- Computer Modern font renders correctly

### Method 2: Programmatic PDF Generation (Future)

Could use Puppeteer/Playwright to automate PDF generation:

```bash
npm run generate-pdfs
```

Not currently implemented, but would be useful for bulk regeneration.

### Method 3: Manual PDF Creation

Use your preferred PDF editor/creator:
- LaTeX compiler (for authentic LaTeX aesthetics)
- Markdown to PDF converter
- Word/Google Docs export
- Canva or similar design tool

**Important**: Ensure filename matches entry in `pdfVariants` array in `ResumeContent.tsx`.

## Managing PDF Variants

### Adding a New Variant

1. **Create the PDF file**:
   - Generate PDF using browser print or your preferred method
   - Save to `public/resume/new-resume-name.pdf`

2. **Add to variant selector**:
   - Edit `components/tiles/content/ResumeContent.tsx`
   - Add entry to `pdfVariants` array:

```typescript
const pdfVariants = [
  { label: 'General Resume', value: 'kevin-mok-resume.pdf' },
  { label: 'Web Development', value: 'kevin-mok-resume-web-dev.pdf' },
  // Add new variant here:
  { label: 'Machine Learning', value: 'kevin-mok-resume-ml.pdf' },
];
```

3. **Test the download**:
   - Visit `/resume`
   - Select new variant from dropdown
   - Verify download works

### Removing a Variant

1. Delete PDF file from `public/resume/`
2. Remove entry from `pdfVariants` array in `ResumeContent.tsx`
3. Test that dropdown options are correct

### Renaming a Variant

1. Rename PDF file in `public/resume/`
2. Update `value` field in `pdfVariants` array
3. Update `label` field to be user-friendly

## Styling Customization

### Resume-Specific Styles

**File**: `app/styles/13-resume-latex.css`

All resume styling lives in this single CSS module. Common customizations:

### Changing Colors

```css
.resume-latex {
  background-color: #ffffff;        /* Resume background */
  color: #000000;                   /* Body text */
}

.entry-title {
  color: #66cccc;                   /* Project titles */
}

.entry-company {
  color: #000000;                   /* Company names */
}

.entry-tech {
  color: #747369;                   /* Tech stack text */
}

.contact-item a {
  color: #4287cd;                   /* Links */
}
```

### Adjusting Font Size

```css
.resume-latex {
  font-size: clamp(15px, 2.5vw, 17px);  /* Responsive sizing */
  /* Or fixed size: */
  font-size: 16px;
}
```

### Changing Font Family

```css
.resume-latex {
  /* Current: */
  font-family: "Computer Modern Serif", Georgia, serif;

  /* Alternative options: */
  /* Times New Roman fallback: */
  font-family: "Computer Modern Serif", "Times New Roman", serif;

  /* Garamond: */
  font-family: "Computer Modern Serif", Garamond, serif;
}
```

### Section Header Styling

```css
.resume-section-title {
  font-size: 1.3em;              /* Header size */
  font-weight: bold;
  margin-bottom: 0.75rem;
  margin-top: 1.25rem;
}
```

### Mobile Optimizations

Edit `@media` queries at bottom of CSS file:

```css
@media (max-width: 768px) {
  .resume-header-grid {
    grid-template-columns: 1fr;  /* Stack vertically on tablet */
  }
}

@media (max-width: 640px) {
  .resume-latex {
    font-size: 15px;             /* Smaller font on mobile */
  }
}
```

## Icon Management

### Replacing Contact Icons

Icons are SVG files in `public/icons/resume/`:

```
public/icons/resume/
├── smartphone.svg    (phone icon)
├── envelope.svg      (email icon)
├── linkedin.svg      (LinkedIn icon)
└── github.svg        (GitHub icon)
```

To replace an icon:
1. Create new SVG file
2. Save with same filename
3. SVG will update automatically (Next.js serves from public/)

### Icon Dimensions

Currently set to **20x20px** in `ResumeHeader.tsx`:

```tsx
<Image
  src={item.icon}
  alt={item.alt}
  width={20}    // Change here
  height={20}   // Change here
  className="contact-icon"
/>
```

To change size:
1. Edit width/height values
2. Update CSS if needed:

```css
.contact-icon {
  width: 24px;   /* Adjust here too */
  height: 24px;
}
```

## Testing Changes

### Local Testing

1. **Update content in** `lib/resume-data.ts`
2. **Run dev server**:
   ```bash
   npm run dev
   ```
3. **Test on homepage**:
   - Click "Resume" in sidebar
   - Verify changes appear in tile view
   - Click "resume" in polybar
   - Verify focus changes to resume

4. **Test full-page view**:
   - Navigate to `/resume`
   - Verify all sections render
   - Check styling (fonts, colors, spacing)
   - Test PDF download functionality

5. **Test PDF variants**:
   - Select each variant from dropdown
   - Click "Download PDF"
   - Verify correct file downloads

6. **Test responsive design**:
   - Resize browser to mobile width (<640px)
   - Verify layout adjusts
   - Check font scaling
   - Verify touch targets are adequate

### Theme Testing

1. **Switch themes** in site settings (Tokyo Night, Nord, Solarized Light)
2. **Verify resume always has**:
   - White background (#ffffff)
   - Black text (#000000)
   - Sky blue project titles (#66cccc)
   - Professional appearance regardless of site theme

### Accessibility Testing

1. **Keyboard navigation**:
   - Tab through all interactive elements
   - Verify focus indicators visible
   - Test Enter key on navigation
   - Test Esc key to go back

2. **Screen reader** (if available):
   - Verify structure is semantic
   - Check heading hierarchy
   - Verify link text is descriptive

## Common Tasks

### Updating to New Job

1. **Remove old work experience** from `resumeData.experience`
2. **Add new work experience** with:
   - Company name
   - Job title
   - Technologies used
   - Achievement bullets with metrics

3. **Generate new PDF** variant if needed:
   - Print to PDF from `/resume`
   - Save with company-specific name
   - Add to `pdfVariants` array

4. **Test thoroughly**:
   - Verify all sections render
   - Check PDF download
   - Test on mobile

### Emphasizing New Skills

1. **Move skill higher** in `resumeData.skills` array
   - Order matters - most relevant first

2. **Update projects** to highlight new skill usage:
   - Add new projects showcasing skill
   - Update existing project descriptions
   - Bold skill usage with `**skill**`

3. **Update work experience** bullets:
   - Highlight use of new skills
   - Quantify impact where possible

### Seasonal Resume Updates

**Good times to update**:
- After completing new project
- After learning new technology
- After career milestone (promotion, new role)
- Quarterly review of bullets for impact

**Standard process**:
1. Edit `lib/resume-data.ts`
2. Update PDFs with `Cmd+P` → Save as PDF
3. Test all views
4. Commit changes

## Version Control

### Tracking Changes

Resume changes should be committed with clear messages:

```bash
git add lib/resume-data.ts
git add public/resume/kevin-mok-resume*.pdf
git commit -m "feat: update resume with new project and Red Hat experience"
```

### PDF Updates

PDFs are checked into git (reasonable file size ~100KB each). Bulk updates:

```bash
git add public/resume/
git commit -m "chore: regenerate all resume PDFs from updated content"
```

### Large Changes

For major resume restructuring:

1. Create feature branch:
   ```bash
   git checkout -b feature/resume-restructure
   ```

2. Update content and test
3. Regenerate PDFs
4. Commit and push
5. Create PR for review

## Troubleshooting

### Font Not Loading

**Issue**: Computer Modern font appears as fallback (Georgia)

**Solutions**:
- Check CDN availability: https://cdn.jsdelivr.net
- Clear browser cache
- Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
- Check browser console for CDN errors

**Fallback chain**: Computer Modern → Georgia → Generic serif

### PDF Download Not Working

**Issue**: Download button doesn't work

**Solutions**:
1. Verify PDF file exists: `ls public/resume/filename.pdf`
2. Check filename spelling in `pdfVariants` array
3. Verify `<a>` tag has `download` attribute
4. Try different browser or incognito mode

### Styling Issues

**Issue**: Resume doesn't look right

**Solutions**:
1. Check `.resume-latex` class is applied to root div
2. Verify `13-resume-latex.css` is imported in `globals.css`
3. Check CSS specificity - increase if needed
4. Clear Tailwind cache: `rm -rf .next`

### Navigation Not Working

**Issue**: Can't access resume from sidebar/polybar

**Solutions**:
1. Verify `FocusContext.tsx` has resume in `ContentType` union
2. Check `NavigationTile.tsx` has resume menu item
3. Check `Polybar.tsx` has resume workspace
4. Check `ContentViewer.tsx` has resume case handler
5. Restart dev server

## Performance Monitoring

### Metrics to Track

- Page load time for `/resume`
- PDF download success rate
- User engagement (views, time on page)
- Mobile vs desktop traffic

### Optimization Opportunities

- Consider image optimization if resume has images
- Monitor font CDN performance
- Check bundle size impact of new components
- Profile component render time

## Related Documentation

- [RESUME_FEATURE_OVERVIEW.md](./RESUME_FEATURE_OVERVIEW.md) - High-level overview
- [RESUME_ARCHITECTURE.md](./RESUME_ARCHITECTURE.md) - Technical architecture
- [RESUME_MIGRATION.md](./RESUME_MIGRATION.md) - Migration from old site
