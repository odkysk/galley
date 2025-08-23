<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import type { ImageFrame } from "$lib/models/template.js";
  import Crop from "@lucide/svelte/icons/crop";
  import FileImage from "@lucide/svelte/icons/file-image";
  import RefreshCcw from "@lucide/svelte/icons/refresh-ccw";
  import FrameControls from "./FrameControls.svelte";

  let {
    value = $bindable(),
    frame = $bindable(),
  }: {
    value?: string | null;
    frame?: ImageFrame;
  } = $props();

  let fileInput: HTMLInputElement;

  function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      value = URL.createObjectURL(file);
    }
  }

  // Initialize frame with default values if not provided
  frame = frame || { zoom: 1, x: 0, y: 0, blendMode: "normal" };
</script>

<div class="flex gap-1">
  <input
    bind:this={fileInput}
    type="file"
    accept="image/*"
    class="hidden"
    onchange={handleFileSelect}
  />
  {#if value}
    <div class="w-9 h-9 overflow-hidden rounded-md relative group">
      <img src={value} alt="Preview" class="size-full object-cover" />
      <div
        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Button size="icon" variant="outline" onclick={() => fileInput.click()}>
          <RefreshCcw />
        </Button>
      </div>
    </div>
  {:else}
    <Button size="icon" variant="outline" onclick={() => fileInput.click()}>
      <FileImage />
    </Button>
  {/if}
  <Popover.Root>
    <Popover.Trigger disabled={!value}>
      <Button variant="outline" size="icon" disabled={!value}>
        <Crop />
      </Button>
    </Popover.Trigger>
    <Popover.Content side="right" class="w-auto">
      {#if frame}
        <FrameControls bind:frame />
      {/if}
    </Popover.Content>
  </Popover.Root>
</div>
