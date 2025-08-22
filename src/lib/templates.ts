import type { Component } from 'svelte';

export interface Template {
  name: string;
  title: string;
  component: Component;
}

// Dynamic template imports
const templateModules = import.meta.glob('/src/templates/*.svelte', { eager: true });

export function getTemplates(): Template[] {
  const templates: Template[] = [];
  
  for (const [path, module] of Object.entries(templateModules)) {
    const fileName = path.split('/').pop()?.replace('.svelte', '') || '';
    
    templates.push({
      name: fileName,
      title: fileName,
      component: (module as any).default
    });
  }
  
  return templates;
}

export function getTemplate(name: string): Component | null {
  const templates = getTemplates();
  return templates.find(t => t.name === name)?.component || null;
}