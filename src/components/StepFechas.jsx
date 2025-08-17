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
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegClock, FaRegCalendar, FaSearch } from "react-icons/fa";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);
import dayjs from "dayjs";


const sucursales = ["Buenos Aires"];

export default function StepFechas({ onNext }) {
  // Ref para el widget
  const widgetRef = React.useRef(null);

  React.useEffect(() => {
    if (widgetRef.current) {
      widgetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  const [sucursal] = useState("Buenos Aires");
  const today = dayjs();
  const defaultRetiro = today.add(1, "day").toDate();
  const [fechaRetiro, setFechaRetiro] = useState(defaultRetiro);
  const [fechaDevolucion, setFechaDevolucion] = useState(null);
  const [horaRetiro, setHoraRetiro] = useState("08:00");
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
    <div ref={widgetRef} className="step-fechas-bg" style={{background:'#f5f6f8', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <style>{`
        .step-fechas-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 16px 0 rgba(60,60,60,0.10);
          padding: 2rem 1.5rem;
          max-width: 1200px;
          width: 100%;
          margin: 2rem auto;
          box-sizing: border-box;
        }
        .step-fechas-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          align-items: flex-end;
          justify-content: center;
          width: 100%;
        }
        .step-fechas-grid-item {
          min-width: 150px;
          flex: 1 1 150px;
        }
        .step-fechas-label {
          font-weight: 500;
          margin-bottom: 0.5rem;
          display: block;
          color: #3d4152;
        }
        .step-fechas-input-group {
          position: relative;
        }
        .step-fechas-icon {
          position: absolute;
          left: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          font-size: 1.4rem;
          pointer-events: none;
        }
        .step-fechas-input {
          width: 100%;
          height: 44px;
          padding: 0.8rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1.1rem;
          background: #fff;
          color: #3d4152;
          outline: none;
          box-sizing: border-box;
          transition: border 0.2s;
          display: flex;
          align-items: center;
        }
        .step-fechas-input-icon {
          padding-left: 3.2rem !important;
          height: 44px !important;
          font-size: 1.1rem !important;
        }
        .step-fechas-input:focus {
          border-color: #6366f1;
        }
        .step-fechas-btn-grid-item {
          min-width: 180px;
          flex: 1 1 180px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 100%;
        }
        .step-fechas-btn {
          width: 100%;
          height: 54px;
          font-weight: bold;
          font-size: 1.1rem;
          border-radius: 12px;
          box-shadow: 0 4px 16px 0 rgba(60,60,60,0.10);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #5747ea;
          color: #fff;
          border: none;
          transition: background 0.2s, transform 0.2s;
          margin-bottom: 0;
          cursor: pointer;
        }
        .step-fechas-btn:disabled {
          background: #c7c7c7;
          cursor: not-allowed;
        }
        @media (max-width: 900px) {
          .step-fechas-card {
            padding: 1.2rem 0.5rem;
          }
          .step-fechas-grid {
            gap: 1rem;
          }
        }
        @media (max-width: 650px) {
          .step-fechas-card {
            padding: 0.5rem 0.2rem;
            border-radius: 18px;
            box-shadow: 0 8px 32px 0 rgba(60,60,60,0.10);
            margin: 0 auto;
            max-width: 95vw;
          }
          .step-fechas-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
          .step-fechas-grid-item, .step-fechas-btn-grid-item {
            min-width: 100%;
            flex: unset;
          }
          .step-fechas-btn-grid-item {
            grid-column: 1 / span 2;
            margin-top: 1.2rem;
          }
        }
      `}</style>
      <div className="step-fechas-card">
        <form className="step-fechas-form" onSubmit={handleSubmit} style={{width:'100%', margin:0, padding:0, boxSizing:'border-box'}}>
          <div className="step-fechas-grid">
            {/* Sucursal: línea completa */}
            <div className="step-fechas-grid-item" style={{gridColumn: '1 / span 2'}}>
              <label className="step-fechas-label" htmlFor="sucursal">Sucursal de retiro</label>
              <div className="step-fechas-input-group">
                <span className="step-fechas-icon"><FaLocationDot /></span>
                <input
                  id="sucursal"
                  type="text"
                  className="step-fechas-input step-fechas-input-icon"
                  value={sucursal}
                  disabled
                  autoComplete="off"
                  style={{background:'#f3f4f6', color:'#6b7280'}}
                />
              </div>
            </div>
            {/* Recogida y hora de recogida */}
            <div className="step-fechas-grid-item">
              <label className="step-fechas-label" htmlFor="start-date">Recogida</label>
              <div className="step-fechas-input-group">
                <span className="step-fechas-icon"><FaRegCalendar /></span>
                <DatePicker
                  selected={fechaRetiro}
                  onChange={date => {
                    setFechaRetiro(date);
                    if (fechaDevolucion && dayjs(date).isAfter(dayjs(fechaDevolucion))) {
                      setFechaDevolucion(null);
                    }
                  }}
                  minDate={today.toDate()}
                  dateFormat="dd/MM/yy"
                  placeholderText="DD/MM/A"
                  withPortal
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className="step-fechas-input step-fechas-input-icon"
                  calendarClassName="step-fechas-datepicker-calendar"
                  locale="es"
                  id="custom-retiro"
                  name="customRetiro"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="step-fechas-grid-item">
              <label className="step-fechas-label" htmlFor="start-time">Hora de entrega</label>
              <div className="step-fechas-input-group">
                <span className="step-fechas-icon"><FaRegClock /></span>
                <input
                  id="start-time"
                  type="time"
                  className="step-fechas-input step-fechas-input-icon"
                  value={horaRetiro}
                  onChange={e => setHoraRetiro(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            {/* Devolución y hora de devolución */}
            <div className="step-fechas-grid-item">
              <label className="step-fechas-label" htmlFor="end-date">Devolución</label>
              <div className="step-fechas-input-group">
                <span className="step-fechas-icon"><FaRegCalendar /></span>
                <DatePicker
                  selected={fechaDevolucion}
                  onChange={date => setFechaDevolucion(date)}
                  minDate={fechaRetiro || today.toDate()}
                  dateFormat="dd/MM/yy"
                  placeholderText="DD/MM/A"
                  withPortal
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className="step-fechas-input step-fechas-input-icon"
                  calendarClassName="step-fechas-datepicker-calendar"
                  locale="es"
                  id="custom-devolucion"
                  name="customDevolucion"
                  autoComplete="off"
                  disabled={!fechaRetiro}
                />
              </div>
            </div>
            <div className="step-fechas-grid-item">
              <label className="step-fechas-label" htmlFor="end-time">Hora de devolución</label>
              <div className="step-fechas-input-group">
                <span className="step-fechas-icon"><FaRegClock /></span>
                <input
                  id="end-time"
                  type="time"
                  className="step-fechas-input step-fechas-input-icon"
                  value={horaDevolucion}
                  onChange={e => setHoraDevolucion(e.target.value)}
                  required
                  autoComplete="off"
                  disabled={!fechaRetiro}
                />
              </div>
            </div>
            {/* Botón igual a la referencia: texto, ancho completo, alineado */}
            <div className="step-fechas-btn-grid-item">
              <button
                className="step-fechas-btn"
                type="submit"
                disabled={!isValid}
              >
                Siguiente
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}