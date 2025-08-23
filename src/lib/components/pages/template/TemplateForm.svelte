<script lang="ts">
  import { ImageInput } from "$lib/components/ui/ImageInput";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import type { Template } from "$lib/models/template";
  import type { TextContent } from "$lib/schemas/textContent";

  let {
    template = $bindable(),
  }: {
    template: Template;
  } = $props();

  const isTextContent = (value: any): value is TextContent => {
    return (
      value &&
      typeof value === "object" &&
      "type" in value &&
      (value.type === "single" || value.type === "multi") &&
      "value" in value
    );
  };
</script>

<div class="flex gap-3">
  {#each Object.keys(template.props) as key}
    <div class="flex flex-col gap-1">
      {#if key === "image"}
        <Label for={key}>{key}</Label>
        <ImageInput bind:value={template.props[key]} />
      {:else if isTextContent(template.props[key])}
        <Label for={key}>{key}</Label>
        {#if template.props[key].type === "single"}
          <Input
            id={key}
            bind:value={template.props[key].value}
            maxlength={template.props[key].maxLength}
          />
        {:else if template.props[key].type === "multi"}
          <Textarea
            id={key}
            bind:value={template.props[key].value}
            rows={template.props[key].maxLines}
            maxlength={template.props[key].maxLength}
          />
        {/if}
      {/if}
    </div>
  {/each}
</div>
