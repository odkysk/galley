<script module>
  import { createTemplateModule } from "../lib/utils/createTemplateModule.js";

  export const { config } = createTemplateModule({
    fields: {
      volume: { type: "text", value: "1", maxLength: 10 },
      description: {
        type: "textarea",
        value:
          "家庭とキャリアを両立する、新しい医師の働き方\n現役ママドクターが語るパーソナルドクターという選択肢",
        maxLength: 100,
        rows: 2,
      },
      eventDate: { type: "text", value: "2025.07.24", maxLength: 20 },
      eventTime: { type: "text", value: "21:00 – 22:00", maxLength: 30 },
      eventLocation: {
        type: "text",
        value: "オンライン開催",
        maxLength: 30,
      },
      buttonText: { type: "text", value: "詳しくはこちら", maxLength: 20 },
      doctor1Name: { type: "text", value: "山下 弘鈴", maxLength: 20 },
      doctor1Role: {
        type: "textarea",
        value: "Wellness\nパーソナルドクター",
        maxLength: 50,
        rows: 2,
      },
      doctor1Image: { type: "image", value: "" },
      doctor2Name: { type: "text", value: "松田 悠司", maxLength: 20 },
      doctor2Role: {
        type: "textarea",
        value: "Wellness\nパーソナルドクター",
        maxLength: 50,
        rows: 2,
      },
      doctor2Image: { type: "image", value: "" },
    },
  });

  export type Props = typeof config.fields;
</script>

<script lang="ts">
  import FramedImage from "$lib/components/ui/FramedImage.svelte";

  let {
    volume,
    description,
    eventDate,
    eventTime,
    eventLocation,
    buttonText,
    doctor1Name,
    doctor1Role,
    doctor1Image,
    doctor2Name,
    doctor2Role,
    doctor2Image,
  }: Props = $props();

  const doctor1ImageField =
    doctor1Image as import("$lib/models/template.js").ImageField;
  const doctor2ImageField =
    doctor2Image as import("$lib/models/template.js").ImageField;
</script>

<div class="canvas">
  <!-- Doctor 1 (Left) -->
  <div class="doctor-card doctor-left">
    <div class="doctor-image">
      <FramedImage field={doctor1ImageField} />
    </div>
    <div class="doctor-info">
      <p class="doctor-name">{doctor1Name.value}</p>
      <div class="doctor-role">
        {doctor1Role.value}
      </div>
    </div>
  </div>

  <!-- Center Content -->
  <div class="center-content">
    <div class="header-section">
      <div class="chip">
        <p>Vol.{volume.value}</p>
      </div>
      <div class="description">
        {description.value}
      </div>
    </div>

    <div class="event-info">
      <p class="event-title">Wellness Doctor Meetup</p>
      <div class="event-details">
        <p class="event-date">{eventDate.value}</p>
        <div class="event-meta">
          <p>{eventTime.value}</p>
          <p>{eventLocation.value}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="cta-button">
    <p>{buttonText.value}</p>
  </div>

  <div class="doctor-card doctor-right">
    <div class="doctor-image">
      <FramedImage field={doctor2ImageField} />
    </div>
    <div class="doctor-info">
      <p class="doctor-name">{doctor2Name.value}</p>
      <div class="doctor-role">
        {doctor2Role.value}
      </div>
    </div>
  </div>
</div>

<style>
  .canvas {
    position: relative;
    width: 800px;
    height: 450px;
    background-color: #f5f5f5;
  }

  /* Doctor Cards */
  .doctor-card {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    gap: 12px;
  }

  .doctor-left {
    left: 60px;
    top: 240px;
  }

  .doctor-right {
    left: 620px;
    top: 240px;
  }

  .doctor-image {
    width: 120px;
    height: 100px;
    border-radius: 12px;
    overflow: hidden;
  }

  .doctor-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .doctor-name {
    color: #3a3a3a;
    font-size: 16px;
    line-height: 28px;
    margin: 0;
  }

  .doctor-role {
    color: #8f8f8f;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    white-space: pre-line;
  }

  /* Center Content */
  .center-content {
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .header-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .chip {
    border: 1px solid #8f8f8f;
    border-radius: 10px;
    padding: 4px 8px;
  }

  .chip p {
    color: #8f8f8f;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    margin: 0;
  }

  .description {
    color: #3a3a3a;
    font-size: 16px;
    line-height: 28px;
    text-align: center;
    width: 560px;
    white-space: pre-line;
  }

  /* Event Info */
  .event-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }

  .event-title {
    color: #3a3a3a;
    font-size: 48px;
    line-height: 36px;
    letter-spacing: -0.96px;
    white-space: nowrap;
  }

  .event-details {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    text-align: center;
  }

  .event-date {
    color: #3a3a3a;
    font-size: 42px;
    line-height: 36px;
    letter-spacing: -0.84px;
    margin: 0;
  }

  .event-meta {
    color: #8f8f8f;
    font-size: 12px;
    line-height: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .event-meta p {
    margin: 0;
  }

  /* CTA Button */
  .cta-button {
    position: absolute;
    left: 308px;
    top: 316px;
    background-color: #0090ff;
    border-radius: 16px;
    padding: 8px 20px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cta-button p {
    color: #ffffff;
    font-size: 16px;
    line-height: 28px;
    text-align: center;
    white-space: nowrap;
    margin: 0;
  }
</style>
