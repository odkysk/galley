// このファイルは、Svelteコンポーネントからテンプレート情報を取得するためのユーティリティ関数を提供します。
// 複数のテンプレートソースから動的にテンプレート情報を取得します。

import type { Template, TemplateSvelteModule } from "../models/template.js";
import type { GalleyConfig } from "../config/index.js";

// Default template sources for fallback
const DEFAULT_TEMPLATE_SOURCES = ['../../templates'];

export async function getTemplateModule(
  name: string,
  sources?: string[]
): Promise<TemplateSvelteModule | null> {
  const templateSources = sources || DEFAULT_TEMPLATE_SOURCES;
  
  for (const source of templateSources) {
    try {
      const module = await import(`${source}/${name}.svelte`);
      return module;
    } catch (error) {
      // Continue to next source
      continue;
    }
  }
  
  console.error(`Failed to load template module ${name} from any source`);
  return null;
}

export function getTemplateNames(sources?: string[]): string[] {
  const templateSources = sources || DEFAULT_TEMPLATE_SOURCES;
  const allTemplates: string[] = [];
  
  templateSources.forEach(source => {
    try {
      const templateModules = import.meta.glob(`${source}/*.svelte`);
      const names = Object.keys(templateModules)
        .map((path) => {
          const filename = path.split("/").pop()?.replace(".svelte", "");
          return filename || "";
        })
        .filter((name) => name !== "");
      allTemplates.push(...names);
    } catch (error) {
      console.warn(`Could not access template source: ${source}`);
    }
  });

  // Remove duplicates
  return [...new Set(allTemplates)];
}

export async function getTemplate(name: string, sources?: string[]): Promise<Template | null> {
  try {
    const module = await getTemplateModule(name, sources);
    let template: Template | null = null;
    if (module) {
      template = {
        name,
        fields: module.config?.fields ?? {},
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

export async function getTemplates(sources?: string[]): Promise<Template[]> {
  const templateNames = getTemplateNames(sources);
  const templates: Template[] = [];

  for (const name of templateNames) {
    const template = await getTemplate(name, sources);
    if (template) {
      templates.push(template);
    }
  }

  return templates;
}

// Configuration-based template loading
export async function getTemplatesWithConfig(config: GalleyConfig): Promise<Template[]> {
  return getTemplates(config.templateSources);
}

export async function getTemplateWithConfig(name: string, config: GalleyConfig): Promise<Template | null> {
  return getTemplate(name, config.templateSources);
}
