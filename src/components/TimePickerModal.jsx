import React, { useState } from "react";

export default function TimePickerModal({ value, onSave, onCancel }) {
  // value: "08:00 AM" o "06:30 PM"
  const parseValue = (val) => {
    if (!val) return { hour: 8, minute: 0, period: "AM" };
    const [time, period] = val.split(" ");
    const [hour, minute] = time.split(":").map(Number);
    return { hour, minute, period };
  };
  const initial = parseValue(value);
  const [hour, setHour] = useState(initial.hour);
  const [minute, setMinute] = useState(initial.minute);
  const [period, setPeriod] = useState(initial.period);

  // Arrays para scroll
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));
  const periods = ["AM", "PM"];

  // Handlers
  const handleSave = () => {
    onSave(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${period}`);
  };

  return (
    <div className="tp-modal-bg">
      <div className="tp-modal">
        <div className="tp-modal-header">
          <button className="tp-cancel" onClick={onCancel}>Cancelar</button>
          <span></span>
          <button className="tp-save" onClick={handleSave}>Guardar</button>
        </div>
        <div className="tp-picker-titles-row">
          <div className="tp-picker-title">Hora</div>
          <div className="tp-picker-title">Minutos</div>
          <div className="tp-picker-title">AM/PM</div>
        </div>
        <div className="tp-picker-row">
          <div className="tp-picker-col">
            <div className="tp-picker-list">
              {hours.map(h => (
                <div key={h} className={h === hour ? "tp-selected" : ""} onClick={() => setHour(h)}>{h.toString().padStart(2, "0")}</div>
              ))}
            </div>
          </div>
          <div className="tp-picker-col tp-sep">:</div>
          <div className="tp-picker-col">
            <div className="tp-picker-list">
              {minutes.map(m => (
                <div key={m} className={parseInt(m) === minute ? "tp-selected" : ""} onClick={() => setMinute(parseInt(m))}>{m}</div>
              ))}
            </div>
          </div>
          <div className="tp-picker-col">
            <div className="tp-picker-list tp-period-list">
              {periods.map(p => (
                <div key={p} className={p === period ? "tp-selected tp-selected-period" : ""} onClick={() => setPeriod(p)}>{p}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
