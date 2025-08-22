<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import html2canvas from "html2canvas";
  import type { Component } from "svelte";

  let { data } = $props();
  let templateName = $derived(data.templateName);
  let templateProps = $state<any>({});
  let templateElement = $state<HTMLElement>();

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

  async function exportAsImage() {
    if (!templateElement) {
      console.error("Template element not found");
      return;
    }

    try {
      const canvas = await html2canvas(templateElement, {
        backgroundColor: null,
        scale: 4,
      });

      const link = document.createElement("a");
      link.download = `${templateName}-banner.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Failed to export image:", error);
    }
  }
</script>

<div class="flex-1 bg-gray-200">
  {#await importTemplate()}
    <p>Loading...</p>
  {:then TemplateComponent}
    <div class="flex min-h-dvh flex-1 flex-col gap-3 p-3 items-start">
      <h1 class="text-xl font-semibold">{data.templateName}</h1>
      <div class="flex gap-3">
        {#each Object.keys(templateProps) as key}
          <Input bind:value={templateProps[key]} />
        {/each}
      </div>
      <div bind:this={templateElement}>
        <TemplateComponent {...templateProps} />
      </div>
      <button
        onclick={exportAsImage}
        class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        画像を保存
      </button>
    </div>
  {:catch error}
    <div class="flex flex-1 items-center justify-center">
      <p class="text-gray-500">Template "{data.templateName}" not found</p>
      <p>{error.message}</p>
    </div>
  {/await}
</div>
