import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const mountPoint = document.getElementById('widgetisracar');
if (mountPoint) {
  let shadowRoot;
  if (mountPoint.attachShadow) {
    shadowRoot = mountPoint.attachShadow({ mode: 'open' });
    const shadowDiv = document.createElement('div');
    shadowRoot.appendChild(shadowDiv);
    // Inyectar todos los estilos principales como <style> en vez de <link> para desarrollo
    Promise.all([
      import('./index.css?raw'),
      import('./App.css?raw'),
      import('./components/StepFechas.css?raw'),
      import('./components/StepVehiculo.css?raw'),
      import('./components/StepExtras.css?raw'),
  import('./components/StepDatos.css?raw'),
      import('react-datepicker/dist/react-datepicker.css?raw')
    ]).then(mods => {
      mods.forEach(mod => {
        const styleTag = document.createElement('style');
        styleTag.textContent = mod.default;
        shadowRoot.appendChild(styleTag);
      });
      createRoot(shadowDiv).render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    });
  } else {
    // Fallback para navegadores sin shadow DOM
    createRoot(mountPoint).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}
