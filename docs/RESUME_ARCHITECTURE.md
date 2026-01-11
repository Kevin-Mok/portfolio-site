# Resume Feature Architecture

## System Architecture

### Component Hierarchy

```
ResumeContent (Main - memoized)
├── ResumeHeader
│   └── Contact info with SVG icons
├── PDF Download Section
│   ├── Download button
│   └── Variant selector dropdown
├── ResumeSection (Projects)
│   ├── ProjectEntry
│   ├── ProjectEntry
│   └── ProjectEntry
├── ResumeSection (Work Experience)
│   └── WorkEntry
├── ResumeSection (Skills)
│   └── Plain text list
└── ResumeSection (Education)
    └── EducationEntry
```

### Content Flow

```
User Input
    ↓
Navigation Handler (NavigationTile | Polybar)
    ↓
FocusContext.handleContentNavigation() or handlePolybarNavigation()
    ↓
FocusState update: { type: 'resume' }
    ↓
┌─────────────────────────────────────┐
│ ContentViewer Switch Statement      │
├─────────────────────────────────────┤
│ case 'resume':                      │
│   return <ResumeContent />          │
└─────────────────────────────────────┘
    ↓
ResumeContent Component Renders
    ↓
Sub-components render resume sections
```

### Data Flow

```
lib/resume-data.ts (Single Source of Truth)
    ↓
resumeData object (interfaces defined)
    ↓
ResumeContent imports resumeData
    ↓
Sub-components receive data via props
    ↓
Components render with dangerouslySetInnerHTML for rich text
```

## Data Structure

### TypeScript Interfaces (lib/resume-data.ts)

```typescript
interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

interface ResumeProject {
  name: string;
  url?: string;
  languages: string[];
  date: string;
  bullets: string[];
}

interface WorkExperience {
  company: string;
  title: string;
  languages: string[];
  date: string;
  bullets: string[];
}

interface Education {
  institution: string;
  degree: string;
  gpa: string;
  date: string;
}

interface Resume {
  projects: ResumeProject[];
  experience: WorkExperience[];
  skills: string[];
  education: Education[];
  contact: ContactInfo;
}
```

### Data Export

```typescript
export const resumeData: Resume = {
  contact: { ... },
  projects: [ ... ],
  experience: [ ... ],
  skills: [ ... ],
  education: [ ... ]
}
```

Single source of truth - all resume content lives here.

## Styling Architecture

### CSS Modular System

Follows existing portfolio pattern with 13 CSS modules:

1. `01-theme-variables.css` - Theme system
2. `02-theme-effects.css` - Theme effects
3. `03-fonts.css` - Font declarations
4. `04-terminal-theme.css` - Terminal colors
5. `05-base.css` - Base styles
6. `06-typography.css` - Text styles
7. `07-terminal-ui.css` - Terminal UI
8. `08-animations.css` - Keyframes
9. `09-utilities.css` - Utility classes
10. `10-mobile.css` - Mobile optimizations
11. `11-glass-effects.css` - Glass morphism
12. `12-blog-content.css` - Blog styles
13. **`13-resume-latex.css`** - Resume styles (NEW)

### Theme Override Strategy

Resume CSS module overrides theme system:

```css
.resume-latex {
  /* Force professional appearance */
  --theme-bg: #ffffff;
  --theme-text: #000000;
  --theme-surface: #ffffff;

  background-color: #ffffff;
  color: #000000;
  font-family: "Computer Modern Serif", Georgia, serif;
}
```

Ensures white background and black text regardless of site theme.

### Color Palette

LaTeX-inspired colors from old site:

- **Background**: #ffffff (white)
- **Text**: #000000 (black)
- **Project Titles**: #66cccc (sky blue)
- **Tech Stack**: #747369 (gray)
- **Links**: #4287cd (blue)
- **Accent Elements**: Uses accent-color CSS variable

### Typography

- **Font Family**: Computer Modern Serif (CDN)
- **Base Size**: `clamp(15px, 2.5vw, 17px)` (responsive)
- **Line Height**: 1.57 (readable)
- **Section Headers**: 1.3em, bold
- **Company Names**: 1.2em, bold
- **Project Titles**: 600 weight, sky blue

## Navigation Integration

### FocusContext Changes

**File**: `contexts/FocusContext.tsx`

**ContentType Union** (line ~71):
```typescript
export type ContentType =
  | { type: 'home' }
  | { type: 'about' }
  | { type: 'resume' }  // NEW
  | { type: 'project'; data: ProjectData }
  | { type: 'projects-overview' }
  | { type: 'blog'; data: BlogData }
  | { type: 'blog-overview' }
  | { type: 'contact' };
```

**Validation Rules** (line ~139):
```typescript
content: {
  validContent: [
    'home', 'about', 'resume', // NEW
    'projects-overview', 'blog-overview',
    'contact', 'project', 'blog'
  ]
}
```

**Polybar Navigation Handler** (line ~320):
```typescript
case 'resume':
  content = { type: 'resume' };
  break;
```

### NavigationTile Changes

**File**: `components/tiles/NavigationTile.tsx`

Added after "About" menu item:

```tsx
{/* Resume */}
<div
  className="touch-target touch-feedback cursor-pointer px-2 py-1 rounded transition-all duration-200"
  style={{
    backgroundColor: isActive('resume') ? 'rgba(var(--accent-color-rgb), 0.2)' : 'transparent',
    color: isActive('resume') ? 'var(--accent-color)' : 'inherit'
  }}
  onClick={(e) => handleSelect({ type: 'resume' }, e)}
>
  <span><span style={{ color: 'var(--accent-color)' }}>├──</span> Resume</span>
</div>
```

### Polybar Changes

**File**: `components/layout/Polybar.tsx`

Added workspace to array (line ~25):

```typescript
const workspaces = [
  { id: 'about', label: 'about', icon: '●' },
  { id: 'resume', label: 'resume', icon: '●' },  // NEW
  { id: 'projects', label: 'projects', icon: '●' },
  ...
];
```

### ContentViewer Changes

**File**: `components/tiles/ContentViewer.tsx`

Added import:
```tsx
import { ResumeContent } from './content/ResumeContent';
```

Added case handler (line ~30):
```tsx
case 'resume':
  return <ResumeContent />;
```

## Font System

### Computer Modern Serif

**Source**: CDN (dreampulse/computer-modern-web-font)

**Location**: `app/layout.tsx` (line ~75)

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/fonts.css"
/>
```

**Fallback Chain**:
```css
font-family: "Computer Modern Serif", Georgia, serif;
```

Ensures readability even if CDN is unavailable.

### Font Performance

- CDN-hosted (lightweight)
- No additional build steps
- Lazy loaded (doesn't block page render)
- Fallback to system serif fonts

## PDF Management

### Storage Structure

```
public/resume/
├── kevin-mok-resume.pdf                    (default)
├── kevin-mok-resume-web-dev.pdf
├── kevin-mok-resume-aws.pdf
├── kevin-mok-resume-python.pdf
├── kevin-mok-resume-aws-web-dev.pdf
├── kevin-mok-resume-aws-python.pdf
├── kevin-mok-resume-web-dev-django.pdf
├── kevin-mok-resume-it-support.pdf
├── kevin-mok-resume-it-support-aws.pdf
├── kevin-mok-resume-sales.pdf
├── kevin-mok-resume-call-centre.pdf
└── ... (additional variants and cover letters)
```

### Download Implementation

**Component**: `ResumeContent.tsx`

```tsx
const [selectedPDF, setSelectedPDF] = useState(pdfVariants[0].value);

<a
  href={`/resume/${selectedPDF}`}
  download
  className="pdf-download-btn"
>
  📄 Download PDF
</a>
```

**Variant Selector**:

```tsx
const pdfVariants = [
  { label: 'General Resume', value: 'kevin-mok-resume.pdf' },
  { label: 'Web Development', value: 'kevin-mok-resume-web-dev.pdf' },
  // ... more variants
];

<select value={selectedPDF} onChange={(e) => setSelectedPDF(e.target.value)}>
  {pdfVariants.map((variant) => (
    <option key={variant.value} value={variant.value}>
      {variant.label}
    </option>
  ))}
</select>
```

## Rendering Strategy

### Rich Text with HTML

Bullet points use `dangerouslySetInnerHTML` to support rich formatting:

```tsx
<li key={index} dangerouslySetInnerHTML={{ __html: bullet }} />
```

This allows bullets to contain:
- **Bold text**: `**bold text**` → `<strong>bold text</strong>`
- **Links**: `[text](url)` → `<a href="url">text</a>`
- **Formatting**: Inline HTML is safe (source-controlled data)

## Responsive Design

### Breakpoints

- **Desktop** (>1024px): Full layout, all features visible
- **Tablet** (768px-1024px): Adjusted spacing, stacked contact header
- **Mobile** (<768px): Font scaling, full-width elements
- **Small mobile** (<640px): Reduced indentation, minimal padding

### Mobile-First Styling

```css
/* Base styles (mobile) */
.resume-latex {
  font-size: 15px;
}

/* Tablet and above */
@media (min-width: 768px) {
  .resume-latex {
    font-size: 17px;
  }
}
```

### Responsive Units

- Font: `clamp(15px, 2.5vw, 17px)` - scales with viewport
- Spacing: rem/em units for consistency
- Grids: `grid-template-columns: repeat(auto-fit, ...)`
- Touch targets: ≥44px for mobile accessibility

## Performance Optimizations

### Component Memoization

```tsx
export const ResumeContent = React.memo(ResumeContentComponent);
```

Prevents unnecessary re-renders when parent updates.

### No Additional Dependencies

- No react-pdf library (saves ~200KB)
- No complex state management
- Direct use of React.useState() for variant selection
- Native HTML/CSS (no styled-components)

### Code Splitting

- ResumeContent only loaded when accessed
- Sub-components lazy-loaded with main component
- No impact on initial page load

## Styling Specificity

CSS module uses `.resume-latex` class to:
- Isolate resume styles from rest of site
- Avoid specificity conflicts
- Allow theme overrides for professional appearance
- Enable easy toggling of resume mode

## Layout System

### Fixed Layout
- No dynamic grid system needed
- Static section order
- Predictable spacing (12px standard)
- Consistent with portfolio design language

### Print-Friendly
```css
@media print {
  .pdf-download-section {
    display: none;
  }
  /* Resume optimized for printing */
}
```

## Extensibility

### Adding New Resume Sections

1. Create interface in `resume-data.ts`
2. Add data to `resumeData` object
3. Create component: `components/tiles/content/resume/NewSection.tsx`
4. Add `<ResumeSection>` with new component in `ResumeContent.tsx`

### Adding New PDF Variants

1. Generate PDF with new focus
2. Place in `public/resume/`
3. Add entry to `pdfVariants` array in `ResumeContent.tsx`

### Styling Customization

Modify `app/styles/13-resume-latex.css`:
- Colors are scoped to `.resume-latex`
- CSS variables available for override
- No conflicts with site themes
