<script lang="ts">
  import { ImageInput } from "$lib/components/ui/ImageInput";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import type { Template } from "$lib/models/template";

  let {
    template = $bindable(),
  }: {
    template: Template;
  } = $props();
  $inspect(template);
</script>

<div class="flex flex-col gap-3">
  {#each Object.keys(template.fields) as key}
    {@const field = template.fields[key]}
    <div class="flex flex-col gap-1">
      <Label for={key}>{key}</Label>
      {#if field.type === "image"}
        <ImageInput
          bind:value={field.value}
          bind:frame={field.frame}
          bind:blendMode={field.blendMode}
          {field}
        />
      {:else if field.type === "text"}
        <Input
          class="w-full"
          id={key}
          bind:value={field.value}
          maxlength={field.maxLength}
        />
      {:else if field.type === "textarea"}
        <Textarea
          class="resize-none w-full"
          id={key}
          bind:value={field.value}
          rows={field.rows}
          maxlength={field.maxLength}
        />
      {/if}
    </div>
  {/each}
</div>
