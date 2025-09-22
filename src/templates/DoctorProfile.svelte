<script module>
  import { createTemplateModule } from "../lib/utils/createTemplateModule.js";

  export const { config } = createTemplateModule({
    fields: {
      name: { type: "text", value: "氏名", maxLength: 20 },
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
  });

  export type Props = typeof config.fields;
</script>

<script lang="ts">
  import FramedImage from "$lib/components/ui/FramedImage.svelte";

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

<div class="bg-neutral-100 p-6 flex gap-4 w-[900px] h-[600px]">
  <!-- Profile Section (Left Column) -->
  <div class="flex-1 flex flex-col gap-3">
    <!-- Name Container -->
    <div class="flex flex-col gap-2.5">
      <h1 class="text-neutral-800 text-headline">
        {name.value}
      </h1>
    </div>

    <!-- Details Container -->
    <div class="flex flex-col flex-1 gap-1">
      <div class="flex gap-2.5 items-start text-body">
        <span class="text-neutral-500 text-body w-20">生年月日</span>
        <span class="text-neutral-800 flex-1">{birthdate.value}</span>
      </div>
      <div class="flex gap-2.5 items-start text-body">
        <span class="text-neutral-500 text-body w-20">出身地</span>
        <span class="text-neutral-800 flex-1">{hometown.value}</span>
      </div>
      <div class="flex gap-2.5 items-start text-body">
        <span class="text-neutral-500 text-body w-20">専門領域</span>
        <span class="text-neutral-800 flex-1">{specialty.value}</span>
      </div>
    </div>

    <!-- Health Section -->
    <div class="flex flex-col gap-2.5">
      <div class="flex-1 flex flex-col text-body">
        <div class="text-neutral-500 text-body">
          健康において大事にしてること
        </div>
        <div class="text-neutral-800 flex-1 whitespace-pre-line text-body">
          {healthValues.value}
        </div>
      </div>
    </div>
  </div>

  <!-- Images Section (Center Column) -->
  <div class="flex-1 flex flex-col gap-6">
    <div class="flex-1 rounded-xl overflow-hidden">
      <FramedImage field={mainImageField} class="w-full h-full object-cover" />
    </div>
    {#if subImage.value}
      <div class="h-64 rounded-xl overflow-hidden">
        <FramedImage field={subImageField} class="w-full h-full object-cover" />
      </div>
    {/if}
  </div>

  <!-- Personal Story Section (Right Column) -->
  <div class="flex-1 flex flex-col">
    <div class="text-neutral-500 text-body">
      パーソナルドクターになったきっかけ
    </div>
    <div class="flex-1 text-neutral-800 whitespace-pre-line text-body">
      {motivation.value}
    </div>
    <div class="text-neutral-500 text-body">趣味</div>
    <div class="text-neutral-800 text-body">{hobbies.value}</div>
  </div>
</div>
