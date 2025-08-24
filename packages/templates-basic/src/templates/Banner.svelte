<script module>
  import { createTemplateModule } from "@galley/core/utils";

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
  import { TemplateImage } from "@galley/core/components";
  import type { ImageField } from "@galley/core/models";

  let { title, description, image }: Props = $props();
  
  // Type assertion to ensure image is ImageField
  const imageField = image as ImageField;
</script>

<div
  class="bg-gray-300 p-4 flex"
  style="width: {config.size!.width}px; height: {config.size!.height}px"
>
  <div class="flex-1">
    <h1>{title.value}</h1>
    <p>{description.value}</p>
  </div>
  <TemplateImage
    imageField={imageField}
    class="flex-1 h-full rounded"
  />
</div>
