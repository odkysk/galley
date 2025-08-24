<script module>
  import { createTemplateModule } from "@galley/core/utils";

  const { config } = createTemplateModule({
    fields: {
      name: { type: "text", value: "Default Name" },
      email: { type: "email", value: "user@example.com" },
      image: { type: "image", value: "" },
    },
    size: {
      width: 400,
      height: 300,
    }
  });

  export { config };
  export type ProfileProps = typeof config.fields;
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
