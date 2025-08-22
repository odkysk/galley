<script module>
  import { z } from "zod";

  export const schema = z.object({
    title: z.string().default("Default Title"),
    description: z.string().default("Default Description"),
  });

  export type BannerProps = z.infer<typeof schema>;
</script>

<script lang="ts">
  let { title, description }: BannerProps = $props();
</script>

<div class="bg-gray-300 p-4 h-[100px] w-[300px]">
  <h1>{title}</h1>
  <p>{description}</p>
</div>
