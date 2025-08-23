<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { exportAsImage } from "$lib/utils/export";
  import Download from "@lucide/svelte/icons/download";

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

<div class="flex gap-3 justify-end w-full">
  <Button onclick={handleExport}>
    <Download /> 画像を保存
  </Button>
</div>
