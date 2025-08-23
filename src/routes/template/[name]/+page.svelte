<script lang="ts">
  import Canvas from "$lib/components/pages/template/Canvas.svelte";
  import Export from "$lib/components/pages/template/Export.svelte";
  import Information from "$lib/components/pages/template/Information.svelte";
  import Skeleton from "$lib/components/pages/template/Skeleton.svelte";
  import TemplateError from "$lib/components/pages/template/TemplateError.svelte";
  import TemplateForm from "$lib/components/pages/template/TemplateForm.svelte";
  import type { Template } from "$lib/models/template";
  import { getTemplate } from "$lib/utils/templates";

  let { data } = $props();
  let templateName = $derived(data.templateName);
  let template = $state<Template | null>(null);
  let templateElement = $state<HTMLElement>();

  let loadTemplate = async () => {
    const loadedTemplate = await getTemplate(templateName);
    if (!loadedTemplate)
      throw new Error(`Template "${templateName}" not found`);
    template = loadedTemplate;
    return loadedTemplate;
  };
</script>

<div class="flex-1 max-w-full">
  {#await loadTemplate()}
    <Skeleton />
  {:then loadedTemplate}
    {@const Component = loadedTemplate.component}
    <div
      class="flex min-h-dvh flex-1 flex-col gap-3 p-3 items-start max-w-full"
    >
      <Information template={loadedTemplate} />
      {#if template}
        <TemplateForm bind:template />
        <Canvas>
          <div bind:this={templateElement}>
            <Component {...template.props} />
          </div>
        </Canvas>
        <Export
          {templateElement}
          {templateName}
          templateProps={template.props}
        />
      {/if}
    </div>
  {:catch error}
    <TemplateError templateName={data.templateName} {error} />
  {/await}
</div>
