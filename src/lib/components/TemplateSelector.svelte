<script lang="ts">
  import { goto } from "$app/navigation";
  import * as Select from "$lib/components/ui/select/index.js";
  import { getTemplateNames } from "$lib/utils/templates.js";
  import StickyNote from "@lucide/svelte/icons/sticky-note";
  // Dynamically load templates from filesystem
  let templates: string[] = $state([]);

  // Load templates on mount
  $effect(() => {
    templates = getTemplateNames();
  });

  function handleValueChange(value: string | undefined) {
    if (value) {
      goto(`/template/${value}`);
    }
  }
</script>

<div class="fixed bottom-3 left-3">
  <Select.Root onValueChange={handleValueChange} type="single">
    <Select.Trigger class="bg-white">
      <StickyNote />
    </Select.Trigger>
    <Select.Content align="start">
      {#each templates as template}
        <Select.Item value={template}>{template}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
</div>
