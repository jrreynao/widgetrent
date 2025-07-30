import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Cargar los estilos del widget
async function loadWidgetCss() {
  // Intenta obtener el CSS generado por Vite
  try {
    const res = await fetch(new URL('widget.css', import.meta.url));
    if (res.ok) return await res.text();
  } catch {}
  return '';
}

class RentacarWidget extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  async connectedCallback() {
    // Inyecta los estilos en el shadow root
    const style = document.createElement("style");
    style.textContent = await loadWidgetCss();
    this.shadow.appendChild(style);
    // Crea el mount point para React
    const mountPoint = document.createElement("div");
    this.shadow.appendChild(mountPoint);
    ReactDOM.createRoot(mountPoint).render(<App />);
  }
}

customElements.define("rentacar-widget", RentacarWidget);
