<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { ImageFrame } from "$lib/models/template.js";

  let {
    imageField,
    class: className = "",
    ...rest
  }: {
    imageField: import("$lib/models/template.js").ImageField;
    class?: string;
  } & HTMLAttributes<HTMLDivElement> = $props();

  // Mark this imageField as being used by TemplateImage immediately
  if (imageField) {
    imageField._usedByTemplateImage = true;
  }
</script>

<div class="overflow-hidden {className}" {...rest}>
  {#if imageField.value}
    <img
      src={imageField.value}
      alt=""
      class="w-full h-full object-cover"
      style="transform: scale({imageField.frame?.zoom || 1}); transform-origin: center center; object-position: {imageField.frame?.x || 0}px {imageField.frame?.y || 0}px; mix-blend-mode: {imageField.blendMode || 'normal'};"
    />
  {/if}
</div>
