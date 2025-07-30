// Utilidad para cargar una plantilla HTML desde public/email_templates
export async function loadEmailTemplate(templateName) {
  const response = await fetch(`/email_templates/${templateName}`);
  if (!response.ok) return "";
  return await response.text();
}
