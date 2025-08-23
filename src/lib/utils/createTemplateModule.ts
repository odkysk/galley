import { z } from "zod";
import type { TemplateSvelteModule } from "../models/template.js";

export interface TemplateConfig<T extends z.ZodRawShape = z.ZodRawShape> {
  schema: T;
  size: {
    width: number;
    height: number;
  };
}

export function createTemplateModule<T extends z.ZodRawShape>(
  config: TemplateConfig<T>
): Pick<TemplateSvelteModule, 'config'> {
  const schema = z.object(config.schema);
  
  return {
    config: {
      schema,
      size: config.size
    }
  };
}