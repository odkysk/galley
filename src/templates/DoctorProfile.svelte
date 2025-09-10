<script module>
  import { createTemplateModule } from "../lib/utils/createTemplateModule.js";

  export const { config } = createTemplateModule({
    fields: {
      name: { type: "text", value: "医師名", maxLength: 20 },
      birthdate: { type: "text", value: "1990年1月1日", maxLength: 30 },
      hometown: { type: "text", value: "東京都", maxLength: 20 },
      specialty: { type: "text", value: "内科", maxLength: 50 },
      healthValues: {
        type: "textarea",
        value: "健康的な生活習慣を心がけています",
        maxLength: 150,
        rows: 4,
      },
      motivation: {
        type: "textarea",
        value: "患者さんの健康をサポートしたいという想いから",
        maxLength: 300,
        rows: 6,
      },
      hobbies: { type: "text", value: "読書・散歩", maxLength: 50 },
      mainImage: { type: "image", value: "" },
      subImage: { type: "image", value: "" },
    },
    size: {
      width: 900,
      height: 600,
    },
  });

  export type Props = typeof config.fields;
</script>

<script lang="ts">
  import TemplateImage from "$lib/components/ui/TemplateImage.svelte";

  let {
    name,
    birthdate,
    hometown,
    specialty,
    healthValues,
    motivation,
    hobbies,
    mainImage,
    subImage,
  }: Props = $props();

  // Type assertions for image fields
  const mainImageField =
    mainImage as import("$lib/models/template.js").ImageField;
  const subImageField =
    subImage as import("$lib/models/template.js").ImageField;
</script>

<div
  class="bg-gray-100 p-6 flex gap-6"
  style="width: {config.size!.width}px; height: {config.size!.height}px"
>
  <!-- Profile Section (Left Column) -->
  <div class="flex-1 flex flex-col gap-2.5">
    <!-- Name Container -->
    <div class="flex flex-col gap-2.5">
      <h1 class="color-gray-800 text-headline">
        {name.value}
      </h1>
    </div>

    <!-- Details Container -->
    <div class="flex flex-col flex-1">
      <div class="flex gap-2.5 items-center text-body">
        <span class="text-gray-500">生年月日</span>
        <span class="text-gray-900">{birthdate.value}</span>
      </div>
      <div class="flex gap-2.5 items-center text-body">
        <span class="text-gray-500">出身地</span>
        <span class="text-gray-900">{hometown.value}</span>
      </div>
      <div class="flex gap-2.5 items-center text-body">
        <span class="text-gray-500">専門領域</span>
        <span class="text-gray-900">{specialty.value}</span>
      </div>
    </div>

    <!-- Health Section -->
    <div class="flex flex-col gap-2.5">
      <div class="flex-1 flex flex-col text-body">
        <div class="text-gray-500">健康において大事にしてること</div>
        <div class="text-gray-900 flex-1 whitespace-pre-line">
          {healthValues.value}
        </div>
      </div>
    </div>
  </div>

  <!-- Images Section (Center Column) -->
  <div class="flex-1 flex flex-col gap-6">
    <div class="flex-1 rounded-xl overflow-hidden">
      <TemplateImage
        imageField={mainImageField}
        class="w-full h-full object-cover"
      />
    </div>
    {#if subImage.value}
      <div class="h-64 rounded-xl overflow-hidden">
        <TemplateImage
          imageField={subImageField}
          class="w-full h-full object-cover"
        />
      </div>
    {/if}
  </div>

  <!-- Personal Story Section (Right Column) -->
  <div class="flex-1 flex flex-col text-body">
    <div class="text-gray-500">パーソナルドクターになったきっかけ</div>
    <div class="flex-1 text-gray-900 whitespace-pre-line">
      {motivation.value}
    </div>
    <div class="text-gray-500">趣味</div>
    <div class="text-gray-900">{hobbies.value}</div>
  </div>
</div>
