interface ExportOptions {
    withDate?: boolean;
}
export declare function exportAsImage(element: HTMLElement, filename?: string, options?: ExportOptions): Promise<void>;
export {};
