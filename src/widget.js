import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reactToWebComponent from "react-to-webcomponent";

customElements.define(
  "rentacar-widget",
  reactToWebComponent(App, React, ReactDOM)
);
