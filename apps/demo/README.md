# Galley Demo Application

This is the official demo application showcasing Galley's banner generation capabilities.

## Features Demonstrated

- **Template System**: Multiple template types (Banner, Profile, DemoCard)
- **Real-time Editing**: Live preview as you edit fields
- **Image Management**: Upload and manipulate images with zoom/pan
- **Export Functionality**: Download as PNG or JPG
- **Responsive Design**: Works on desktop and mobile
- **Type Safety**: Full TypeScript support

## Running the Demo

```bash
# From the repository root
pnpm install
pnpm dev

# Or run just the demo
cd apps/demo
pnpm dev
```

## Templates Included

### 1. Banner Template (from @galley/templates-basic)
- Title text field
- Description textarea  
- Image with controls
- Size: 400×200px

### 2. Profile Template (from @galley/templates-basic)
- Name text field
- Email field
- Profile image
- Size: 400×300px

### 3. DemoCard Template (custom)
- Title and subtitle
- Rich description
- Hero image with overlay
- Customizable background color
- Size: 600×400px

## Architecture Demonstration

This demo shows how to:

1. **Configure Galley**: See `galley.config.js`
2. **Use Core Components**: Canvas, Export, TemplateForm, etc.
3. **Create Custom Templates**: Check `src/templates/DemoCard.svelte`
4. **Template Loading**: Dynamic template discovery and loading
5. **Branding Integration**: Custom colors and styling

## Template Sources

The demo loads templates from multiple sources:
- Local templates (`./src/templates/`)  
- Basic template package (`@galley/templates-basic/templates`)

## Development

Add new templates by creating `.svelte` files in `src/templates/` using the `createTemplateModule` helper.

Example:
```svelte
<script module>
  import { createTemplateModule } from '@galley/core/utils';
  
  export const { config } = createTemplateModule({
    fields: {
      title: { type: "text", value: "Hello" }
    },
    size: { width: 800, height: 400 }
  });
</script>

<script>
  let { title } = $props();
</script>

<div>{title.value}</div>
```

## Production Build

```bash
pnpm build
pnpm preview
```

The demo can be deployed to any static hosting service (Vercel, Netlify, etc.) or run as a Node.js application.