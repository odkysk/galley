import type { Component } from 'svelte';
import type { ZodSchema } from 'zod';

export interface Template {
  name: string;
  component: Component;
  schema?: ZodSchema;
}

export interface TemplateModule {
  default: Component;
  schema?: ZodSchema;
}