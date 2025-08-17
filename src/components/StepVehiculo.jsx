import React, { useState } from "react";
import { FaCarSide, FaCar, FaShuttleVan } from "react-icons/fa";
import "./StepVehiculo.css";


// Iconos SVG unicolor para características
import {
  IconAsientos,
  IconMaletas,
  IconPuertas,
  IconTransmision,
  IconAirbag,
  IconBluetooth,
  IconAire
} from "./IconsVehiculo.jsx";

const iconMap = {
  "Asientos": IconAsientos,
  "Maletas": IconMaletas,
  "Puertas": IconPuertas,
  "Manual": IconTransmision,
  "Automático": IconTransmision,
  "Airbag/ABS": IconAirbag,
  "Mp3 Bluetooth": IconBluetooth,
  "Aire Acondicionado": IconAire,
  "Aire Acondicionado 3 Zonas": IconAire
};

// Datos de categorías y vehículos (se importarán luego desde un archivo aparte)
import { categorias, vehiculos } from "../data/vehiculos";

const StepVehiculo = ({ onNext, onBack, selected, setSelected }) => {
  // Ref para el widget
  const widgetRef = React.useRef(null);

  React.useEffect(() => {
    if (widgetRef.current) {
      widgetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  const [categoria, setCategoria] = useState(selected?.categoria || "");

  // Datos visuales y descripciones por categoría
  const categoriaVisual = [
    {
      id: "1",
      nombre: "Vehículo Chico",
      descripcion: "Ideal para la ciudad y viajes cortos.",
      icon: FaCarSide,
    },
    {
      id: "2",
      nombre: "Vehículo Mediano",
      descripcion: "Perfecto para familias y mayor comodidad.",
      icon: FaCar,
    },
    {
      id: "3",
      nombre: "Vehículo Grande",
      descripcion: "Espacio y potencia para cualquier aventura.",
      icon: FaShuttleVan,
    },
  ];

  // Calcular rango de precios por categoría
  const getRangoPrecios = catId => {
    const vehs = vehiculos.filter(v => v.categoriaId === catId);
    if (!vehs.length) return null;
    const min = Math.min(...vehs.map(v => v.precio));
    const max = Math.max(...vehs.map(v => v.precio));
    return { min, max };
  };

  const handleCategoria = catId => {
    setCategoria(catId);
    setSelected({ ...selected, categoria: catId });
  };

  return (
  <div ref={widgetRef} className="step-vehiculo-form" style={{background:'#f5f6f8', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
      <div className="vehiculo-card-container" style={{width:'100%', maxWidth:'1200px', margin:'2rem auto', boxSizing:'border-box', background:'#fff', borderRadius:'20px', boxShadow:'0 8px 32px 0 rgba(60,60,60,0.10)', padding:'2.5rem 1.5rem'}}>
        <div style={{textAlign:'center', marginBottom:'1.5rem'}}>
          <h2 style={{fontSize:'2.2rem', fontWeight:800, color:'#222', marginBottom:'0.5rem'}}>Selecciona una categoría de vehículo</h2>
          <div style={{fontSize:'1.1rem', color:'#555'}}>Elige la opción que mejor se adapte a tus necesidades.</div>
        </div>
        <div className="vehiculo-categorias-grid" style={{width:'100%', marginBottom:'2.5rem', display:'flex', gap:'1.2rem', flexDirection:'column'}}>
          {categoriaVisual.map(cat => {
            const rango = getRangoPrecios(cat.id);
            const selectedStyle = cat.id === categoria ? {border:'2.5px solid #4f46e5', boxShadow:'0 4px 24px rgba(79,70,229,0.08)', background:'#f6f7ff'} : {border:'1.5px solid #e5e7eb', background:'#fff'};
            return (
              <button key={cat.id} type="button" className="vehiculo-categoria-card"
                style={{
                  ...selectedStyle,
                  borderRadius:'16px',
                  boxShadow:'0 2px 12px rgba(0,0,0,0.07)',
                  padding:'1.1rem 1rem',
                  width:'100%',
                  maxWidth:'100%',
                  display:'flex',
                  alignItems:'center',
                  cursor:'pointer',
                  transition:'border 0.2s, box-shadow 0.2s',
                  minHeight:'90px',
                }}
                onClick={()=>handleCategoria(cat.id)}>
                <span style={{marginRight:'1.1rem', display:'flex', alignItems:'center', justifyContent:'center', width:'60px', height:'60px', background:'#f8f8f8', borderRadius:'12px', flexShrink:0}}>
                  {cat.icon && React.createElement(cat.icon, {size: 38, color: '#4f46e5'})}
                </span>
                <div style={{flex:'1 1 0', textAlign:'left'}}>
                  <div style={{fontSize:'1.15rem', fontWeight:700, color:'#222', marginBottom:'0.2rem'}}>{cat.nombre}</div>
                  <div style={{fontSize:'0.98rem', color:'#555', marginBottom:'0.3rem'}}>{cat.descripcion}</div>
                  <div style={{fontSize:'1.1rem', fontWeight:700, color:'#222'}}>
                    {rango ? `$${rango.min.toLocaleString()} - $${rango.max.toLocaleString()}` : 'Consultar'} <span style={{fontSize:'0.9em', color:'#888', fontWeight:400}}>/ día</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <style>{`
          @media (min-width: 700px) {
            .vehiculo-categorias-grid {
              flex-direction: row !important;
              gap: 2rem !important;
            }
            .vehiculo-categoria-card {
              min-width: 260px !important;
              max-width: 340px !important;
              margin-bottom: 0 !important;
            }
          }
        `}</style>
        <div style={{display:'flex', justifyContent:'flex-end', marginTop:'1.5rem'}}>
          <button type="button" onClick={onBack} style={{background:'#eee', color:'#333', border:'none', borderRadius:'12px', padding:'0.9rem 2.2rem', fontSize:'1.1rem', fontWeight:700, marginRight:'1rem', boxShadow:'0 2px 8px rgba(255,102,0,0.08)', cursor:'pointer'}}>Atrás</button>
          <button type="button" onClick={()=>onNext({ categoria, rango: getRangoPrecios(categoria) })} style={{background:'#4f46e5', color:'#fff', border:'none', borderRadius:'12px', padding:'0.9rem 2.2rem', fontSize:'1.1rem', fontWeight:700, boxShadow:'0 4px 16px 0 rgba(60,60,60,0.10)', cursor: categoria ? 'pointer' : 'not-allowed', opacity: categoria ? 1 : 0.6}} disabled={!categoria}>Continuar &rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default StepVehiculo;
