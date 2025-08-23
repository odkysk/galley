import type { Component } from 'svelte';

export interface Template {
  name: string;
  component: Component;
}

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
    const component = await getTemplate(name);
    if (component) {
      templates.push({
        name,
        component
      });
    }
  }
  
  return templates;
}

export async function getTemplate(name: string): Promise<Component | null> {
  try {
    // Use dynamic import with template literals
    const module = await import(`../../templates/${name}.svelte`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load template ${name}:`, error);
    return null;
  }
}

export async function importTemplate(templateName: string) {
  try {
    if (!templateName) throw new Error("Template name is undefined");

    const modulePath = `../../templates/${templateName}.svelte`;
    const module = await import(modulePath);
    const templateComponent: Component = module.default;

    let templateProps: Record<string, any> = {};
    if (module.schema) {
      templateProps = module.schema.parse({});
    }

    if (!templateComponent)
      throw new Error(`Template "${templateName}" not found`);

    return { component: templateComponent, props: templateProps };
  } catch (error) {
    console.error(`Failed to load template "${templateName}":`, error);
    throw error;
  }
}