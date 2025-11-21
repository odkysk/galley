<script lang="ts">
  import Information from "$lib/components/pages/template/Information.svelte";
  import Sidebar from "$lib/components/pages/template/Sidebar.svelte";
  import Skeleton from "$lib/components/pages/template/Skeleton.svelte";
  import TemplateError from "$lib/components/pages/template/TemplateError.svelte";
  import type { Template } from "$lib/models/template";
  import { getTemplate } from "$lib/utils/templates";
  import {
    saveTemplateFields,
    loadTemplateFields,
  } from "$lib/utils/templateStorage";

  let { data } = $props();
  let templateName = $derived(data.templateName);
  let template = $state<Template | null>(null);
  let templateElement = $state<HTMLElement>();

  let loadTemplate = async () => {
    const loadedTemplate = await getTemplate(templateName);
    if (!loadedTemplate)
      throw new Error(`Template "${templateName}" not found`);

    // LocalStorageから保存された値を復元
    const savedFields = loadTemplateFields(templateName);
    if (savedFields) {
      // デフォルト値とマージ（新しいフィールドが追加された場合に対応）
      loadedTemplate.fields = { ...loadedTemplate.fields, ...savedFields };
    }

    template = loadedTemplate;
    return loadedTemplate;
  };

  // template.fieldsが変更されたら自動保存
  $effect(() => {
    if (template) {
      saveTemplateFields(templateName, template.fields);
    }
  });
</script>

{#await loadTemplate()}
  <Skeleton />
{:then loadedTemplate}
  {@const Component = loadedTemplate.component}
  {#if template}
    <div class="flex h-full max-h-dvh">
      <main
        class="flex-1 min-w-0 overflow-scroll flex flex-col p-3 gap-3 bg-neutral-300"
      >
        <Information template={loadedTemplate} />
        <div class="flex-1 items-center justify-center flex">
          <div bind:this={templateElement}>
            <Component {...template.fields} />
          </div>
        </div>
      </main>
      <div class="w-[300px]">
        <Sidebar bind:template {templateElement} {templateName} />
      </div>
    </div>
  {/if}
{:catch error}
  <TemplateError templateName={data.templateName} {error} />
{/await}
