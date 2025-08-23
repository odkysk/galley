<script module>
  import { z } from "zod";
  import { SingleLineTextSchema, MultiLineTextSchema } from "../lib/schemas/textContent.js";
  import { createTemplateModule } from "../lib/utils/createTemplateModule.js";

  export const { config } = createTemplateModule({
    schema: {
      title: SingleLineTextSchema.default({
        type: "single",
        value: "Default Title",
        maxLength: 50,
      }),
      description: MultiLineTextSchema.default({
        type: "multi",
        value: "Default Description",
        maxLength: 200,
        maxLines: 4,
      }),
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
    <h1>{title.value}</h1>
    <p>{description.value}</p>
  </div>
  {#if image}
    <img
      src={image}
      alt="Banner"
      class="flex-1 h-full object-cover rounded overflow-hidden"
    />
  {/if}
</div>
