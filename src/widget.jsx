import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

class RentacarWidget extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  async connectedCallback() {
  // Inyecta los estilos en el Shadow DOM mediante @import (sin fetch/CORS)
  // Esto asegura que el CSS se cargue incluso embebido en otros dominios.
  const cssUrl = new URL('widget.css', import.meta.url).toString();
  const style = document.createElement('style');
  style.textContent = `@import url("${cssUrl}");`;
  this.shadow.appendChild(style);
    // Crea el mount point para React
    const mountPoint = document.createElement("div");
    this.shadow.appendChild(mountPoint);
    ReactDOM.createRoot(mountPoint).render(<App />);
  }
}

customElements.define("rentacar-widget", RentacarWidget);
