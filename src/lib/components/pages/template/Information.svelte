<script lang="ts">
  import type { Template } from "$lib/models/template";

  let { template }: { template: Template } = $props();
</script>

<h1 class="text-2xl font-semibold">{template.name}</h1>
{#if template.size}
  <p class="text-xs text-gray-500">
    {template.size.width} x {template.size.height}
  </p>
{/if}
