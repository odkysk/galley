import type { Component } from "svelte";
import type { ZodSchema } from "zod";

export interface Template {
  name: string;
  component: Component;
  props: Record<string, any>;
  schema?: ZodSchema;
}

export interface TemplateModule {
  default: Component;
  schema?: ZodSchema;
}
