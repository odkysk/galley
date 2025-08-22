<script lang="ts">
  import type { Component } from "svelte";

  let { data } = $props();
  let templateName = $derived(data.templateName);

  let importTemplate = async () => {
    try {
      if (!templateName) throw new Error("Template name is undefined");

      const modulePath = `../../../templates/${templateName}.svelte`;
      const module = await import(modulePath);
      const templateComponent = module.default;

      if (!templateComponent)
        throw new Error(`Template "${templateName}" not found`);
      return templateComponent as Component;
    } catch (error) {
      console.error(`Failed to load template "${templateName}":`, error);
      throw error;
    }
  };
</script>

<div class="flex-1 bg-gray-200">
  {#await importTemplate()}
    <p>Loading...</p>
  {:then TemplateComponent}
    <div class="flex min-h-dvh flex-1 flex-col gap-3 p-3">
      <h1 class="text-xl font-semibold">{data.templateName}</h1>
      <TemplateComponent
        title="Sample Title"
        description="Sample description"
        name="John Doe"
        email="john@example.com"
      />
    </div>
  {:catch error}
    <div class="flex flex-1 items-center justify-center">
      <p class="text-gray-500">Template "{data.templateName}" not found</p>
      <p>{error.message}</p>
    </div>
  {/await}
</div>
