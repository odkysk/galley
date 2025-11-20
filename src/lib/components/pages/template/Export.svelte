<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import type { TemplateFields } from "$lib/models/template";
  import { exportAsImage } from "$lib/utils/export";
  import Download from "@lucide/svelte/icons/download";

  interface Props {
    templateElement: HTMLElement | undefined;
    templateName: string;
    templateFields: TemplateFields;
  }

  let { templateElement, templateName, templateFields }: Props = $props();

  async function handleExport() {
    if (!templateElement) return;
    const firstStringFieldValue = Object.values(templateFields).find(
      (field) => field?.value && typeof field.value === "string"
    )?.value;
    await exportAsImage(
      templateElement,
      `${templateName}_${firstStringFieldValue ?? ""}`,
      {
        withDate: true,
      }
    );
  }
</script>

<div class="flex flex-col gap-3 justify-end w-full">
  <p class="w-full text-sm text-gray-500">
    プレビュー画面の通りに保存できない場合は、Chromeでスクリーンショットを撮る方法を検討してください。
    <a
      class="text-blue-500"
      href="https://qiita.com/set0gut1/items/ad82517e561883dcd2d2"
      target="_blank">解説記事</a
    >
  </p>
  <Button onclick={handleExport} class="w-full">
    <Download /> 画像を保存
  </Button>
</div>
