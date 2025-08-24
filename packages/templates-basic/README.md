# @galley/templates-basic

Basic template collection for Galley banner generation applications.

## Installation

```bash
npm install @galley/templates-basic
# or
pnpm add @galley/templates-basic
```

## Templates Included

### Banner Template
- **Title**: Text field (max 50 chars)
- **Description**: Textarea field (max 200 chars, 4 rows)
- **Image**: Image field with zoom/pan controls
- **Size**: 400×200px

### Profile Template
- **Name**: Text field
- **Email**: Email field
- **Profile Image**: Image field
- **Size**: 400×300px

## Usage

```javascript
// galley.config.js
import { defineConfig } from '@galley/core/config';

export default defineConfig({
  templateSources: [
    './src/templates',
    '@galley/templates-basic/templates'
  ]
});
```

## Custom Templates

You can use these templates as a reference to create your own:

```svelte
<!-- src/templates/MyTemplate.svelte -->
<script module>
  import { createTemplateModule } from '@galley/core/utils';

  export const { config } = createTemplateModule({
    fields: {
      title: { type: "text", value: "Default Title" },
    },
    size: { width: 800, height: 400 }
  });
</script>

<script>
  let { title } = $props();
</script>

<div>
  <h1>{title.value}</h1>
</div>
```

## License

MIT