import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'GalleyTemplatesBasic',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['svelte', '@galley/core']
    }
  }
});