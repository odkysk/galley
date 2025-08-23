<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { ImageFrame } from "$lib/models/template.js";

  let {
    src,
    frame = { zoom: 1, x: 0, y: 0 },
    class: className = "",
    ...rest
  }: {
    src: string;
    frame?: ImageFrame;
    class?: string;
  } & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class="overflow-hidden {className}" {...rest}>
  {#if src}
    <img
      {src}
      alt=""
      class="w-full h-full object-cover"
      style="transform: scale({frame.zoom}) translate({frame.x}px, {frame.y}px); transform-origin: center center;"
    />
  {/if}
</div>
