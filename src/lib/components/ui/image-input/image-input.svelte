<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";

  let {
    value = $bindable(),
    placeholder = "Choose an image...",
    disabled = false,
    class: className = ""
  }: {
    value?: string | null;
    placeholder?: string;
    disabled?: boolean;
    class?: string;
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
      fileInput.value = '';
    }
  }
</script>

<div class="space-y-2 {className}">
  <input
    bind:this={fileInput}
    type="file"
    accept="image/*"
    {disabled}
    class="hidden"
    onchange={handleFileSelect}
  />

  {#if value}
    <div class="space-y-2">
      <img
        src={value}
        alt="Preview"
        class="w-full h-32 object-cover rounded border"
      />
      <Button
        variant="outline"
        size="sm"
        onclick={clearImage}
        {disabled}
      >
        Remove
      </Button>
    </div>
  {:else}
    <Button
      variant="outline"
      onclick={() => fileInput.click()}
      {disabled}
    >
      {placeholder}
    </Button>
  {/if}
</div>