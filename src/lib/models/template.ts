import type { Component } from "svelte";

// Template prop type definitions
export type TextProp = {
  type: "text";
  value: string;
  maxLength?: number;
};

export type TextareaProp = {
  type: "textarea";
  value: string;
  maxLength?: number;
  rows?: number;
};

export type ImageProp = {
  type: "image";
  value: string;
};

export type EmailProp = {
  type: "email";
  value: string;
};

// Union of all template prop types
export type TemplateProp = TextProp | TextareaProp | ImageProp | EmailProp;

// Template props record
export type TemplateProps = Record<string, TemplateProp>;

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