import { defineConfig } from '@galley/core/config';

export default defineConfig({
  branding: {
    primaryColor: '#3B82F6',
    secondaryColor: '#64748B',
    fontFamily: 'Inter, sans-serif',
  },
  templateSources: [
    './src/templates',
    '@galley/templates-basic/templates'
  ],
  defaultSize: {
    width: 800,
    height: 400,
  },
  exportFormats: ['png', 'jpg'],
  theme: 'default',
});