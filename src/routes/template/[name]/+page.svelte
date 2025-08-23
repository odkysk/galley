<script lang="ts">
  import Canvas from "$lib/components/pages/template/Canvas.svelte";
  import Export from "$lib/components/pages/template/Export.svelte";
  import Information from "$lib/components/pages/template/Information.svelte";
  import Skeleton from "$lib/components/pages/template/Skeleton.svelte";
  import TemplateError from "$lib/components/pages/template/TemplateError.svelte";
  import TemplateForm from "$lib/components/pages/template/TemplateForm.svelte";
  import { getTemplate } from "$lib/utils/templates";

  let { data } = $props();
  let templateName = $derived(data.templateName);
  let templateProps = $state<any>({});
  let templateElement = $state<HTMLElement>();

  let loadTemplate = async () => {
    const template = await getTemplate(templateName);
    templateProps = template?.props ?? {};
    if (!template) throw new Error(`Template "${templateName}" not found`);
    return template;
  };
</script>

<div class="flex-1 max-w-full">
  {#await loadTemplate()}
    <Skeleton />
  {:then template}
    {@const Component = template.component}
    <div
      class="flex min-h-dvh flex-1 flex-col gap-3 p-3 items-start max-w-full"
    >
      <Information {template} />
      <TemplateForm bind:templateProps />
      <Canvas>
        <div bind:this={templateElement}><Component {...templateProps} /></div>
      </Canvas>
      <Export {templateElement} {templateName} {templateProps} />
    </div>
  {:catch error}
    <TemplateError templateName={data.templateName} {error} />
  {/await}
</div>
