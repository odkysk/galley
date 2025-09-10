<script module>
  import { createTemplateModule } from "../lib/utils/createTemplateModule.js";

  export const { config, Props } = createTemplateModule({
    fields: {
      title: { type: "text", maxLength: 50 },
      description: {
        type: "textarea",
        maxLength: 200,
        rows: 12,
      },
      image: { type: "image" },
      image2: { type: "image" },
      image3: { type: "image" },
    },
  });
</script>

<script lang="ts">
  import TemplateImage from "$lib/components/ui/TemplateImage.svelte";

  let { title, description, image, image2, image3 }: typeof Props = $props();
</script>

<div class="bg-gray-300 p-4 flex w-[480px] h-[360px]">
  <div class="flex-1">
    <h1>{title.value}</h1>
    <p class="w-full whitespace-pre-line">{description.value}</p>
  </div>
  <TemplateImage field={image} class="flex-1 h-full rounded" />
  <img src={image2.value} alt="" class="flex-1 h-full rounded" />
  <TemplateImage field={image3} class="flex-1 h-full rounded" />
</div>
