<script lang="ts">
  import TemplateSelector from "$lib/components/TemplateSelector.svelte";
  import "../app.css";
  let { children } = $props();
</script>

<TemplateSelector />
<main class="w-full">
  {@render children?.()}
</main>
