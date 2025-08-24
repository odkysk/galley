import type { Template, TemplateSvelteModule } from "../models/template.js";
import type { GalleyConfig } from "../config/index.js";
export declare function getTemplateModule(name: string, sources?: string[]): Promise<TemplateSvelteModule | null>;
export declare function getTemplateNames(sources?: string[]): string[];
export declare function getTemplate(name: string, sources?: string[]): Promise<Template | null>;
export declare function getTemplates(sources?: string[]): Promise<Template[]>;
export declare function getTemplatesWithConfig(config: GalleyConfig): Promise<Template[]>;
export declare function getTemplateWithConfig(name: string, config: GalleyConfig): Promise<Template | null>;
