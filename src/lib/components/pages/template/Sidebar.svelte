<script lang="ts">
  import type { Template } from "$lib/models/template";
  import Export from "./Export.svelte";
  import TemplateForm from "./TemplateForm.svelte";
  import { Button } from "$lib/components/ui/button";
  import { clearTemplateFields } from "$lib/utils/templateStorage";

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
  class="bg-neutral-100 w-full p-3 border-l flex flex-col h-[100vh] overflow-y-scroll"
>
  <div class="flex-1">
    <TemplateForm bind:template />
    <div class="mt-3">
      <Button variant="outline" class="w-full" onclick={resetFields}>
        フィールドをリセット
      </Button>
    </div>
  </div>
  <Export {templateElement} {templateName} templateFields={template.fields} />
</div>
