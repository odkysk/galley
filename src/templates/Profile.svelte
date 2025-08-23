<script module>
  import { z } from "zod";
  import { createTemplateModule } from "../lib/utils/createTemplateModule.js";

  const { config } = createTemplateModule({
    schema: {
      name: z.string().default("Default Name"),
      email: z.string().email().default("user@example.com"),
      image: z.string().optional(),
    },
    size: {
      width: 400,
      height: 300,
    }
  });

  export { config };
  export type ProfileProps = z.infer<NonNullable<typeof config.schema>>;
</script>

<script lang="ts">
  let { name, email, image }: ProfileProps = $props();
</script>

<div
  class="bg-white p-4 flex flex-col items-center"
  style="width: {config.size!.width}px; height: {config.size!.height}px"
>
  {#if image}
    <img
      src={image}
      alt="Profile"
      class="w-20 h-20 object-cover rounded-full mb-4"
    />
  {/if}
  <h1 class="text-xl font-bold">{name}</h1>
  <p class="text-gray-600">{email}</p>
</div>
