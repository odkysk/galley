import type { TemplateSvelteModule, TemplateField } from "../models/template.js";
export interface TemplateConfig {
    fields: Record<string, TemplateField>;
    size: {
        width: number;
        height: number;
    };
}
export declare function createTemplateModule(config: TemplateConfig): Pick<TemplateSvelteModule, 'config'>;
