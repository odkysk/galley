import type { Component } from "svelte";
import type { ZodType } from "zod";
import type { TemplateProps } from "../schemas/template.js";

// Template interface
export interface Template {
  name: string;
  component: Component;
  props: TemplateProps;
  schema?: ZodType<TemplateProps>;
  size?: {
    width: number;
    height: number;
  };
}

// Template Svelte module interface
export interface TemplateSvelteModule {
  default: Component;
  config: {
    schema?: ZodType<any>;
    size?: {
      width: number;
      height: number;
    };
  };
}
