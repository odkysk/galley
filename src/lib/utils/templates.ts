// このファイルは、Svelteコンポーネントからテンプレート情報を取得するためのユーティリティ関数を提供します。
// プロジェクト内の `src/templates` ディレクトリにあるSvelteファイルからテンプレート情報を動的に取得します。

import type { Template, TemplateSvelteModule } from "../models/template.js";

export async function getTemplateModule(
  name: string
): Promise<TemplateSvelteModule | null> {
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
    const props = module?.config?.schema ? module.config.schema.parse({}) : {};
    let template: Template | null = null;
    if (module) {
      template = {
        name,
        schema: module.config?.schema,
        props: props,
        component: module.default,
        size: module.config?.size ?? undefined,
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
    const template = await getTemplate(name);
    if (template) {
      templates.push(template);
    }
  }

  return templates;
}
