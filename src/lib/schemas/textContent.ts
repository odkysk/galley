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

export type TextContent = z.infer<typeof TextContentSchema>;

