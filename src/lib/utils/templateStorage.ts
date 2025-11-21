import type { TemplateFields } from "$lib/models/template";

const STORAGE_PREFIX = "galley_template_";

export function saveTemplateFields(
  templateName: string,
  fields: TemplateFields
): void {
  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}${templateName}`,
      JSON.stringify(fields)
    );
  } catch (error) {
    console.error("Failed to save template fields:", error);
  }
}

export function loadTemplateFields(
  templateName: string
): TemplateFields | null {
  try {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}${templateName}`);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Failed to load template fields:", error);
    return null;
  }
}

export function clearTemplateFields(templateName: string): void {
  localStorage.removeItem(`${STORAGE_PREFIX}${templateName}`);
}
