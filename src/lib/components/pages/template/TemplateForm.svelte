<script lang="ts">
  import { ImageInput } from "$lib/components/ui/ImageInput";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import type { Template, TemplateProp } from "$lib/models/template";

  let {
    template = $bindable(),
  }: {
    template: Template;
  } = $props();

  const isTemplateProp = (value: any): value is TemplateProp => {
    return (
      value && typeof value === "object" && "type" in value && "value" in value
    );
  };
</script>

<div class="flex gap-3">
  {#each Object.keys(template.props) as key}
    <div class="flex flex-col gap-1">
      {#if isTemplateProp(template.props[key])}
        <Label for={key}>{key}</Label>
        {#if template.props[key].type === "image"}
          <ImageInput bind:value={template.props[key].value} />
        {:else if template.props[key].type === "text"}
          <Input
            id={key}
            bind:value={template.props[key].value}
            maxlength={template.props[key].maxLength}
          />
        {:else if template.props[key].type === "textarea"}
          <Textarea
            id={key}
            bind:value={template.props[key].value}
            rows={template.props[key].rows}
            maxlength={template.props[key].maxLength}
          />
        {:else if template.props[key].type === "email"}
          <Input id={key} bind:value={template.props[key].value} type="email" />
        {/if}
      {/if}
    </div>
  {/each}
</div>
