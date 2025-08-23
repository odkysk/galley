import { z } from "zod";
import type { TemplateSvelteModule } from "../models/template.js";

export function createTemplateModule<T extends z.ZodRawShape>(
  schemaDefinition: T,
  dimensions: { width: number; height: number }
): Pick<TemplateSvelteModule, 'config'> {
  const schema = z.object(schemaDefinition);
  
  return {
    config: {
      schema,
      size: dimensions
    }
  };
}