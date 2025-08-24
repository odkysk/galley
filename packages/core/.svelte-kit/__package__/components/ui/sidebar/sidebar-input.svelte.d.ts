declare const SidebarInput: import("svelte").Component<(Omit<import("svelte/elements").HTMLInputAttributes, "type"> & ({
    type: "file";
    files?: FileList;
} | {
    type?: "number" | "text" | "image" | "email" | "button" | "search" | "time" | "date" | "hidden" | "color" | "submit" | "reset" | "checkbox" | "radio" | (string & {}) | "tel" | "url" | "datetime-local" | "month" | "password" | "range" | "week";
    files?: undefined;
})) & {
    ref?: undefined;
}, {}, "ref" | "value">;
type SidebarInput = ReturnType<typeof SidebarInput>;
export default SidebarInput;
