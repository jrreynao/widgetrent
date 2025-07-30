
// Utilidad para cargar una plantilla HTML desde public/email_templates
export async function loadEmailTemplate(templateName) {
  const response = await fetch(`/email_templates/${templateName}`);
  if (!response.ok) return "";
  return await response.text();
}

// Reemplaza las variables %var% en la plantilla HTML
export function fillTemplate(template, vars) {
  if (!template || typeof template !== 'string') return '';
  return template.replace(/%([a-zA-Z0-9_]+)%/g, (match, key) => {
    return typeof vars[key] !== 'undefined' ? vars[key] : match;
  });
}
