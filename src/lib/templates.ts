import type { Component } from 'svelte';

export interface Template {
  name: string;
  title: string;
  component: Component;
}

// Get template names from filesystem
export function getTemplateNames(): string[] {
  // For now, return known template names
  // In a real app, you could use a build-time plugin to generate this
  return ['Banner', 'Profile'];
}

export async function getTemplates(): Promise<Template[]> {
  const templateNames = getTemplateNames();
  const templates: Template[] = [];
  
  for (const name of templateNames) {
    const component = await getTemplate(name);
    if (component) {
      templates.push({
        name,
        title: name,
        component
      });
    }
  }
  
  return templates;
}

export async function getTemplate(name: string): Promise<Component | null> {
  try {
    // Use dynamic import with template literals
    const module = await import(`../templates/${name}.svelte`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load template ${name}:`, error);
    return null;
  }
}