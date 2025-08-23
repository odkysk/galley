<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { importTemplate } from "$lib/utils/templates";
  import { exportAsImage } from "$lib/utils/export";

  let { data } = $props();
  let templateName = $derived(data.templateName);
  let templateProps = $state<any>({});
  let templateElement = $state<HTMLElement>();

  let loadTemplate = async () => {
    const result = await importTemplate(templateName);
    templateProps = result.props;
    return result.component;
  };

  async function handleExport() {
    if (!templateElement) return;
    await exportAsImage(templateElement, `${templateName}-banner`);
  }
</script>

<div class="flex-1 bg-gray-200">
  {#await loadTemplate()}
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
