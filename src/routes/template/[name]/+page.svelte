<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import type { Component } from "svelte";

  let { data } = $props();
  let templateName = $derived(data.templateName);
  let templateProps = $state<any>({});

  let importTemplate = async () => {
    try {
      if (!templateName) throw new Error("Template name is undefined");

      const modulePath = `../../../templates/${templateName}.svelte`;
      const module = await import(modulePath);
      const templateComponent: Component = module.default;
      if (module.schema) {
        templateProps = module.schema.parse({});
      }

      if (!templateComponent)
        throw new Error(`Template "${templateName}" not found`);

      return templateComponent;
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
      <div class="flex gap-3">
        {#each Object.keys(templateProps) as key}
          <Input bind:value={templateProps[key]} />
        {/each}
      </div>
      <TemplateComponent {...templateProps} />
    </div>
  {:catch error}
    <div class="flex flex-1 items-center justify-center">
      <p class="text-gray-500">Template "{data.templateName}" not found</p>
      <p>{error.message}</p>
    </div>
  {/await}
</div>
