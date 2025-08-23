import type { Component, ComponentProps } from "svelte";
import type { ZodType } from "zod";

export interface Template<T = ComponentProps<any>> {
  name: string;
  component: Component;
  props: T;
  schema?: ZodType<T>;
  size?: {
    width: number;
    height: number;
  };
}

export interface TemplateSvelteModule<T = ComponentProps<any>> {
  default: Component;
  config: {
    schema?: ZodType<T>;
    size?: {
      width: number;
      height: number;
    };
  };
}
