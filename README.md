# Galley

> A web-based banner image generator that enables frontend engineers and designers to create templates using web technologies, allowing users to input information and generate customized images.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## ✨ Features

- **Intuitive Template Creation**: Build banner designs using familiar web technologies (HTML/CSS/JS)
- **Dynamic Content Generation**: Generate images automatically based on user input
- **Modern UI**: Built with bits-ui components + Tailwind CSS v4
- **Type-Safe**: Full TypeScript support for robust development
- **Fast Development**: Powered by SvelteKit + Vite for instant hot reload
- **Image Export**: Export banners as PNG images using html2canvas-pro

## 🚀 Tech Stack

- **Frontend**: SvelteKit 2.x + TypeScript
- **Styling**: Tailwind CSS v4 + bits-ui components
- **Build Tool**: Vite + PostCSS
- **Package Manager**: pnpm
- **Image Export**: html2canvas-pro

## 📦 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/galley.git
cd galley

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

## 🛠 Development

```bash
# Development server (http://localhost:5173)
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Type checking
pnpm run check

# Type checking with watch mode
pnpm run check:watch
```

## 📁 Project Structure

```
src/
├── app.css              # Global styles (Tailwind CSS v4)
├── app.html             # HTML template
├── lib/                 # Shared components & utilities
│   ├── components/      # Reusable UI components
│   └── assets/          # Static assets
├── routes/              # SvelteKit pages
│   ├── +layout.svelte   # App layout
│   └── +page.svelte     # Homepage with template gallery
├── templates/           # Banner template components
│   ├── Banner.svelte    # Example banner template
│   └── Profile.svelte   # Example profile template
└── app.d.ts             # TypeScript definitions
```

### Template Structure

Each template component follows a schema-driven pattern:

```typescript
// Template component structure
<script module>
  import { z } from "zod";
  
  // Schema defines editable properties and validation
  export const schema = z.object({
    title: z.string().default("Default Title"),
    description: z.string().default("Default Description"),
  });
  
  export type TemplateProps = z.infer<typeof schema>;
</script>

<script lang="ts">
  // Props are automatically typed from schema
  let { title, description }: TemplateProps = $props();
</script>

<!-- Template design -->
<div class="banner-template">
  <h1>{title}</h1>
  <p>{description}</p>
</div>
```

## 🎨 Design System

This project uses **bits-ui** components with **Tailwind CSS v4** for a modern, accessible UI.

### Key Components
- bits-ui component library for accessible primitives
- Custom banner templates
- Responsive layouts with CSS Grid and Flexbox
- Custom CSS properties for theming

## 🔄 Development Workflow

### Creating New Templates

1. **Create Template Component**: Add a new `.svelte` file in `src/templates/`
2. **Define Schema**: Export a Zod schema with default values for all editable properties
3. **Implement Design**: Build the visual layout using Tailwind CSS
4. **Export Types**: Export TypeScript types from the schema for type safety

### Automatic Editor Generation

The schema-driven approach enables automatic form generation:

```typescript
// Schema automatically generates:
// ✅ Form fields with proper input types
// ✅ Validation rules
// ✅ Default values
// ✅ TypeScript types
// ✅ Real-time preview updates

export const schema = z.object({
  title: z.string().min(1).max(100).default("My Banner"),
  backgroundColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#ffffff"),
  fontSize: z.number().min(12).max(72).default(24),
  showLogo: z.boolean().default(true),
});
```

### Development Steps

1. **Template Design**: Focus on creating beautiful, responsive designs
2. **Schema Definition**: Define what users can customize with validation
3. **Type Safety**: Leverage TypeScript + Zod for robust development
4. **Testing**: Preview templates with different prop combinations
5. **Export**: Generate images using html2canvas-pro

### Template Guidelines

- Use semantic HTML structure
- Implement responsive design with Tailwind CSS
- Define meaningful default values in schema
- Add proper validation for user inputs
- Follow accessibility best practices


## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [SvelteKit](https://kit.svelte.dev/) - The web framework
- [bits-ui](https://www.bits-ui.com/) - Accessible component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [html2canvas-pro](https://html2canvas.hertzen.com/) - Screenshot library for image export

---

For detailed development information, see [CLAUDE.md](./CLAUDE.md).
