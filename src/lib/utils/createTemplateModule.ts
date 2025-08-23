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
  // Auto-initialize frame for image fields
  const processedFields: Record<string, TemplateField> = {};
  
  for (const [key, field] of Object.entries(config.fields)) {
    if (field.type === 'image') {
      processedFields[key] = {
        ...field,
        frame: field.frame || { zoom: 1, x: 0, y: 0 }
      };
    } else {
      processedFields[key] = field;
    }
  }

  return {
    config: {
      fields: processedFields,
      size: config.size
    }
  };
}