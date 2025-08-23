<script lang="ts">
  import { ImageInput } from "$lib/components/ui/ImageInput";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import type { ComponentProps } from "svelte";

  let {
    templateProps = $bindable(),
  }: {
    templateProps: ComponentProps<any>;
  } = $props();
</script>

<div class="flex gap-3">
  {#each Object.keys(templateProps) as key}
    <div class="flex flex-col gap-1">
      <Label for={key}>{key}</Label>
      {#if key === "image"}
        <ImageInput bind:value={templateProps[key]} />
      {:else}
        <Input id={key} bind:value={templateProps[key]} />
      {/if}
    </div>
  {/each}
</div>
