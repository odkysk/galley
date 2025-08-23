import type { Component } from "svelte";
import type { TemplateProps, TemplateProp } from "../schemas/template.js";

// Template interface
export interface Template {
  name: string;
  component: Component;
  props: TemplateProps;
  size?: {
    width: number;
    height: number;
  };
}

// Template Svelte module interface
export interface TemplateSvelteModule {
  default: Component;
  config: {
    props: Record<string, TemplateProp>;
    size?: {
      width: number;
      height: number;
    };
  };
}
