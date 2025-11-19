<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  let {
    field,
    class: className = "",
    ...rest
  }: {
    field: import("$lib/models/template.js").ImageField;
    class?: string;
  } & HTMLAttributes<HTMLDivElement> = $props();

  // Mark this field as being used by FramedImage immediately
  if (field) {
    field._usedByFramedImage = true;
  }
</script>

<div class="relative overflow-hidden bg-red-200 {className}" {...rest}>
  {#if field.value}
    <img
      src={field.value}
      alt=""
      class="absolute w-full h-full object-cover"
      style="
        transform: scale({field.frame?.zoom || 1});
        transform-origin: center center; mix-blend-mode: {field.blendMode ||
        'normal'};
        object-position: {field.frame?.x || 0}px {field.frame?.y || 0}px;
        "
    />
  {/if}
</div>
