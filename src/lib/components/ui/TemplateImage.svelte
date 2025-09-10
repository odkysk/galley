<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { ImageFrame } from "$lib/models/template.js";

  let {
    field,
    class: className = "",
    ...rest
  }: {
    field: import("$lib/models/template.js").ImageField;
    class?: string;
  } & HTMLAttributes<HTMLDivElement> = $props();

  // Mark this field as being used by TemplateImage immediately
  if (field) {
    field._usedByTemplateImage = true;
  }
</script>

<div class="overflow-hidden {className}" {...rest}>
  {#if field.value}
    <img
      src={field.value}
      alt=""
      class="w-full h-full object-cover"
      style="transform: scale({field.frame?.zoom || 1}); transform-origin: center center; object-position: {field.frame?.x || 0}px {field.frame?.y || 0}px; mix-blend-mode: {field.blendMode || 'normal'};"
    />
  {/if}
</div>
