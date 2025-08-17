
import React from "react";
import { FaTruck, FaUserPlus, FaCrosshairs, FaChild } from "react-icons/fa";

const StepExtras = ({ extras, selectedExtras, onChange, onNext, onBack }) => {
  // Ref para el widget
  const widgetRef = React.useRef(null);

  React.useEffect(() => {
    if (widgetRef.current) {
      widgetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  const extraVisual = {
    "1": {
      icon: FaTruck,
      desc: "Recibe el auto en la puerta de tu casa."
    },
    "2": {
      icon: FaUserPlus,
      desc: "Comparte la conducción con alguien más."
    },
    "3": {
      icon: FaCrosshairs,
      desc: "No te pierdas en tu destino."
    },
    "4": {
      icon: FaChild,
      desc: "Seguridad para los más pequeños."
    }
  };

  return (
  <div ref={widgetRef} className="step-extras-form" style={{background:'#f5f6f8', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
      <div className="extras-card-container" style={{width:'100%', maxWidth:'1200px', margin:'2rem auto', boxSizing:'border-box', background:'#fff', borderRadius:'20px', boxShadow:'0 8px 32px 0 rgba(60,60,60,0.10)', padding:'2.5rem 1.5rem'}}>
        <form onSubmit={e => { e.preventDefault(); onNext(); }} style={{width:'100%', margin:0, padding:0, boxSizing:'border-box'}}>
          <div style={{textAlign:'center', marginBottom:'1.5rem'}}>
            <h2 style={{fontSize:'2.2rem', fontWeight:800, color:'#222', marginBottom:'0.5rem'}}>Selecciona los extras para tu alquiler</h2>
            <div style={{fontSize:'1.1rem', color:'#555'}}>Personaliza tu viaje con estos complementos opcionales.</div>
          </div>
          <div className="extras-list-responsive" style={{width:'100%', marginBottom:'1.2rem', display:'flex', gap:'0.7rem', flexDirection:'column', flexWrap:'wrap'}}>
            {extras.map(extra => {
              const Icon = extraVisual[extra.id]?.icon || FaTruck;
              let titulo = '';
              if (extra.id === '1') titulo = 'Llevar vehículo a mi dirección';
              else if (extra.id === '2') titulo = 'Conductor adicional';
              else if (extra.id === '3') titulo = 'GPS';
              else if (extra.id === '4') titulo = 'Silla para niño';
              else titulo = extra.title;
              return (
                <label
                  key={extra.id}
                  htmlFor={`extra-${extra.id}`}
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: '1 1 220px', minWidth: 0, border: selectedExtras.includes(extra.id) ? '2.5px solid #4f46e5' : '1.5px solid #e5e7eb', background: selectedExtras.includes(extra.id) ? '#f6f7ff' : '#fff', borderRadius: '16px', boxShadow:'0 2px 12px rgba(0,0,0,0.07)', padding: '0.7rem 0.7rem', minHeight: '70px', maxWidth: '100%', transition:'border 0.2s, box-shadow 0.2s', marginBottom:'0'}}>
                  <span style={{ flex: '0 0 auto', marginRight: '1.1rem', background: '#f8f8f8', borderRadius: '12px', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={38} color="#4f46e5" />
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0', minWidth: 0, justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.15rem', color: '#222', marginBottom: '0.2rem', lineHeight: '1.2' }}>{titulo}</span>
                    <span style={{ color: '#555', fontSize: '0.98rem', marginBottom: '0.3rem', lineHeight: '1.2' }}>{extraVisual[extra.id]?.desc}</span>
                    <span style={{ color: '#222', fontSize: '1.1rem', fontWeight:700 }}>+${extra.price.toLocaleString('es-CO')} <span style={{fontSize:'0.9em', color:'#888', fontWeight:400}}>/ día</span></span>
                  </span>
                  <input
                    type="checkbox"
                    id={`extra-${extra.id}`}
                    checked={selectedExtras.includes(extra.id)}
                    onChange={() => onChange(extra.id)}
                    style={{ flex: '0 0 auto', marginLeft: '1rem', alignSelf: 'center', width: '1.4em', height: '1.4em', accentColor: '#4f46e5', borderRadius: '6px', border: '1px solid #e0e0e0', background: '#fff' }}
                  />
                </label>
              );
            })}
          </div>
          <style>{`
            @media (min-width: 700px) {
              .extras-list-responsive {
                flex-direction: row !important;
                gap: 2rem !important;
                flex-wrap: wrap !important;
                justify-content: center !important;
              }
              .extras-list-responsive label[for^='extra-'] {
                min-width: 220px !important;
                max-width: 340px !important;
                margin-bottom: 0 !important;
                flex: 1 1 220px !important;
                padding: 1.1rem 1rem !important;
                min-height: 90px !important;
              }
            }
            @media (max-width: 699px) {
              .extras-list-responsive {
                flex-direction: column !important;
                gap: 0.7rem !important;
                width: 100% !important;
                flex-wrap: nowrap !important;
              }
              .extras-list-responsive label[for^='extra-'] {
                min-width: 0 !important;
                max-width: 100% !important;
                margin-bottom: 0 !important;
                flex-direction: row !important;
                align-items: center !important;
                justify-content: space-between !important;
                padding: 0.7rem 0.7rem !important;
                flex: 1 1 100% !important;
                min-height: 70px !important;
              }
            }
          `}</style>
          <div style={{display:'flex', justifyContent:'flex-end', marginTop:'1.5rem'}}>
            <button type="button" onClick={onBack} style={{background:'#eee', color:'#333', border:'none', borderRadius:'12px', padding:'0.9rem 2.2rem', fontSize:'1.1rem', fontWeight:700, marginRight:'1rem', boxShadow:'0 2px 8px rgba(255,102,0,0.08)', cursor:'pointer'}}>Atrás</button>
            <button type="submit" style={{background:'#4f46e5', color:'#fff', border:'none', borderRadius:'12px', padding:'0.9rem 2.2rem', fontSize:'1.1rem', fontWeight:700, boxShadow:'0 4px 16px 0 rgba(60,60,60,0.10)', cursor:'pointer', display:'flex', alignItems:'center', gap:'0.7em'}}>Siguiente <span style={{fontSize:'1.3em', display:'inline-block', marginLeft:'0.3em'}}>&rarr;</span></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepExtras;
