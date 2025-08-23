<script lang="ts">
  import { ImageInput } from "$lib/components/ui/ImageInput";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import type { TextContent } from "$lib/schemas/textContent";
  import { isMultiLine, isSingleLine } from "$lib/schemas/textContent";
  import type { ComponentProps } from "svelte";

  let {
    templateProps = $bindable(),
  }: {
    templateProps: ComponentProps<any>;
  } = $props();

  const isTextContent = (value: any): value is TextContent => {
    return (
      value &&
      typeof value === "object" &&
      "type" in value &&
      (value.type === "single" || value.type === "multi") &&
      "value" in value &&
      "label" in value
    );
  };
</script>

<div class="flex gap-3">
  {#each Object.keys(templateProps) as key}
    <div class="flex flex-col gap-1">
      {#if key === "image"}
        <Label for={key}>{key}</Label>
        <ImageInput bind:value={templateProps[key]} />
      {:else if isTextContent(templateProps[key])}
        <Label for={key}>{templateProps[key].label}</Label>
        {#if isSingleLine(templateProps[key])}
          <Input
            id={key}
            bind:value={templateProps[key].value}
            maxlength={100}
          />
        {:else if isMultiLine(templateProps[key])}
          <Textarea
            id={key}
            bind:value={templateProps[key].value}
            rows={templateProps[key].maxLines}
            maxlength={500}
          />
        {/if}
      {:else}
        <Label for={key}>{key}</Label>
        <Input id={key} bind:value={templateProps[key]} />
      {/if}
    </div>
  {/each}
</div>
