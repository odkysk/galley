# @galley/core

Core library for building banner and image generation applications with Svelte and Tailwind CSS.

## Installation

```bash
npm install @galley/core
# or
pnpm add @galley/core
```

## Usage

### Basic Setup

```javascript
// galley.config.js
import { defineConfig } from '@galley/core/config';

export default defineConfig({
  branding: {
    primaryColor: '#3B82F6',
    secondaryColor: '#64748B',
    fontFamily: 'Inter, sans-serif',
  },
  templateSources: ['./src/templates'],
  defaultSize: { width: 800, height: 400 },
  exportFormats: ['png', 'jpg'],
});
```

### Creating Templates

```svelte
<!-- src/templates/MyBanner.svelte -->
<script module>
  import { createTemplateModule } from '@galley/core/utils';

  export const { config } = createTemplateModule({
    fields: {
      title: { type: "text", value: "Hello World", maxLength: 50 },
      description: { type: "textarea", value: "", maxLength: 200, rows: 4 },
      image: { type: "image", value: "" },
    },
    size: { width: 800, height: 400 }
  });
</script>

<script>
  let { title, description, image } = $props();
</script>

<div class="banner">
  <h1>{title.value}</h1>
  <p>{description.value}</p>
  <img src={image.value} alt="" />
</div>
```

### Using Core Components

```svelte
<!-- src/routes/template/[name]/+page.svelte -->
<script>
  import { 
    Canvas, 
    Export, 
    Information, 
    TemplateForm 
  } from '@galley/core/components';
  
  // ... your template loading logic
</script>

<Information {template} />
<TemplateForm bind:template />
<Canvas>
  <svelte:component this={template.component} {...template.fields} />
</Canvas>
<Export {templateElement} />
```

## Components

- **Canvas** - Template preview container
- **Export** - Export functionality (PNG, JPG, etc.)
- **Information** - Template information display
- **TemplateForm** - Dynamic form generation for template fields
- **TemplateImage** - Enhanced image component with zoom/pan

## Utilities

- **createTemplateModule** - Helper for creating template configurations
- **getTemplate/getTemplates** - Template loading utilities
- **export utilities** - Image export functionality

## TypeScript Support

Full TypeScript support with exported types for templates, fields, and configurations.

## License

MIT