# Contributing to Galley

We love your input! We want to make contributing to Galley as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/galley.git
cd galley

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### Code Style

We use:
- **TypeScript** for type safety
- **Prettier** for code formatting
- **ESLint** for code linting
- **Conventional Commits** for commit messages

Before submitting:
```bash
# Type checking
pnpm run check

# Build to ensure no errors
pnpm run build
```

### Commit Message Format

We follow [Conventional Commits](https://conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

#### Examples
```
feat(templates): add social media banner template
fix(export): resolve canvas rendering issue
docs(readme): update installation instructions
```

## Issue Reporting

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/your-username/galley/issues/new).

### Bug Reports

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

### Feature Requests

We welcome feature requests! Please provide:

- **Use case**: Describe the problem you're trying to solve
- **Proposed solution**: How you envision the feature working
- **Alternatives**: Other solutions you've considered
- **Additional context**: Screenshots, mockups, etc.

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable UI components
│   ├── stores/         # Svelte stores for state management
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript type definitions
├── routes/
│   ├── templates/      # Banner template components
│   └── api/            # API endpoints
└── app.css             # Global styles
```

## Component Guidelines

### Creating Components

1. **Location**: Place reusable components in `src/lib/components/`
2. **Naming**: Use PascalCase for component files (`BannerTemplate.svelte`)
3. **Props**: Always type your props with TypeScript
4. **Styling**: Use Tailwind CSS + Carbon Design System

#### Example Component

```svelte
<script lang="ts">
  interface Props {
    title: string;
    backgroundColor?: string;
    onClick?: () => void;
  }

  let { title, backgroundColor = '#ffffff', onClick }: Props = $props();
</script>

<div 
  class="banner p-4 rounded-lg cursor-pointer"
  style="background-color: {backgroundColor}"
  onclick={onClick}
  role="button"
  tabindex="0"
>
  <h2 class="text-xl font-semibold">{title}</h2>
</div>
```

### Template Development

Banner templates should:

1. **Accept props** for customizable content
2. **Export as PNG/SVG** using Canvas API or similar
3. **Be responsive** across different sizes
4. **Follow accessibility** guidelines

## Testing

We use:
- **Vitest** for unit testing
- **Playwright** for end-to-end testing
- **Testing Library** for component testing

```bash
# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e

# Generate coverage
pnpm test:coverage
```

### Writing Tests

```typescript
// src/lib/components/BannerTemplate.test.ts
import { render } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import BannerTemplate from './BannerTemplate.svelte';

test('renders banner with title', () => {
  const { getByText } = render(BannerTemplate, {
    props: { title: 'Test Banner' }
  });
  
  expect(getByText('Test Banner')).toBeInTheDocument();
});
```

## Documentation

- Update README.md for user-facing changes
- Update CLAUDE.md for development-specific changes
- Add JSDoc comments for complex functions
- Include code examples for new features

## Questions?

Feel free to open an issue for any questions about contributing!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.