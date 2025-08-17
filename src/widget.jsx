import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

class RentacarWidget extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  async connectedCallback() {
  // Base host styles to avoid inherited site styles bleeding in
  const base = document.createElement('style');
  base.textContent = `:host{display:block;contain:content;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.4;color:#111}`;
  this.shadow.appendChild(base);
  // Inyecta los estilos en el Shadow DOM mediante @import (sin fetch/CORS)
  // Esto asegura que el CSS se cargue incluso embebido en otros dominios.
  const cssUrl = new URL('widget.css', import.meta.url).toString();
  const style = document.createElement('style');
  style.textContent = `@import url("${cssUrl}");`;
  this.shadow.appendChild(style);
    // Crea el mount point para React
  const mountPoint = document.createElement("div");
  mountPoint.className = 'wr-root';
  this.shadow.appendChild(mountPoint);
  ReactDOM.createRoot(mountPoint).render(<App />);
  }
}

customElements.define("rentacar-widget", RentacarWidget);
