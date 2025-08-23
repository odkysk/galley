import type { Component } from "svelte";

// Common frame interface for images
export interface ImageFrame {
  zoom: number;
  x: number;
  y: number;
}

// Template field type definitions
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

// Union of all template field types
export type TemplateField = TextField | TextareaField | ImageField | EmailField;

// Template fields record
export type TemplateFields = Record<string, TemplateField>;

// Template interface
export interface Template {
  name: string;
  component: Component;
  fields: TemplateFields;
  size?: {
    width: number;
    height: number;
  };
}

// Template Svelte module interface
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
