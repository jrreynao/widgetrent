import React, { useEffect, useState } from "react";
import { renderEmailExample } from "../utils/renderEmailExample";

const exampleVars = {
  customer_full_name: "Juan Pérez",
  appointment_date: "2025-08-10",
  appointment_duration: "5 días",
  text_direccionentrega: "Calle Falsa 123, CABA",
  hora_entregadevehiculo: "10:00",
};

export default function EmailPreview({ templateName }) {
  const [html, setHtml] = useState("");
  useEffect(() => {
    renderEmailExample(templateName, exampleVars).then(setHtml);
  }, [templateName]);
  return (
    <div style={{border:"1px solid #ccc",borderRadius:8,margin:24,padding:16,background:"#fff"}}>
      <h3>Vista previa del correo</h3>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
