import { z } from "zod";

export const SingleLineTextSchema = z.object({
  type: z.literal("single"),
  value: z.string().max(100, "100文字以内で入力してください"),
  label: z.string(),
});

export const MultiLineTextSchema = z.object({
  type: z.literal("multi"),
  value: z.string().max(500, "500文字以内で入力してください"),
  label: z.string(),
  maxLines: z.number().min(1).max(10).optional().default(3),
});

export const TextContentSchema = z.union([
  SingleLineTextSchema,
  MultiLineTextSchema,
]);

export const BannerPropsSchema = z.object({
  title: SingleLineTextSchema,
  description: MultiLineTextSchema,
  additionalTexts: z.array(TextContentSchema).optional().default([]),
  backgroundColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "有効な16進数カラーコードを入力してください")
    .default("#ffffff"),
});

export type SingleLineText = z.infer<typeof SingleLineTextSchema>;
export type MultiLineText = z.infer<typeof MultiLineTextSchema>;
export type TextContent = z.infer<typeof TextContentSchema>;
export type BannerProps = z.infer<typeof BannerPropsSchema>;

export const isSingleLine = (content: TextContent): content is SingleLineText =>
  content.type === "single";

export const isMultiLine = (content: TextContent): content is MultiLineText =>
  content.type === "multi";
