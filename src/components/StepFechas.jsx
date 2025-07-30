// Campo reutilizable para hora con click en todo el área
function HoraField({ id, label, value, onChange, helpText, classPrefix = "" }) {
  const inputRef = useRef(null);
  const handleClick = () => {
    if (inputRef.current) {
      if (typeof inputRef.current.showPicker === 'function') {
        inputRef.current.showPicker();
      } else {
        inputRef.current.focus();
      }
    }
  };
  const fieldClass = `field${classPrefix ? " " + classPrefix + "-step-fechas-field " + classPrefix + "-clickable-field" : ""}`;
  const labelClass = classPrefix ? `${classPrefix}-step-fechas-label` : "step-fechas-label";
  const inputClass = classPrefix ? `${classPrefix}-step-fechas-input ${classPrefix}-datepicker-input` : "step-fechas-input datepicker-input";
  const helpClass = classPrefix ? `${classPrefix}-step-fechas-help` : "step-fechas-help";
  return (
    <div className={fieldClass} onClick={handleClick} style={{cursor:'pointer'}}>
      <label htmlFor={id} className={labelClass}>{label}</label>
      <input
        ref={inputRef}
        type="time"
        id={id}
        className={inputClass}
        value={value}
        onChange={e => onChange(e.target.value)}
        required
        style={{pointerEvents:'auto'}}
      />
      {helpText && <div className={helpClass}>{helpText}</div>}
    </div>
  );
}
import React, { useState, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);
import dayjs from "dayjs";
import TimePickerModal from "./TimePickerModal";
import "./StepFechas.css";

const sucursales = ["Buenos Aires"];

export default function StepFechas({ onNext }) {
  const [showPicker, setShowPicker] = useState(null); // 'retiro' | 'devolucion' | null
  const [sucursal] = useState("Buenos Aires");
  const today = dayjs();
  const defaultRetiro = today.add(1, "day").toDate();
  const [fechaRetiro, setFechaRetiro] = useState(defaultRetiro);
  const [fechaDevolucion, setFechaDevolucion] = useState(null);
  const [horaRetiro, setHoraRetiro] = useState("08:00 AM");
  const [horaDevolucion, setHoraDevolucion] = useState("14:00");

  const fechaRetiroStr = fechaRetiro ? dayjs(fechaRetiro).format("YYYY-MM-DD") : "";
  const fechaDevolucionStr = fechaDevolucion ? dayjs(fechaDevolucion).format("YYYY-MM-DD") : "";

  const isValid = sucursal && fechaRetiroStr && horaRetiro && fechaDevolucionStr && horaDevolucion;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onNext({
        sucursal,
        fechaRetiro: fechaRetiroStr,
        horaRetiro,
        fechaDevolucion: fechaDevolucionStr,
        horaDevolucion
      });
    }
  };

  return (
    <div id="widgetisracar">
      <form className="widgetisracar-step-fechas-form" onSubmit={handleSubmit}>
        <div className="widgetisracar-step-fechas-container">
          <h2 className="widgetisracar-step-fechas-title">Reserva tu vehículo</h2>
          <div className="widgetisracar-step-fechas-subtitle">Selecciona el rango de fechas y horas para tu alquiler</div>
          <div className="fields-row">
            <div className="field widgetisracar-branch-field">
              <label>Sucursal de retiro</label>
              <div className="branch-value">{sucursal}</div>
            </div>
            <div className="field widgetisracar-calendar-field">
              <label>Día de inicio de alquiler</label>
              <DatePicker
                selected={fechaRetiro}
                onChange={date => {
                  setFechaRetiro(date);
                  if (fechaDevolucion && dayjs(date).isAfter(dayjs(fechaDevolucion))) {
                    setFechaDevolucion(null);
                  }
                }}
                minDate={today.toDate()}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecciona la fecha de retiro"
                withPortal
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className="widgetisracar-step-fechas-input"
                calendarClassName="widgetisracar-datepicker-calendar"
                locale="es"
              />
            </div>
            <HoraField
              id="horaRetiro"
              label="Hora de entrega de vehículo"
              value={horaRetiro.slice(0,5)}
              onChange={val => setHoraRetiro(val + (horaRetiro.includes('PM') ? ' PM' : ' AM'))}
              classPrefix="widgetisracar"
            />
            <div className="field widgetisracar-calendar-field">
              <label>Día de fin de alquiler</label>
              <DatePicker
                selected={fechaDevolucion}
                onChange={date => setFechaDevolucion(date)}
                minDate={fechaRetiro || today.toDate()}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecciona la fecha de devolución"
                withPortal
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className="widgetisracar-step-fechas-input"
                calendarClassName="widgetisracar-datepicker-calendar"
                locale="es"
                disabled={!fechaRetiro}
              />
            </div>
            <HoraField
              id="horaDevolucion"
              label="Hora de devolución de vehículo"
              value={horaDevolucion.slice(0,5)}
              onChange={val => setHoraDevolucion(val + (horaDevolucion.includes('PM') ? ' PM' : ' AM'))}
              classPrefix="widgetisracar"
            />
            <div className="next-btn-field">
              <button className="next-btn" type="submit" disabled={!isValid}>
                Siguiente
              </button>
            </div>
          </div>
          {/* Eliminado TimePickerModal, ahora se usa input estándar */}
        </div>
      </form>
    </div>
  );
}

// Componente reutilizable para campos de fecha/hora con click/tap en todo el área
function FechaHoraField({ id, label, type, value, onChange, helpText, ...rest }) {
  const inputRef = React.useRef(null);
  // Handler para abrir el selector nativo
  const openPicker = () => {
    if (inputRef.current) {
      // showPicker es soportado en navegadores modernos
      if (typeof inputRef.current.showPicker === 'function') {
        inputRef.current.showPicker();
      } else {
        inputRef.current.focus();
        inputRef.current.click();
      }
    }
  };
  return (
    <div className="field clickable-field step-fechas-field" onClick={openPicker}>
      <label htmlFor={id} onClick={openPicker} className="step-fechas-label">{label}</label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={rest.required}
        min={rest.min}
        max={rest.max}
        className="step-fechas-input datepicker-input"
      />
      {helpText && (
        <div className="step-fechas-help">{helpText}</div>
      )}
    </div>
  );
}
