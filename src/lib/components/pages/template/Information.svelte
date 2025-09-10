<script lang="ts">
  import type { Template } from "$lib/models/template";

  let { template }: { template: Template } = $props();
</script>

<h1 class="text-2xl">{template.name}</h1>
