// Archivo renombrado a .jsx para soporte de JSX en Vite
// Copia el contenido original aquí

export const IconAsientos = ({ color = "#1b7e3c", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="7" width="18" height="10" rx="4" stroke={color} strokeWidth="2"/>
    <rect x="7" y="17" width="10" height="3" rx="1.5" stroke={color} strokeWidth="2"/>
  </svg>
);

export const IconPuertas = ({ color = "#1b7e3c", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="12" height="16" rx="2" stroke={color} strokeWidth="2"/>
    <rect x="9" y="8" width="2" height="4" rx="1" fill={color}/>
    <rect x="13" y="8" width="2" height="4" rx="1" fill={color}/>
  </svg>
);

export const IconMaletas = ({ color = "#1b7e3c", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="16" height="10" rx="3" stroke={color} strokeWidth="2"/>
    <rect x="8" y="4" width="8" height="4" rx="2" stroke={color} strokeWidth="2"/>
  </svg>
);

export const IconTransmision = ({ color = "#1b7e3c", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2"/>
    <rect x="10" y="6" width="4" height="8" rx="2" stroke={color} strokeWidth="2"/>
    <rect x="10" y="15" width="4" height="3" rx="1.5" stroke={color} strokeWidth="2"/>
  </svg>
);

export const IconAirbag = ({ color = "#1b7e3c", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2"/>
    <rect x="8" y="16" width="8" height="2" rx="1" fill={color}/>
  </svg>
);

export const IconBluetooth = ({ color = "#1b7e3c", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3v18m0 0l6-6m-6 6l-6-6m6-12l6 6m-6-6l-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconAire = ({ color = "#1b7e3c", size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12h16M4 16h10M4 8h7" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
