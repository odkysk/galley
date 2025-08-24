# create-galley-app

CLI tool to create Galley banner generation applications.

## Usage

```bash
# npm
npm create galley-app my-project

# yarn
yarn create galley-app my-project

# pnpm
pnpm create galley-app my-project

# npx
npx create-galley-app my-project
```

## Options

```bash
# Specify template
npx create-galley-app my-project --template basic

# Available templates: basic, corporate, marketing
npx create-galley-app my-project --template corporate
```

## Templates

### Basic
- Essential Galley setup
- Basic templates included
- Perfect for getting started

### Corporate  
- Professional branding setup
- Corporate-focused templates
- Business card, letterhead templates

### Marketing
- Marketing campaign templates
- Social media banners
- Promotional materials

## After Creation

```bash
cd my-project
pnpm install
pnpm dev
```

Your Galley application will be available at http://localhost:5173

## What's Created

- **Complete SvelteKit setup** with Tailwind CSS
- **Galley configuration** ready to use
- **Template system** with examples
- **Development server** configured
- **Build system** ready for production

## License

MIT