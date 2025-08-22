<script lang="ts">
  import Spinner from "$lib/components/common/Spinner.svelte";
  import type { Component } from "svelte";

  let { data } = $props();

  async function getTemplate(name: string): Promise<Component | null> {
    try {
      const module = await import(`../../../templates/${name}.svelte`);
      return module.default;
    } catch (error) {
      console.error(`Failed to load template ${name}:`, error);
      return null;
    }
  }

  let importTemplate = async () => {
    try {
      const templateName = data.templateName;
      if (!templateName) throw new Error("Template name is undefined");

      const template = await getTemplate(templateName);
      if (!template) throw new Error(`Template "${templateName}" not found`);

      return template as Component;
    } catch (error) {
      console.error(`テンプレートのインポートに失敗しました: ${error}`);
      throw error;
    }
  };
</script>

<div class="flex flex-1 flex-col overflow-x-hidden">
  {#await importTemplate()}
    <Spinner />
  {:then TemplateComponent}
    <div class="overflow-x-auto flex max-w-full">
      <div class="flex min-h-dvh flex-1 flex-col gap-3 overflow-auto p-3">
        <h1 class="text-3xl font-bold">{data.templateName}</h1>
        <div class="border rounded-lg p-4 bg-white shadow">
          {#key data.templateName}
            <TemplateComponent
              title="Sample Title"
              description="Sample description"
              name="John Doe"
              email="john@example.com"
            />
          {/key}
        </div>
      </div>
    </div>
  {:catch error}
    <div class="flex flex-1 items-center justify-center">
      <p class="text-gray-500">Template "{data.templateName}" not found</p>
    </div>
  {/await}
</div>
