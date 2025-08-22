<script module>
  import { z } from "zod";

  export const schema = z.object({
    name: z.string().default("Default Name"),
    email: z.string().email().default("user@example.com"),
  });

  export type ProfileProps = z.infer<typeof schema>;
</script>

<script lang="ts">
  let { name, email }: ProfileProps = $props();
</script>

<div class="bg-white p-4">
  <h1>{name}</h1>
  <p>{email}</p>
</div>
