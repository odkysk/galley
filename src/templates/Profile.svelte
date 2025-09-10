<script module>
  import { createTemplateModule } from "../lib/utils/createTemplateModule.js";

  const { config } = createTemplateModule({
    fields: {
      name: { type: "text", value: "Default Name" },
      email: { type: "text", value: "user@example.com" },
      image: { type: "image", value: "" },
    },
  });

  export { config };
  export type ProfileProps = typeof config.fields;
</script>

<script lang="ts">
  let { name, email, image }: ProfileProps = $props();
</script>

<div class="bg-white p-4 flex flex-col items-center">
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
