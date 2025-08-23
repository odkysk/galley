<script lang="ts">
  import { ImageInput } from "$lib/components/ui/ImageInput";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
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
      "value" in value
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
        <Label for={key}>{key}</Label>
        {#if templateProps[key].type === "single"}
          <Input
            id={key}
            bind:value={templateProps[key].value}
            maxlength={templateProps[key].maxLength}
          />
        {:else if templateProps[key].type === "multi"}
          <Textarea
            id={key}
            bind:value={templateProps[key].value}
            rows={templateProps[key].maxLines}
            maxlength={templateProps[key].maxLength}
          />
        {/if}
      {/if}
    </div>
  {/each}
</div>
