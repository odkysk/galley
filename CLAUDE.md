# Galley - Claude Code Development Guide

## Project Overview

Galley is a web-based banner image generator that enables frontend engineers and designers to create templates using web technologies, allowing users to input information and generate customized images.

## Tech Stack

- **Framework**: SvelteKit + TypeScript
- **Styling**: Tailwind CSS v4 + Carbon Design System
- **Package Manager**: pnpm
- **Build Tool**: Vite

## Development Commands

### Basic Commands
```bash
# Start development server
pnpm run dev

# Production build
pnpm run build

# Preview production build
pnpm run preview

# Type checking
pnpm run check

# Type checking with watch mode
pnpm run check:watch
```

### Git Operations
```bash
# Commit changes
git add .
git commit -m "feat: add new feature description"

# Create and switch to feature branch
git checkout -b feature/new-feature
```

## Project Structure

```
src/
├── app.css              # Global styles (Tailwind CSS configuration)
├── app.html             # HTML template
├── lib/                 # Shared components & utilities
│   ├── components/      # Reusable components
│   └── assets/          # Static assets
├── routes/              # Page routing
│   ├── +layout.svelte   # Shared layout
│   ├── +page.svelte     # Homepage
│   └── templates/       # Banner templates
└── app.d.ts             # Type definitions
```

## Development Workflow

1. **Feature Development**
   - Create branch: `git checkout -b feature/feature-name`
   - Start dev server: `pnpm run dev`
   - After code changes: `pnpm run check` for type checking

2. **Component Creation**
   - Place in `src/lib/components/`
   - Leverage Carbon Design System + Tailwind CSS
   - Prioritize type safety (TypeScript)

3. **Styling**
   - Use Tailwind CSS v4 (`@import "tailwindcss"`)
   - Combine with Carbon Design System components
   - Ensure responsive design

## Important Notes

- **Tailwind CSS v4**: Use `@import "tailwindcss"` instead of legacy `@tailwind` directives
- **pnpm Usage**: Use `pnpm` instead of `npm`
- **Type Checking**: Always run `pnpm run check` before committing
- **Carbon Design System**: UI based on IBM's design system

## Common Tailwind Classes

```css
/* Layout */
.container { @apply mx-auto px-4; }
.grid-cols-auto { @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3; }

/* Colors */
.primary { @apply bg-blue-500 text-white; }
.secondary { @apply bg-gray-100 text-gray-800; }

/* Spacing */
.section-padding { @apply py-8 md:py-12 lg:py-16; }
```

## Troubleshooting

### Tailwind CSS Not Working
1. Check if `@import "tailwindcss"` is correctly written in `src/app.css`
2. Restart development server: `pnpm run dev`

### Type Errors
1. Check details with `pnpm run check`
2. Verify type definitions in `src/app.d.ts`

### Build Errors
1. Check error details with `pnpm run build`
2. Verify dependencies: `pnpm install`

## Banner Template Development

### Template Structure
```typescript
// src/routes/templates/sample-banner.svelte
<script lang="ts">
  export let title: string = 'Default Title';
  export let subtitle: string = 'Default Subtitle';
  export let backgroundColor: string = '#ffffff';
</script>

<div class="banner w-[800px] h-[400px] relative" style="background-color: {backgroundColor}">
  <h1 class="text-4xl font-bold text-center pt-16">{title}</h1>
  <p class="text-lg text-center mt-4">{subtitle}</p>
</div>
```

### Export Functionality
```typescript
// Canvas-based image export
import html2canvas from 'html2canvas';

async function exportAsImage(element: HTMLElement) {
  const canvas = await html2canvas(element);
  const link = document.createElement('a');
  link.download = 'banner.png';
  link.href = canvas.toDataURL();
  link.click();
}
```

## Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## Claude Code Specific Tips

- Use the TodoWrite tool for complex multi-step tasks
- Leverage the Task tool for file searches across the codebase
- Always run type checking before commits: `pnpm run check`
- Use descriptive commit messages following conventional commits