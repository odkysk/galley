<script lang="ts">
  import TemplateForm from "$lib/components/page/template/TemplateForm.svelte";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import type { Template } from "$lib/models/template";
  import { exportAsImage } from "$lib/utils/export";
  import { getTemplate } from "$lib/utils/templates";

  let { data } = $props();
  let templateName = $derived(data.templateName);
  let templateProps = $state<any>({});
  let templateElement = $state<HTMLElement>();
  let templateSize = $state<Template["size"] | undefined>(undefined);

  let loadTemplate = async () => {
    const template = await getTemplate(templateName);
    templateProps = template?.props ?? {};
    templateSize = template?.size ?? { width: 400, height: 200 };
    if (!template) throw new Error(`Template "${templateName}" not found`);
    return template;
  };

  async function handleExport() {
    if (!templateElement) return;
    const firstStringPropValue = Object.values(templateProps).find(
      (value) => typeof value === "string"
    );
    await exportAsImage(
      templateElement,
      `${templateName}_${firstStringPropValue ?? ""}`,
      {
        withDate: true,
      }
    );
  }
</script>

<div class="flex-1">
  {#await loadTemplate()}
    <div class="flex-1 p-3 flex flex-col gap-3 min-h-dvh">
      <Skeleton class="h-8 w-64" />
      <Skeleton class="h-4 w-32" />
      <Skeleton class="flex-1 w-full" />
    </div>
  {:then template}
    {@const Component = template.component}
    <div class="flex min-h-dvh flex-1 flex-col gap-3 p-3 items-start">
      <h1 class="text-2xl font-semibold">{template.name}</h1>
      {#if template.size}
        <p class="text-xs text-gray-500">
          {template.size.width} x {template.size.height}
        </p>
      {/if}
      <TemplateForm bind:templateProps />
      <div
        class="bg-gray-200 p-3 w-full flex-1 flex items-center justify-center"
      >
        <div bind:this={templateElement}>
          <Component {...templateProps} />
        </div>
      </div>
      <button
        onclick={handleExport}
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
