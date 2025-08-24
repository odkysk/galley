# Galley Project

A banner generation application built with [Galley](https://github.com/odkysk/galley).

## Developing

Install dependencies with `pnpm install` (or `npm install` or `yarn`), then start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

## Templates

Add your custom templates to `src/templates/` directory. Templates should use the `createTemplateModule` helper from `@galley/core/utils`.

Example template:

```svelte
<!-- src/templates/MyTemplate.svelte -->
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

## Configuration

Customize your Galley application in `galley.config.js`:

- **branding**: Colors, fonts, and logo
- **templateSources**: Where to find templates
- **defaultSize**: Default template dimensions
- **exportFormats**: Available export formats

## Learn More

- [Galley Documentation](https://github.com/odkysk/galley)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)