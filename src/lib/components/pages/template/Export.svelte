<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { exportAsImage } from "$lib/utils/export";
  import type { TemplateFields } from "$lib/models/template";
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

<div class="flex gap-3 justify-end w-full">
  <Button onclick={handleExport}>
    <Download /> 画像を保存
  </Button>
</div>
