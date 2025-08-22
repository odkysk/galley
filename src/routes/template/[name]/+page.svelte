<script lang="ts">
  import { getTemplate } from '$lib/templates.js';

  let { data } = $props();
  const templateName = data.templateName;
  
  const SelectedTemplate = $derived(templateName ? getTemplate(templateName) : null);
</script>

<div class="flex flex-1 flex-col overflow-x-hidden">
  {#if SelectedTemplate}
    <div class="overflow-x-auto flex max-w-full">
      <div class="flex min-h-dvh flex-1 flex-col gap-3 overflow-auto p-3">
        <h1 class="text-3xl font-bold">{templateName}</h1>
        <div class="border rounded-lg p-4 bg-white shadow">
          <SelectedTemplate 
            title="Sample Title"
            description="Sample description"
            name="John Doe"
            email="john@example.com"
          />
        </div>
      </div>
    </div>
  {:else}
    <div class="flex flex-1 items-center justify-center">
      <p class="text-gray-500">Template "{templateName}" not found</p>
    </div>
  {/if}
</div>