import type { TemplateSvelteModule, TemplateProp } from "../models/template.js";

// Simple template config
export interface TemplateConfig {
  props: Record<string, TemplateProp>;
  size: {
    width: number;
    height: number;
  };
}

export function createTemplateModule(config: TemplateConfig): Pick<TemplateSvelteModule, 'config'> {
  return {
    config: {
      props: config.props,
      size: config.size
    }
  };
}