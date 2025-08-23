import html2canvas from "html2canvas-pro";

export async function exportAsImage(element: HTMLElement, filename: string = "banner") {
  if (!element) {
    console.error("Element not found");
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 4,
    });

    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error("Failed to export image:", error);
    throw error;
  }
}