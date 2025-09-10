import type {
  TemplateField,
  TemplateSvelteModule,
  TextField,
  TextareaField,
  ImageField,
} from "../models/template.js";

// Config field types with optional values for template definition
type TextFieldConfig = Omit<TextField, 'value'> & { value?: string };
type TextareaFieldConfig = Omit<TextareaField, 'value'> & { value?: string };
type ImageFieldConfig = Omit<ImageField, 'value'> & { value?: string };

type TemplateFieldConfig = TextFieldConfig | TextareaFieldConfig | ImageFieldConfig;

// Type mapping from config to actual field types
type ConfigToField<T extends TemplateFieldConfig> = 
  T extends { type: 'text' } ? TextField :
  T extends { type: 'textarea' } ? TextareaField :
  T extends { type: 'image' } ? ImageField :
  never;

// Template config with optional field values
export interface TemplateConfig<T extends Record<string, TemplateFieldConfig> = Record<string, TemplateFieldConfig>> {
  fields: T;
  size: {
    width: number;
    height: number;
  };
}

export function createTemplateModule<T extends Record<string, TemplateFieldConfig>>(
  config: TemplateConfig<T>
): {
  config: {
    fields: {
      [K in keyof T]: ConfigToField<T[K]>;
    };
    size: {
      width: number;
      height: number;
    };
  };
} {
  // Auto-initialize values and properties for all field types
  const processedFields = {} as {
    [K in keyof T]: ConfigToField<T[K]>;
  };

  for (const [key, field] of Object.entries(config.fields)) {
    if (field.type === "image") {
      processedFields[key as keyof T] = {
        ...field,
        value: field.value || "",
        frame: field.frame || { zoom: 1, x: 0, y: 0 },
        blendMode: field.blendMode || "normal",
      } as ConfigToField<T[keyof T]>;
    } else if (field.type === "text") {
      processedFields[key as keyof T] = {
        ...field,
        value: field.value || "",
      } as ConfigToField<T[keyof T]>;
    } else if (field.type === "textarea") {
      processedFields[key as keyof T] = {
        ...field,
        value: field.value || "",
      } as ConfigToField<T[keyof T]>;
    }
  }

  return {
    config: {
      fields: processedFields,
      size: config.size,
    },
  };
}
