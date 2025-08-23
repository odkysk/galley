<script module>
  import { z } from "zod";
  import { createTemplateModule } from "../lib/utils/createTemplateModule.js";

  const { config } = createTemplateModule({
    schema: {
      name: z.string().default("Default Name"),
      email: z.string().email().default("user@example.com"),
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
  let { name, email }: ProfileProps = $props();
</script>

<div
  class="bg-white p-4"
  style="width: {config.size!.width}px; height: {config.size!.height}px"
>
  <h1>{name}</h1>
  <p>{email}</p>
</div>
