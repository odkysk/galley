import type { Component } from "svelte";

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
