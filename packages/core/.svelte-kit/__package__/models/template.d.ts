import type { Component } from "svelte";
export interface ImageFrame {
    zoom: number;
    x: number;
    y: number;
}
export type TextField = {
    type: "text";
    value: string;
    maxLength?: number;
};
export type TextareaField = {
    type: "textarea";
    value: string;
    maxLength?: number;
    rows?: number;
};
export type ImageField = {
    type: "image";
    value: string;
    frame?: ImageFrame;
    blendMode?: string;
    _usedByTemplateImage?: boolean;
};
export type EmailField = {
    type: "email";
    value: string;
};
export type TemplateField = TextField | TextareaField | ImageField | EmailField;
export type TemplateFields = Record<string, TemplateField>;
export interface Template {
    name: string;
    component: Component;
    fields: TemplateFields;
    size?: {
        width: number;
        height: number;
    };
}
export interface TemplateSvelteModule {
    default: Component;
    config: {
        fields: Record<string, TemplateField>;
        size?: {
            width: number;
            height: number;
        };
    };
}
