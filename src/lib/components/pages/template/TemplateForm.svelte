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
</script>

<div class="flex gap-3">
  {#each Object.keys(template.fields) as key}
    {@const field = template.fields[key]}
    <div class="flex flex-col gap-1">
      <Label for={key}>{key}</Label>
      {#if field.type === "image"}
        <ImageInput bind:value={field.value} bind:frame={field.frame} bind:blendMode={field.blendMode} imageField={field} />
      {:else if field.type === "text"}
        <Input id={key} bind:value={field.value} maxlength={field.maxLength} />
      {:else if field.type === "textarea"}
        <Textarea
          class="resize-none"
          id={key}
          bind:value={field.value}
          rows={field.rows}
          maxlength={field.maxLength}
        />
      {:else if field.type === "email"}
        <Input id={key} bind:value={field.value} type="email" />
      {/if}
    </div>
  {/each}
</div>
