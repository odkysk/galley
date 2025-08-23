<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import Frame from "@lucide/svelte/icons/frame";
  import Upload from "@lucide/svelte/icons/upload";
  import FrameControls from "./FrameControls.svelte";

  let {
    value = $bindable(),
  }: {
    value?: string | null;
  } = $props();

  let fileInput: HTMLInputElement;

  function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      value = URL.createObjectURL(file);
    }
  }

  function clearImage() {
    if (value) {
      URL.revokeObjectURL(value);
    }
    value = null;
    if (fileInput) {
      fileInput.value = "";
    }
  }
  let frame = $state({
    zoom: 1,
    x: 0,
    y: 0,
  });
</script>

<div class="flex gap-1">
  <input
    bind:this={fileInput}
    type="file"
    accept="image/*"
    class="hidden"
    onchange={handleFileSelect}
  />

  <button
    class="w-9 h-9 rounded overflow-hidden border rounded-md"
    onclick={() => fileInput.click()}
  >
    {#if value}
      <img src={value} alt="Preview" class="size-full object-cover" />
    {:else}
      <div class="size-full bg-gray-100"></div>
    {/if}
  </button>
  <Button variant="outline" onclick={() => fileInput.click()}>
    <Upload />
  </Button>
  <Popover.Root open>
    <Popover.Trigger>
      <Button variant="outline" size="icon" onclick={clearImage}>
        <Frame />
      </Button>
    </Popover.Trigger>
    <Popover.Content side="right">
      <FrameControls bind:frame />
    </Popover.Content>
  </Popover.Root>
</div>
