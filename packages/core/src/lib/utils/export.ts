import html2canvas from "html2canvas-pro";

function generateDateString(): string {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

interface ExportOptions {
  withDate?: boolean;
}

export async function exportAsImage(
  element: HTMLElement,
  filename: string = "banner",
  options: ExportOptions = {}
) {
  if (!element) {
    console.error("Element not found");
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
    });

    const finalFilename = options.withDate
      ? `${filename}_${generateDateString()}`
      : filename;

    // File System Access APIが利用可能かチェック
    if ('showSaveFilePicker' in window) {
      try {
        const fileHandle = await (window as any).showSaveFilePicker({
          suggestedName: `${finalFilename}.png`,
          types: [{
            description: 'PNG files',
            accept: { 'image/png': ['.png'] }
          }]
        });
        
        canvas.toBlob(async (blob) => {
          if (blob) {
            const writable = await fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
          }
        }, 'image/png');
        return;
      } catch (error: any) {
        // ユーザーがキャンセルした場合は何もしない
        if (error.name === 'AbortError') {
          return;
        }
        console.warn('File System Access API failed, falling back to download:', error);
      }
    }

    // フォールバック: 従来のダウンロード方法
    const link = document.createElement("a");
    link.download = `${finalFilename}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error("Failed to export image:", error);
    throw error;
  }
}
