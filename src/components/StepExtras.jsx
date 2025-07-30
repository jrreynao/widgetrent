import React from "react";
import "./StepExtras.css";

const StepExtras = ({ extras, selectedExtras, onChange, onNext, onBack }) => {
  return (
    <form className="step-extras-form" onSubmit={e => { e.preventDefault(); onNext(); }}>
      <div className="extras-title">Selecciona los extras que desees</div>
      <div className="extras-list">
        {extras.length === 0 && <div className="extras-empty">No hay extras disponibles para este vehículo.</div>}
        {extras.map(extra => (
          <label className="extra-checkbox" key={extra.id}>
            <input
              type="checkbox"
              checked={selectedExtras.includes(extra.id)}
              onChange={() => onChange(extra.id)}
            />
            <span className="extra-name">{extra.name}</span>
            <span className="extra-price">+ ${parseInt(extra.price).toLocaleString()}</span>
          </label>
        ))}
      </div>
      <div className="extras-btns">
        <button type="button" className="back-btn-extras" onClick={onBack}>Atrás</button>
        <button type="submit" className="next-btn-extras" disabled={false}>Siguiente</button>
      </div>
    </form>
  );
};

export default StepExtras;
