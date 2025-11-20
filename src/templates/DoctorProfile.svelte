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

<div class="container">
  <!-- Profile Section (Left Column) -->
  <div class="left-column">
    <!-- Name Container -->
    <div class="name-container">
      <h1 class="name">
        {name.value}
      </h1>
    </div>

    <!-- Details Container -->
    <div class="details-container">
      <div class="detail-row">
        <span class="detail-label">生年月日</span>
        <span class="detail-value">{birthdate.value}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">出身地</span>
        <span class="detail-value">{hometown.value}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">専門領域</span>
        <span class="detail-value">{specialty.value}</span>
      </div>
    </div>

    <!-- Health Section -->
    <div class="health-section">
      <div class="health-content">
        <div class="health-label">健康において大事にしてること</div>
        <div class="health-value">
          {healthValues.value}
        </div>
      </div>
    </div>
  </div>

  <!-- Images Section (Center Column) -->
  <div class="images-column">
    <div class="main-image-container">
      <FramedImage field={mainImageField} class="image" />
    </div>
    {#if subImage.value}
      <div class="sub-image-container">
        <FramedImage field={subImageField} class="image" />
      </div>
    {/if}
  </div>

  <!-- Personal Story Section (Right Column) -->
  <div class="right-column">
    <div class="motivation-label">パーソナルドクターになったきっかけ</div>
    <div class="motivation-value">
      {motivation.value}
    </div>
    <div class="hobbies-label">趣味</div>
    <div class="hobbies-value">{hobbies.value}</div>
  </div>
</div>

<style>
  .container {
    background-color: #f5f5f5;
    padding: 24px;
    display: flex;
    gap: 16px;
    width: 900px;
    height: 600px;
  }

  /* Left Column */
  .left-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .name-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .name {
    color: #3a3a3a;
    font-size: 32px;
    line-height: 36px;
  }

  .details-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 4px;
  }

  .detail-row {
    display: flex;
    gap: 10px;
    align-items: start;
    font-size: 16px;
    line-height: 28px;
  }

  .detail-label {
    color: #8f8f8f;
    font-size: 16px;
    line-height: 28px;
    width: 80px;
  }

  .detail-value {
    color: #3a3a3a;
    flex: 1;
  }

  .health-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .health-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    line-height: 28px;
  }

  .health-label {
    color: #8f8f8f;
    font-size: 16px;
    line-height: 28px;
  }

  .health-value {
    color: #3a3a3a;
    flex: 1;
    white-space: pre-line;
    font-size: 16px;
    line-height: 28px;
  }

  /* Images Column */
  .images-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .main-image-container {
    flex: 1;
    border-radius: 12px;
    overflow: hidden;
  }

  .sub-image-container {
    height: 256px;
    border-radius: 12px;
    overflow: hidden;
  }

  :global(.image) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Right Column */
  .right-column {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .motivation-label {
    color: #8f8f8f;
    font-size: 16px;
    line-height: 28px;
  }

  .motivation-value {
    flex: 1;
    color: #3a3a3a;
    white-space: pre-line;
    font-size: 16px;
    line-height: 28px;
  }

  .hobbies-label {
    color: #8f8f8f;
    font-size: 16px;
    line-height: 28px;
  }

  .hobbies-value {
    color: #3a3a3a;
    font-size: 16px;
    line-height: 28px;
  }
</style>
