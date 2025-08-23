import type { TemplateSvelteModule, TemplateField } from "../models/template.js";

// Simple template config
export interface TemplateConfig {
  fields: Record<string, TemplateField>;
  size: {
    width: number;
    height: number;
  };
}

export function createTemplateModule(config: TemplateConfig): Pick<TemplateSvelteModule, 'config'> {
  return {
    config: {
      fields: config.fields,
      size: config.size
    }
  };
}