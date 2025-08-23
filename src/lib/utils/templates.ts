import type { Template, TemplateModule } from "../models/template.js";
import type { z } from "zod";

// Get template names from filesystem dynamically

export async function getTemplateModule<T = any>(
  name: string
): Promise<TemplateModule<T> | null> {
  try {
    const module = await import(`../../templates/${name}.svelte`);
    return module;
  } catch (error) {
    console.error(`Failed to load template module ${name}:`, error);
    return null;
  }
}

export function getTemplateNames(): string[] {
  // Use import.meta.glob to get all template files at build time
  const templateModules = import.meta.glob("../../templates/*.svelte");

  return Object.keys(templateModules)
    .map((path) => {
      // Extract filename without extension from path like '../../templates/Banner.svelte'
      const filename = path.split("/").pop()?.replace(".svelte", "");
      return filename || "";
    })
    .filter((name) => name !== "");
}

export async function getTemplate<T = any>(name: string): Promise<Template<T> | null> {
  try {
    const module = await getTemplateModule<T>(name);
    const props = module?.schema?.parse({}) as T;
    let template: Template<T> | null = null;
    if (module) {
      template = {
        name,
        component: module.default,
        props: props ?? ({} as T),
        schema: module.schema,
      };
    }
    return template;
  } catch (error) {
    console.error(`Failed to load template ${name}:`, error);
    return null;
  }
}

export async function getTemplates(): Promise<Template[]> {
  const templateNames = getTemplateNames();
  const templates: Template[] = [];

  for (const name of templateNames) {
    const module = await getTemplateModule(name);
    const props = module?.schema?.parse({}) as any;
    if (module) {
      templates.push({
        name,
        props: props ?? {},
        component: module.default,
        schema: module.schema,
      });
    }
  }

  return templates;
}
