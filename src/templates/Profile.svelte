<script module>
  import { z } from "zod";
  import { createTemplateModule } from "../lib/utils/createTemplateModule.js";
  import { createStringProp, createImageProp } from "../lib/schemas/template.js";

  const { config } = createTemplateModule({
    props: {
      name: createStringProp({
        value: "Default Name",
      }),
      email: createStringProp({
        value: "user@example.com",
        validation: "email",
      }),
      image: createImageProp(""),
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
  {#if image.value}
    <img
      src={image.value}
      alt="Profile"
      class="w-20 h-20 object-cover rounded-full mb-4"
    />
  {/if}
  <h1 class="text-xl font-bold">{name.value}</h1>
  <p class="text-gray-600">{email.value}</p>
</div>
