import { z } from "zod";
import type { TemplateSvelteModule } from "../models/template.js";
import { 
  TemplatePropsSchema, 
  type TemplateProp,
  SingleLineTextPropSchema,
  MultiLineTextPropSchema,
  ImagePropSchema,
  StringPropSchema
} from "../schemas/template.js";

export interface TemplateConfig {
  props: Record<string, TemplateProp>;
  size: {
    width: number;
    height: number;
  };
}

export function createTemplateModule(
  config: TemplateConfig
): Pick<TemplateSvelteModule, 'config'> {
  // Validate that all props conform to the TemplateProp schema
  const propsSchema = TemplatePropsSchema.parse(config.props);
  
  // Create a zod object schema from the props using existing schemas
  const schemaEntries = Object.entries(config.props).map(([key, prop]) => {
    let propSchema: z.ZodTypeAny;
    
    switch (prop.type) {
      case "singleText":
        propSchema = SingleLineTextPropSchema.default(prop);
        break;
      case "multiText":
        propSchema = MultiLineTextPropSchema.default(prop);
        break;
      case "image":
        propSchema = ImagePropSchema.default(prop);
        break;
      case "string":
        propSchema = StringPropSchema.default(prop);
        break;
      default:
        throw new Error(`Unknown prop type: ${(prop as any).type}`);
    }
    
    return [key, propSchema];
  });
  
  const zodSchema = z.object(Object.fromEntries(schemaEntries));
  
  return {
    config: {
      schema: zodSchema,
      size: config.size
    }
  };
}