<script lang="ts">
  import { exportAsImage } from "$lib/utils/export";

  interface Props {
    templateElement: HTMLElement | undefined;
    templateName: string;
    templateProps: any;
  }

  let { templateElement, templateName, templateProps }: Props = $props();

  async function handleExport() {
    if (!templateElement) return;
    const firstStringPropValue = Object.values(templateProps).find(
      (value) => typeof value === "string"
    );
    await exportAsImage(
      templateElement,
      `${templateName}_${firstStringPropValue ?? ""}`,
      {
        withDate: true,
      }
    );
  }
</script>

<button
  onclick={handleExport}
  class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
>
  画像を保存
</button>