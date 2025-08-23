import { z } from "zod";

export const TextContentSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("single"),
    value: z.string(),
    maxLength: z.number().min(1).max(1000).optional().default(100),
  }),
  z.object({
    type: z.literal("multi"),
    value: z.string(),
    maxLength: z.number().min(1).max(10000).optional().default(500),
    maxLines: z.number().min(1).max(50).optional().default(3),
  }),
]);

export const SingleLineTextSchema = z.object({
  type: z.literal("single"),
  value: z.string(),
  maxLength: z.number().min(1).max(1000).optional().default(100),
});

export const MultiLineTextSchema = z.object({
  type: z.literal("multi"),
  value: z.string(),
  maxLength: z.number().min(1).max(10000).optional().default(500),
  maxLines: z.number().min(1).max(50).optional().default(3),
});

export type SingleLineText = z.infer<typeof SingleLineTextSchema>;
export type MultiLineText = z.infer<typeof MultiLineTextSchema>;
export type TextContent = z.infer<typeof TextContentSchema>;

export const isSingleLine = (content: TextContent): content is SingleLineText =>
  content.type === "single";

export const isMultiLine = (content: TextContent): content is MultiLineText =>
  content.type === "multi";

// Factory functions to avoid redundant type specification
export const createSingleLineText = (options: {
  value?: string;
  maxLength?: number;
} = {}) => {
  return z.object({
    type: z.literal("single"),
    value: z.string(),
    maxLength: z.number().min(1).max(1000).optional(),
  }).default({
    type: "single",
    value: options.value || "",
    maxLength: options.maxLength || 100,
  });
};

export const createMultiLineText = (options: {
  value?: string;
  maxLength?: number;
  maxLines?: number;
} = {}) => {
  return z.object({
    type: z.literal("multi"),
    value: z.string(),
    maxLength: z.number().min(1).max(10000).optional(),
    maxLines: z.number().min(1).max(50).optional(),
  }).default({
    type: "multi",
    value: options.value || "",
    maxLength: options.maxLength || 500,
    maxLines: options.maxLines || 3,
  });
};
