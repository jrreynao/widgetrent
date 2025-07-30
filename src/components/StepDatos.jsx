import React, { useState } from "react";
import "./StepDatos.css";

// ID del extra de "Llevar vehículo a mi dirección"
const EXTRA_ENVIO_ID = "1";

const StepDatos = ({ onNext, onBack, initialData = {}, extrasSeleccionados = [] }) => {
  const [nombre, setNombre] = useState(initialData.nombre || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [codigoPais, setCodigoPais] = useState(initialData.codigoPais || "+54 Argentina");
  const [telefono, setTelefono] = useState(initialData.telefono || "");
  const [dni, setDni] = useState(initialData.dni || "");
  const [direccion, setDireccion] = useState(initialData.direccion || "");
  const [nota, setNota] = useState(initialData.nota || "");
  const [tieneTarjeta, setTieneTarjeta] = useState(
    typeof initialData.tieneTarjeta === 'boolean' ? initialData.tieneTarjeta : null
  );
  const [errores, setErrores] = useState({});

  const mostrarDireccion = extrasSeleccionados.includes(EXTRA_ENVIO_ID);

  const validar = () => {
    const errs = {};
    if (!nombre.trim()) errs.nombre = "El nombre es obligatorio";
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errs.email = "Email inválido";
    if (!telefono.match(/^\d{6,}$/)) errs.telefono = "Teléfono inválido";
    if (!dni.trim()) errs.dni = "DNI o Pasaporte obligatorio";
    if (mostrarDireccion && !direccion.trim()) errs.direccion = "La dirección es obligatoria";
    setErrores(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validar()) {
      onNext({ nombre, email, codigoPais, telefono, dni, direccion: mostrarDireccion ? direccion : "", nota, tieneTarjeta });
    }
  };

  return (
    <form className="step-datos-form" onSubmit={handleSubmit}>
      <div className="datos-title">Detalles de reserva</div>
      <div className="datos-fields">
        <label className="field-full datos-checkbox" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', fontWeight: 500 }}>
          ¿Posee tarjeta de crédito?
          <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 400 }}>
              <input
                type="radio"
                name="tarjeta"
                value="si"
                checked={tieneTarjeta === true}
                onChange={() => setTieneTarjeta(true)}
              />
              Sí
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 400 }}>
              <input
                type="radio"
                name="tarjeta"
                value="no"
                checked={tieneTarjeta === false}
                onChange={() => setTieneTarjeta(false)}
              />
              No
            </label>
          </div>
          {tieneTarjeta === null && <span className="datos-error">Selecciona una opción</span>}
        </label>
        <label className="field-full">
          Nombre y Apellido
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
          {errores.nombre && <span className="datos-error">{errores.nombre}</span>}
        </label>
        <label className="field-full">
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          {errores.email && <span className="datos-error">{errores.email}</span>}
        </label>
        <label>
          Teléfono
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              list="codigos-pais"
              value={codigoPais}
              onChange={e => setCodigoPais(e.target.value)}
              style={{ minWidth: 120, borderRadius: 6, border: '1px solid #ddd', background: '#fafafa', fontSize: '1rem', padding: '0.5rem 0.3rem' }}
              placeholder="País o código"
              autoComplete="off"
            />
            <datalist id="codigos-pais">
              <option value="+54 Argentina">🇦🇷 +54 Argentina</option>
              <option value="+598 Uruguay">🇺🇾 +598 Uruguay</option>
              <option value="+55 Brasil">🇧🇷 +55 Brasil</option>
              <option value="+56 Chile">🇨🇱 +56 Chile</option>
              <option value="+1 Estados Unidos">🇺🇸 +1 Estados Unidos</option>
              <option value="+34 España">🇪🇸 +34 España</option>
              <option value="+52 México">🇲🇽 +52 México</option>
              <option value="+57 Colombia">🇨🇴 +57 Colombia</option>
              <option value="+51 Perú">🇵🇪 +51 Perú</option>
              <option value="+593 Ecuador">🇪🇨 +593 Ecuador</option>
              <option value="+595 Paraguay">🇵🇾 +595 Paraguay</option>
              <option value="+507 Panamá">🇵🇦 +507 Panamá</option>
              <option value="+591 Bolivia">🇧🇴 +591 Bolivia</option>
              <option value="+58 Venezuela">🇻🇪 +58 Venezuela</option>
              <option value="+53 Cuba">🇨🇺 +53 Cuba</option>
            </datalist>
            <input
              type="tel"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              placeholder="Número sin código"
              style={{ flex: 1 }}
            />
          </div>
          {errores.telefono && <span className="datos-error">{errores.telefono}</span>}
        </label>
        <label>
          N° DNI o Pasaporte
          <input type="text" value={dni} onChange={e => setDni(e.target.value)} />
          {errores.dni && <span className="datos-error">{errores.dni}</span>}
        </label>
        {mostrarDireccion && (
          <label className="field-full">
            Dirección a la que llevaremos el vehículo
            <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)} />
            {errores.direccion && <span className="datos-error">{errores.direccion}</span>}
          </label>
        )}
        <label className="field-full">
          Nota
          <textarea value={nota} onChange={e => setNota(e.target.value)} rows={2} />
        </label>
      </div>
      <div className="datos-btns">
        <button type="button" className="back-btn-datos" onClick={onBack}>Atrás</button>
        <button type="submit" className="next-btn-datos">Siguiente</button>
      </div>
    </form>
  );
};

export default StepDatos;
