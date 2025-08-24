<script module>
  import { createTemplateModule } from "@galley/core/utils";

  export const { config } = createTemplateModule({
    fields: {
      title: { type: "text", value: "Demo Card", maxLength: 30 },
      subtitle: { type: "text", value: "Created with Galley", maxLength: 50 },
      description: {
        type: "textarea", 
        value: "This is a demo template showing the power of Galley's template system.",
        maxLength: 150,
        rows: 3
      },
      heroImage: { type: "image", value: "" },
      backgroundColor: { type: "text", value: "#f8fafc" },
    },
    size: {
      width: 600,
      height: 400,
    },
  });

  export type Props = typeof config.fields;
</script>

<script lang="ts">
  import { TemplateImage } from "@galley/core/components";
  import type { ImageField } from "@galley/core/models";

  let { title, subtitle, description, heroImage, backgroundColor }: Props = $props();
  
  const imageField = heroImage as ImageField;
</script>

<div
  class="relative overflow-hidden rounded-lg shadow-lg"
  style="width: {config.size!.width}px; height: {config.size!.height}px; background-color: {backgroundColor.value};"
>
  {#if heroImage.value}
    <div class="absolute top-0 left-0 w-full h-1/2">
      <TemplateImage
        {imageField}
        class="w-full h-full object-cover"
      />
    </div>
  {/if}
  
  <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
    <h1 class="text-2xl font-bold mb-2">{title.value}</h1>
    <h2 class="text-lg font-medium mb-3 text-gray-200">{subtitle.value}</h2>
    <p class="text-sm leading-relaxed text-gray-300">{description.value}</p>
  </div>
  
  {#if !heroImage.value}
    <div class="flex items-center justify-center h-full">
      <div class="text-center p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-3">{title.value}</h1>
        <h2 class="text-xl text-gray-600 mb-4">{subtitle.value}</h2>
        <p class="text-gray-700 leading-relaxed">{description.value}</p>
      </div>
    </div>
  {/if}
</div>