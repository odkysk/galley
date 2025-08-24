<script lang="ts">
  import {
    Canvas,
    Export,
    Information,
    Skeleton,
    TemplateError,
    TemplateForm
  } from '@galley/core/components';
  import { getTemplate } from '@galley/core/utils';
  import type { Template } from '@galley/core/models';

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

<svelte:head>
  <title>{templateName} - Galley</title>
</svelte:head>

<div class="flex-1 max-w-full">
  {#await loadTemplate()}
    <Skeleton />
  {:then loadedTemplate}
    {@const Component = loadedTemplate.component}
    <div class="flex min-h-dvh flex-1 flex-col gap-3 p-3 items-start max-w-full">
      <Information template={loadedTemplate} />
      {#if template}
        <TemplateForm bind:template />
        <Canvas>
          <div bind:this={templateElement}>
            <Component {...template.fields} />
          </div>
        </Canvas>
        <Export
          {templateElement}
          {templateName}
          templateFields={template.fields}
        />
      {/if}
    </div>
  {:catch error}
    <TemplateError templateName={data.templateName} {error} />
  {/await}
</div>