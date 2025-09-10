import type {
  TemplateField,
  TemplateSvelteModule,
  TextField,
  TextareaField,
  ImageField,
} from "../models/template.js";

// Input field types with optional values
type TextFieldInput = Omit<TextField, 'value'> & { value?: string };
type TextareaFieldInput = Omit<TextareaField, 'value'> & { value?: string };
type ImageFieldInput = Omit<ImageField, 'value'> & { value?: string };

type TemplateFieldInput = TextFieldInput | TextareaFieldInput | ImageFieldInput;

// Simple template config with optional values
export interface TemplateConfig {
  fields: Record<string, TemplateFieldInput>;
  size: {
    width: number;
    height: number;
  };
}

export function createTemplateModule(
  config: TemplateConfig
): Pick<TemplateSvelteModule, "config"> {
  // Auto-initialize values and properties for all field types
  const processedFields: Record<string, TemplateField> = {};

  for (const [key, field] of Object.entries(config.fields)) {
    if (field.type === "image") {
      processedFields[key] = {
        ...field,
        value: field.value || "",
        frame: field.frame || { zoom: 1, x: 0, y: 0 },
        blendMode: field.blendMode || "normal",
      } as ImageField;
    } else if (field.type === "text") {
      processedFields[key] = {
        ...field,
        value: field.value || "",
      } as TextField;
    } else if (field.type === "textarea") {
      processedFields[key] = {
        ...field,
        value: field.value || "",
      } as TextareaField;
    }
  }

  return {
    config: {
      fields: processedFields,
      size: config.size,
    },
  };
}
