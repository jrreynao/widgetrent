import React, { useState } from "react";
import "./StepConfirmar.css";
import iconCalendar from "../assets/icon-calendar.svg";
import iconMoney from "../assets/icon-money.svg";
import iconCar from "../assets/icon-car.svg";
import iconExtras from "../assets/icon-extras.svg";
import iconUser from "../assets/icon-user.svg";

const StepConfirmar = ({ form, vehiculos, extras, onBack, onSubmit }) => {
  // Buscar datos del vehículo seleccionado
  const vehiculo = vehiculos.find(v => v.id === form.vehiculo?.id);
  // Buscar extras seleccionados
  const extrasSeleccionados = extras.filter(e => form.extras.includes(e.id));

  // Mostrar código país limpio
  const telefonoCompleto = `${form.datos?.codigoPais || ''} ${form.datos?.telefono || ''}`.trim();

  // Calcular total
  const totalExtras = extrasSeleccionados.reduce((sum, e) => sum + (parseInt(e.price) || 0), 0);
  const totalVehiculo = vehiculo && vehiculo.precio ? parseInt(vehiculo.precio) : 0;
  const total = totalVehiculo + totalExtras;

  // Acordeones
  const [showVehiculo, setShowVehiculo] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const [showDatos, setShowDatos] = useState(false);

  return (
    <div className="step-confirmar">
      <div className="confirmar-title">¡Revisá y confirmá tu reserva!</div>
      <div className="confirmar-block">
        <div className="confirmar-label">
          <img src={iconCalendar} alt="Fechas" style={{width:20, height:20}} />
          Fechas
        </div>
        <div className="confirmar-value">
          <b>Retiro:</b> {form.fechas?.fechaRetiro} {form.fechas?.horaRetiro}<br/>
          <b>Devolución:</b> {form.fechas?.fechaDevolucion} {form.fechas?.horaDevolucion}
        </div>
      </div>
      <div className="confirmar-block" style={{background:'#fff7e6', border:'1.5px solid #ff9900'}}>
        <div className="confirmar-label" style={{color:'#ff6600'}}>
          <img src={iconMoney} alt="Total" style={{width:20, height:20}} />
          Total de la reserva
        </div>
        <div className="confirmar-value" style={{fontSize:'1.25em',fontWeight:700,color:'#ff6600'}}>
          ${total.toLocaleString()}
        </div>
      </div>
      <div className="confirmar-block acordeon-block">
        <button type="button" className="acordeon-toggle" onClick={()=>setShowVehiculo(v=>!v)}>
          <img src={iconCar} alt="Vehículo" style={{width:20, height:20}} /> Vehículo {showVehiculo ? '▲' : '▼'}
        </button>
        {showVehiculo && (
          <div className="confirmar-value" style={{display:'flex',alignItems:'center',gap:8}}>
            {vehiculo ? (
              <>
                <img src={vehiculo.imagen} alt={vehiculo.nombre} style={{ maxWidth: 80, maxHeight: 40, borderRadius: 6, boxShadow: '0 2px 8px #0001' }} />
                <span style={{fontWeight:600}}>{vehiculo.nombre}</span>
              </>
            ) : <span style={{color:'#888'}}>No seleccionado</span>}
          </div>
        )}
      </div>
      <div className="confirmar-block acordeon-block">
        <button type="button" className="acordeon-toggle" onClick={()=>setShowExtras(v=>!v)}>
          <img src={iconExtras} alt="Extras" style={{width:20, height:20}} /> Extras {showExtras ? '▲' : '▼'}
        </button>
        {showExtras && (
          <div className="confirmar-value">
            {extrasSeleccionados.length === 0 ? <span style={{color:'#888'}}>Sin extras</span> : (
              <ul className="confirmar-extras-list">
                {extrasSeleccionados.map(e => (
                  <li key={e.id}><span style={{fontWeight:500}}>{e.name}</span> <span className="confirmar-extra-precio">${parseInt(e.price).toLocaleString()}</span></li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <div className="confirmar-block acordeon-block">
        <button type="button" className="acordeon-toggle" onClick={()=>setShowDatos(v=>!v)}>
          <img src={iconUser} alt="Datos del cliente" style={{width:20, height:20}} /> Datos del cliente {showDatos ? '▲' : '▼'}
        </button>
        {showDatos && (
          <div className="confirmar-value confirmar-datos">
            <div><b>Nombre:</b> {form.datos?.nombre}</div>
            <div><b>Email:</b> {form.datos?.email}</div>
            <div><b>Teléfono:</b> {telefonoCompleto}</div>
            <div><b>DNI/Pasaporte:</b> {form.datos?.dni}</div>
            {form.datos?.direccion && <div><b>Dirección:</b> {form.datos.direccion}</div>}
            <div><b>¿Posee tarjeta de crédito?:</b> {form.datos?.tieneTarjeta ? "Sí" : "No"}</div>
            {form.datos?.nota && <div><b>Nota:</b> {form.datos.nota}</div>}
          </div>
        )}
      </div>
      <div className="confirmar-btns">
        <button type="button" className="back-btn-confirmar" onClick={onBack}>Atrás</button>
        <button type="button" className="next-btn-confirmar" onClick={onSubmit}>Confirmar reserva</button>
      </div>
    </div>
  );
};

export default StepConfirmar;
