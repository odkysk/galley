import { z } from "zod";

// Simple template prop schemas
export const TextPropSchema = z.object({
  type: z.literal("text"),
  value: z.string(),
  maxLength: z.number().optional(),
});

export const TextareaPropSchema = z.object({
  type: z.literal("textarea"),
  value: z.string(),
  maxLength: z.number().optional(),
  rows: z.number().optional(),
});

export const ImagePropSchema = z.object({
  type: z.literal("image"),
  value: z.string(),
});

export const EmailPropSchema = z.object({
  type: z.literal("email"),
  value: z.string(),
});

// Union of all template prop types
export const TemplatePropSchema = z.discriminatedUnion("type", [
  TextPropSchema,
  TextareaPropSchema,
  ImagePropSchema,
  EmailPropSchema,
]);

// Type exports
export type TemplateProp = z.infer<typeof TemplatePropSchema>;
export type TextProp = z.infer<typeof TextPropSchema>;
export type TextareaProp = z.infer<typeof TextareaPropSchema>;
export type ImageProp = z.infer<typeof ImagePropSchema>;
export type EmailProp = z.infer<typeof EmailPropSchema>;

// Template props record
export type TemplateProps = Record<string, TemplateProp>;