import { type WithElementRef, type WithoutChildren } from "../../../utils.js";
import type { HTMLTextareaAttributes } from "svelte/elements";
declare const Textarea: import("svelte").Component<WithoutChildren<WithElementRef<HTMLTextareaAttributes>>, {}, "ref" | "value">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
