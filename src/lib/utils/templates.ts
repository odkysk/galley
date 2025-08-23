import type { Component } from 'svelte';
import type { Template, TemplateModule } from '../models/template.js';

// Get template names from filesystem dynamically
export function getTemplateNames(): string[] {
  // Use import.meta.glob to get all template files at build time
  const templateModules = import.meta.glob('../../templates/*.svelte');
  
  return Object.keys(templateModules).map(path => {
    // Extract filename without extension from path like '../../templates/Banner.svelte'
    const filename = path.split('/').pop()?.replace('.svelte', '');
    return filename || '';
  }).filter(name => name !== '');
}

export async function getTemplates(): Promise<Template[]> {
  const templateNames = getTemplateNames();
  const templates: Template[] = [];
  
  for (const name of templateNames) {
    const module = await getTemplateModule(name);
    if (module) {
      templates.push({
        name,
        component: module.default,
        schema: module.schema
      });
    }
  }
  
  return templates;
}

export async function getTemplate(name: string): Promise<Component | null> {
  try {
    const module = await getTemplateModule(name);
    return module?.default || null;
  } catch (error) {
    console.error(`Failed to load template ${name}:`, error);
    return null;
  }
}

export async function getTemplateModule(name: string): Promise<TemplateModule | null> {
  try {
    const module = await import(`../../templates/${name}.svelte`);
    return module;
  } catch (error) {
    console.error(`Failed to load template module ${name}:`, error);
    return null;
  }
}

export async function importTemplate(templateName: string) {
  try {
    if (!templateName) throw new Error("Template name is undefined");

    const module = await getTemplateModule(templateName);
    if (!module) throw new Error(`Template "${templateName}" not found`);

    const templateComponent: Component = module.default;
    let templateProps: Record<string, any> = {};
    
    if (module.schema) {
      templateProps = module.schema.parse({});
    }

    return { component: templateComponent, props: templateProps };
  } catch (error) {
    console.error(`Failed to load template "${templateName}":`, error);
    throw error;
  }
}