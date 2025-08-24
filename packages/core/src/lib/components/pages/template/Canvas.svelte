<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<div
  class="bg-gray-200 p-3 w-full flex-1 flex items-center justify-center border border-gray-300 rounded-md overflow-scroll"
>
  {@render children()}
</div>
