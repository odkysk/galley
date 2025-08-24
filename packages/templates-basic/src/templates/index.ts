// Export all templates
export { default as Banner } from './Banner.svelte';
export { default as Profile } from './Profile.svelte';

// Export template configurations
export { config as BannerConfig } from './Banner.svelte';
export { config as ProfileConfig } from './Profile.svelte';

// Template metadata
export const templates = {
  Banner: {
    name: 'Banner',
    description: 'Basic banner template with title, description, and image',
    category: 'marketing'
  },
  Profile: {
    name: 'Profile',
    description: 'Simple profile card template',
    category: 'social'
  }
} as const;