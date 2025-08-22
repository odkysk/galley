# Galley

> A web-based banner image generator that enables frontend engineers and designers to create templates using web technologies, allowing users to input information and generate customized images.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## ✨ Features

- **Intuitive Template Creation**: Build banner designs using familiar web technologies (HTML/CSS/JS)
- **Dynamic Content Generation**: Generate images automatically based on user input
- **Modern UI**: Built with Carbon Design System + Tailwind CSS v4
- **Type-Safe**: Full TypeScript support for robust development
- **Fast Development**: Powered by SvelteKit + Vite for instant hot reload

## 🚀 Tech Stack

- **Frontend**: SvelteKit 2.x + TypeScript
- **Styling**: Tailwind CSS v4 + IBM Carbon Design System
- **Build Tool**: Vite + PostCSS
- **Package Manager**: pnpm

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
├── app.css              # Global styles (Tailwind + Carbon)
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

## 🎨 Design System

This project uses **IBM Carbon Design System** as the foundation, extended with **Tailwind CSS v4** for a cohesive design language.

### Key Components
- Button, Input, Grid, Tile (Carbon)
- Custom banner components
- Responsive layouts

## 🔄 Development Workflow

1. **Template Creation**: Create Svelte components in `src/routes/templates/`
2. **Styling**: Use Tailwind CSS + Carbon Design System
3. **Type Safety**: Develop components with TypeScript
4. **Image Export**: Implement Canvas API or SVG export functionality

## 🗺 Roadmap

- [ ] Banner template editor
- [ ] User input forms
- [ ] Image export functionality
- [ ] Template gallery
- [ ] Real-time preview
- [ ] Template sharing
- [ ] Custom font support
- [ ] Advanced styling options

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
- [IBM Carbon Design System](https://carbondesignsystem.com/) - Design system
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

For detailed development information, see [CLAUDE.md](./CLAUDE.md).
