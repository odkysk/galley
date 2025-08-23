import { z } from "zod";

// Template prop schemas - all must have a type and value field
export const SingleLineTextPropSchema = z.object({
  type: z.literal("singleText"),
  value: z.string(),
  maxLength: z.number().min(1).max(1000).optional().default(100),
});

export const MultiLineTextPropSchema = z.object({
  type: z.literal("multiText"),
  value: z.string(),
  maxLength: z.number().min(1).max(10000).optional().default(500),
  maxLines: z.number().min(1).max(50).optional().default(3),
});

export const ImagePropSchema = z.object({
  type: z.literal("image"),
  value: z.string(),
});

export const StringPropSchema = z.object({
  type: z.literal("string"),
  value: z.string(),
  validation: z.enum(["email", "url", "none"]).optional().default("none"),
});

// Union of all possible template prop types
export const TemplatePropSchema = z.discriminatedUnion("type", [
  SingleLineTextPropSchema,
  MultiLineTextPropSchema,
  ImagePropSchema,
  StringPropSchema,
]);

// Template props factory functions with Zod validation and error handling
export const createSingleTextProp = (options: {
  value?: string;
  maxLength?: number;
} = {}) => {
  try {
    return SingleLineTextPropSchema.parse({
      type: "singleText",
      value: options.value ?? "",
      maxLength: options.maxLength ?? 100,
    });
  } catch (error) {
    throw new Error(`Invalid single text prop configuration: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const createMultiTextProp = (options: {
  value?: string;
  maxLength?: number;
  maxLines?: number;
} = {}) => {
  try {
    return MultiLineTextPropSchema.parse({
      type: "multiText",
      value: options.value ?? "",
      maxLength: options.maxLength ?? 500,
      maxLines: options.maxLines ?? 3,
    });
  } catch (error) {
    throw new Error(`Invalid multi-line text prop configuration: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const createImageProp = (value: string = "") => {
  try {
    return ImagePropSchema.parse({
      type: "image",
      value,
    });
  } catch (error) {
    throw new Error(`Invalid image prop configuration: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const createStringProp = (options: {
  value?: string;
  validation?: "email" | "url" | "none";
} = {}) => {
  try {
    return StringPropSchema.parse({
      type: "string",
      value: options.value ?? "",
      validation: options.validation ?? "none",
    });
  } catch (error) {
    throw new Error(`Invalid string prop configuration: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Type exports
export type TemplateProp = z.infer<typeof TemplatePropSchema>;
export type SingleLineTextProp = z.infer<typeof SingleLineTextPropSchema>;
export type MultiLineTextProp = z.infer<typeof MultiLineTextPropSchema>;
export type ImageProp = z.infer<typeof ImagePropSchema>;
export type StringProp = z.infer<typeof StringPropSchema>;

// Template props object schema - all properties must be template props with types
export const TemplatePropsSchema = z.record(z.string(), TemplatePropSchema);
export type TemplateProps = z.infer<typeof TemplatePropsSchema>;