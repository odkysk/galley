<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import type { Template } from "$lib/models/template";
  import { clearTemplateFields } from "$lib/utils/templateStorage";
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

  function resetFields() {
    clearTemplateFields(templateName);
    location.reload();
  }
</script>

<div
  class="bg-neutral-100 w-full p-3 border-l flex flex-col h-screen overflow-y-scroll gap-3 justify-between"
>
  <TemplateForm bind:template />
  <div class="flex flex-col gap-3">
    <Button variant="outline" onclick={resetFields}>
      フィールドをリセット
    </Button>
    <Export {templateElement} {templateName} templateFields={template.fields} />
  </div>
</div>
