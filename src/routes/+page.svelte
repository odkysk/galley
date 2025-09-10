<script lang="ts">
  import { getTemplateNames } from "$lib/utils/templates.js";

  let templates: string[] = $state([]);

  // Load templates on mount
  $effect(() => {
    templates = getTemplateNames();
  });
</script>

<div class="container mx-auto p-6">
  <h2 class="text-title mb-4">Available Templates</h2>
  <div class="flex flex-col gap-3 items-start">
    {#each templates as template}
      <a
        href="/template/{template}"
        class="block p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <h3 class="text-body font-medium text-gray-900">{template}</h3>
      </a>
    {/each}
  </div>
</div>
