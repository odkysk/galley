<script lang="ts">
  import type { Template } from "$lib/models/template";
  import Export from "./Export.svelte";
  import TemplateForm from "./TemplateForm.svelte";

  let {
    template = $bindable(),
    templateElement,
    templateName,
  }: {
    template: Template;
    templateElement: HTMLElement;
    templateName: string;
  } = $props();
</script>

<div
  class="bg-neutral-100 w-full p-3 border-l flex flex-col h-[100vh] overflow-y-scroll"
>
  <div class="flex-1"><TemplateForm bind:template /></div>
  <Export {templateElement} {templateName} templateFields={template.fields} />
</div>
