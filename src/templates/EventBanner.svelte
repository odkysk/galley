<script module>
  import { createTemplateModule } from "../lib/utils/createTemplateModule.js";

  export const { config } = createTemplateModule({
    fields: {
      title: { type: "text", value: "イベント名", maxLength: 20 },
      description: { type: "text", value: "イベント説明", maxLength: 100 },
      date: { type: "text", value: "2025年1月1日", maxLength: 20 },
      location: { type: "text", value: "東京都新宿区", maxLength: 20 },
      image: { type: "image", value: "" },
    },
  });

  export type Props = typeof config.fields;
</script>

<script lang="ts">
  import FramedImage from "$lib/components/ui/FramedImage.svelte";

  let { title, description, date, location, image }: Props = $props();

  // Type assertions for image fields
  const imageField = image as import("$lib/models/template.js").ImageField;
</script>

<div class="canvas">
  <div class="image-container">
    <FramedImage field={imageField} />
  </div>
  <div class="content">
    <div class="date-location">
      {#if date.value}
        <p class="date">
          {date.value}
        </p>
      {/if}
      {#if location.value}
        <p class="location">
          @{location.value}
        </p>
      {/if}
    </div>
    {#if description.value}
      <p class="description">
        {description.value}
      </p>
    {/if}
    <h1 class="title">{title.value}</h1>
  </div>
</div>

<style>
  .canvas {
    position: relative;
    width: 800px;
    height: 450px;
    background-color: --color-neutral-900;
    color: white;
    padding: 24px;
    display: flex;
    flex-direction: column;
    z-index: 0;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    gap: 6px;
  }
  .title {
    font-size: 48px;
    line-height: 100%;
    text-align: center;
  }
  .description {
    font-size: 24px;
    text-align: center;
  }
  .image-container {
    object-fit: contain;
    position: absolute;
    inset: 0;
    z-index: -1;
  }
  .date-location {
    display: flex;
    gap: 12px;
  }
</style>
