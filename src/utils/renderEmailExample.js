// Utilidad para renderizar un ejemplo visual de la plantilla de correo con datos ficticios
import { loadEmailTemplate } from "./loadEmailTemplate";

export async function renderEmailExample(templateName, exampleVars) {
  const tpl = await loadEmailTemplate(templateName);
  let html = tpl;
  Object.entries(exampleVars).forEach(([k, v]) => {
    html = html.replaceAll(`%${k}%`, v ?? "");
  });
  return html;
}
