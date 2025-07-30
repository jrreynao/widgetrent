// Utilidad para cargar una plantilla HTML desde public/email_templates
export async function loadEmailTemplate(templateName) {
  const response = await fetch(`/email_templates/${templateName}`);
  if (!response.ok) throw new Error('No se pudo cargar la plantilla');
  return await response.text();
}
