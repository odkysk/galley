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
      scale: 4,
    });

    const finalFilename = options.withDate 
      ? `${filename}_${generateDateString()}`
      : filename;

    const link = document.createElement("a");
    link.download = `${finalFilename}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error("Failed to export image:", error);
    throw error;
  }
}