import type { Component } from "svelte";
import type { ZodSchema } from "zod";

export interface Template<T = any> {
  name: string;
  component: Component;
  props: T;
  schema?: ZodSchema<T>;
}

export interface TemplateModule<T = any> {
  default: Component;
  schema?: ZodSchema<T>;
}
