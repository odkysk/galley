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
  let frameWidth = $state(0);
  let frameHeight = $state(0);
  let frameRatio = $derived(frameWidth / frameHeight || 1);

  // 画像サイズを取得するためのstate
  let imageWidth: number = $state(0);
  let imageHeight: number = $state(0);
  let imageRatio: number = $derived(imageWidth / imageHeight || 1);

  let fittingEdge = $derived(frameRatio > imageRatio ? "width" : "height");

  let imageStyle = $derived(`
  max-width: none;
  max-height: none;
   ${fittingEdge === "height" ? "height: 100%; " : "width: 100%;"}
   aspect-ratio: ${imageRatio};
    transform: translate(
      ${field.frame?.x ?? 0}px, 
      ${field.frame?.y ?? 0}px
    ) scale(${field.frame?.zoom ?? 1});
    transform-origin: center center;
    mix-blend-mode: ${field.blendMode ?? "normal"};
  `);

  // 画像の読み込みが完了したらサイズを取得
  function handleImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    imageWidth = img.naturalWidth;
    imageHeight = img.naturalHeight;
  }
</script>

<div
  bind:clientWidth={frameWidth}
  bind:clientHeight={frameHeight}
  class="relative overflow-hidden bg-red-200 w-full h-full {className}"
  {...rest}
>
  {#if field.value}
    <img
      onload={handleImageLoad}
      src={field.value}
      alt=""
      class="absolute object-cover"
      style={imageStyle}
    />
  {/if}
</div>
