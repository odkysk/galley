<script module>
  import { z } from "zod";
  import { createTemplateModule } from "../lib/utils/createTemplateModule.js";

  export const { config } = createTemplateModule(
    {
      title: z.string().default("Default Title"),
      description: z.string().default("Default Description"),
    },
    {
      width: 400,
      height: 200,
    }
  );

  export type Props = z.infer<NonNullable<typeof config.schema>>;
</script>

<script lang="ts">
  let { title, description }: Props = $props();
</script>

<div
  class="bg-gray-300 p-4"
  style="width: {config.size!.width}px; height: {config.size!.height}px"
>
  <h1>{title}</h1>
  <p>{description}</p>
</div>
