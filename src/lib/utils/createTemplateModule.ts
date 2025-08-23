import { z } from "zod";
import type { TemplateSvelteModule } from "../models/template.js";
import type { TemplateProp } from "../schemas/template.js";

// Simple template config
export interface TemplateConfig {
  props: Record<string, TemplateProp>;
  size: {
    width: number;
    height: number;
  };
}

export function createTemplateModule(config: TemplateConfig): Pick<TemplateSvelteModule, 'config'> {
  // Create a simple zod schema that defaults to the provided props
  const zodSchema = z.object(
    Object.fromEntries(
      Object.entries(config.props).map(([key, prop]) => [
        key,
        z.any().default(prop)
      ])
    )
  );
  
  return {
    config: {
      schema: zodSchema,
      size: config.size
    }
  };
}