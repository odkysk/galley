<script module>
  import { createTemplateModule } from "../lib/utils/createTemplateModule.js";

  export const { config } = createTemplateModule({
    fields: {
      title: { type: "text", maxLength: 50 },
      description: {
        type: "textarea",
        maxLength: 200,
        rows: 12,
      },
      image: { type: "image" },
    },
    size: {
      width: 400,
      height: 200,
    },
  });
</script>

<script lang="ts">
  import TemplateImage from "$lib/components/ui/TemplateImage.svelte";

  let { title, description, image }: typeof config.fields = $props();
</script>

<div
  class="bg-gray-300 p-4 flex"
  style="width: {config.size!.width}px; height: {config.size!.height}px"
>
  <div class="flex-1">
    <h1>{title.value}</h1>
    <p class="w-full whitespace-pre-line">{description.value}</p>
  </div>
  <TemplateImage imageField={image as import('$lib/models/template.js').ImageField} class="flex-1 h-full rounded" />
</div>
