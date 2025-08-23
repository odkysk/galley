<script lang="ts">
  import type { Component as SvelteComponent } from "svelte";

  let {
    Component,
    templateProps,
    templateElement = $bindable(),
  }: {
    Component: SvelteComponent;
    templateProps: any;
    templateElement: HTMLElement | undefined;
  } = $props();
</script>

<div
  class="bg-gray-200 p-3 w-full flex-1 flex items-center justify-center border border-gray-300 rounded-md"
>
  <div bind:this={templateElement}>
    <Component {...templateProps} />
  </div>
</div>
