<script module>
  import { createTemplateModule } from "../lib/utils/createTemplateModule.js";

  export const { config } = createTemplateModule({
    fields: {
      title: { type: "text", value: "Default title", maxLength: 50 },
      description: {
        type: "textarea",
        value: "Default Description",
        maxLength: 200,
        rows: 4,
      },
      image: { type: "image", value: "" },
    },
    size: {
      width: 400,
      height: 200,
    },
  });

  export type Props = typeof config.fields;
</script>

<script lang="ts">
  import TemplateImage from "$lib/components/ui/TemplateImage.svelte";

  let { title, description, image }: Props = $props();

  // Type assertion to ensure image has frame property
  const imageField = image as typeof image & {
    frame: import("$lib/models/template.js").ImageFrame;
  };
</script>

<div
  class="bg-gray-300 p-4 flex"
  style="width: {config.size!.width}px; height: {config.size!.height}px"
>
  <div class="flex-1">
    <h1>{title.value}</h1>
    <p>{description.value}</p>
  </div>
  {#if image.value}
    <TemplateImage
      src={image.value}
      frame={imageField.frame}
      class="flex-1 h-full rounded"
    />
  {/if}
</div>
