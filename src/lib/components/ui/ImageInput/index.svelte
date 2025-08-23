<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";

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
</script>

<div class="flex gap-1">
  <input
    bind:this={fileInput}
    type="file"
    accept="image/*"
    class="hidden"
    onchange={handleFileSelect}
  />

  <Button variant="outline" onclick={() => fileInput.click()}>Upload</Button>
  <button
    class="w-9 h-9 rounded overflow-hidden border"
    onclick={() => fileInput.click()}
  >
    {#if value}
      <img src={value} alt="Preview" class="size-full object-cover" />
    {:else}
      <div class="size-full bg-gray-100"></div>
    {/if}
  </button>
</div>
