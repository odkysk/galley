import type { TemplateFields } from "../../../models/template";
interface Props {
    templateElement: HTMLElement | undefined;
    templateName: string;
    templateFields: TemplateFields;
}
declare const Export: import("svelte").Component<Props, {}, "">;
type Export = ReturnType<typeof Export>;
export default Export;
