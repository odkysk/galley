<script module>
  import { z } from "zod";
  import { createTemplateModule } from "../lib/utils/createTemplateModule.js";

  export const { config } = createTemplateModule({
    schema: {
      title: z.string().default("Default Title"),
      description: z.string().default("Default Description"),
      image: z.string().default(""),
    },
    size: {
      width: 400,
      height: 200,
    },
  });

  export type Props = z.infer<NonNullable<typeof config.schema>>;
</script>

<script lang="ts">
  let { title, description, image }: Props = $props();
</script>

<div
  class="bg-gray-300 p-4 flex"
  style="width: {config.size!.width}px; height: {config.size!.height}px"
>
  <div class="flex-1">
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
  {#if image}
    <img
      src={image}
      alt="Banner"
      class="flex-1 h-full object-cover rounded overflow-hidden"
    />
  {/if}
</div>
