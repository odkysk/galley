import type { Template, TemplateModule } from "../models/template.js";

// Get template names from filesystem dynamically

export async function getTemplateModule(
  name: string
): Promise<TemplateModule | null> {
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

export async function getTemplate(name: string): Promise<Template | null> {
  try {
    const module = await getTemplateModule(name);
    const props = module?.schema?.parse({});
    let template: Template | null = null;
    if (module) {
      template = {
        name,
        component: module.default,
        props: props ?? {},
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
    const props = module?.schema?.parse({});
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
