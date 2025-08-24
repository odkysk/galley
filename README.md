# 🎨 Galley

> A modern, extensible banner generation framework for creating dynamic graphics with web technologies.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/package/@galley/core)

## ✨ Features

### 🚀 **Quick Start**
```bash
npx create-galley-app my-banner-app
cd my-banner-app && pnpm dev
```

### 🎯 **Core Features**
- **Template System**: Create reusable banner templates with Svelte
- **Real-time Editing**: Live preview with instant updates  
- **Image Management**: Upload, zoom, pan, and position images
- **Export Functionality**: Download as PNG or JPG
- **Type Safety**: Full TypeScript support with automatic type generation
- **Extensible**: Plugin-based architecture for custom templates
- **Responsive**: Works perfectly on desktop and mobile

### 📦 **NPM Ecosystem**
- `@galley/core` - Core framework and components
- `@galley/templates-basic` - Basic template library
- `create-galley-app` - CLI tool for instant setup

## 📚 Usage Examples

### Create a New Project
```bash
# Create with CLI
npx create-galley-app my-banner-generator

# Choose template: basic, corporate, marketing
npx create-galley-app my-app --template corporate
```

### Add to Existing Project  
```bash
pnpm add @galley/core @galley/templates-basic
```

### Create Custom Template
```svelte
<!-- src/templates/MyBanner.svelte -->
<script module>
  import { createTemplateModule } from '@galley/core/utils';

  export const { config } = createTemplateModule({
    fields: {
      title: { type: "text", value: "Hello World", maxLength: 50 },
      image: { type: "image", value: "" },
    },
    size: { width: 800, height: 400 }
  });
</script>

<script>
  let { title, image } = $props();
</script>

<div class="banner">
  <h1>{title.value}</h1>
  <img src={image.value} alt="" />
</div>
```

### Configure Templates
```javascript
// galley.config.js
import { defineConfig } from '@galley/core/config';

export default defineConfig({
  templateSources: [
    './src/templates',
    '@galley/templates-basic/templates',
    '@my-company/custom-templates'
  ],
  branding: {
    primaryColor: '#3B82F6',
    fontFamily: 'Inter, sans-serif'
  }
});
```

## 🏗️ Monorepo Structure

This is a monorepo containing multiple packages:

```
packages/
├── core/                 # @galley/core - Core framework
├── templates-basic/      # @galley/templates-basic - Basic templates  
└── create-galley-app/    # create-galley-app - CLI tool

apps/
└── demo/                 # Demo application
```

### Development Commands

```bash
# Install dependencies
pnpm install

# Run all packages in development
pnpm dev

# Build all packages  
pnpm build

# Run type checking
pnpm check

# Run demo app
cd apps/demo && pnpm dev
```

## 🚀 Publishing

### Release Process
```bash
# Create changeset
pnpm changeset

# Version packages
pnpm version-packages

# Build and publish
pnpm release
```

### NPM Packages
- **@galley/core**: Core framework and components
- **@galley/templates-basic**: Basic template collection  
- **create-galley-app**: CLI tool for project creation


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
