import { type ClassValue } from "clsx";
export declare function cn(...inputs: ClassValue[]): string;
export type WithElementRef<T, K extends keyof T = keyof T> = T & {
    ref?: K extends "ref" ? T[K] : never;
};
export type WithoutChildren<T> = Omit<T, "children">;
export type WithoutChildrenOrChild<T> = Omit<T, "children" | "child">;
