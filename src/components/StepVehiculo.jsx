import React, { useState } from "react";
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
  const [categoria, setCategoria] = useState(selected?.categoria || "");
  const [modelo, setModelo] = useState(selected?.modelo || "");

  // Filtrar modelos por categoría
  const modelosFiltrados = vehiculos.filter(v => v.categoriaId === categoria);
  const modeloSeleccionado = modelosFiltrados.find(v => v.id === modelo);

  const handleCategoria = e => {
    setCategoria(e.target.value);
    setModelo("");
    setSelected({ ...selected, categoria: e.target.value, modelo: "" });
  };
  const handleModelo = e => {
    setModelo(e.target.value);
    // Buscar el objeto completo del vehículo seleccionado
    const vehiculoObj = vehiculos.find(v => v.id === e.target.value);
    setSelected(vehiculoObj ? vehiculoObj : { ...selected, modelo: e.target.value });
  };

  return (
    <div className="step-vehiculo-form">
      <div className="vehiculo-form-top">
        <div className="vehiculo-field-group">
          <label className="vehiculo-label">Categoría de vehículo</label>
          <select className="vehiculo-input" value={categoria} onChange={handleCategoria}>
            <option value="">Selecciona una categoría de vehículo</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>
        <div className="vehiculo-field-group">
          <label className="vehiculo-label">Modelo de vehículo</label>
          <select className="vehiculo-input" value={modelo} onChange={handleModelo} disabled={!categoria}>
            <option value="">Selecciona un modelo de vehículo</option>
            {modelosFiltrados.map(v => (
              <option key={v.id} value={v.id}>
                {v.nombre} - ${v.precio.toLocaleString('es-AR')}
              </option>
            ))}
          </select>
        </div>
      </div>
      {modeloSeleccionado && (
        <div className="vehiculo-card-flat">
          <div className="vehiculo-img-flat">
            <img src={modeloSeleccionado.imagen} alt={modeloSeleccionado.nombre} />
          </div>
          <div className="vehiculo-nombre-flat">{modeloSeleccionado.nombre}</div>
          <div className="vehiculo-caracteristicas-flat">
            {(() => {
              // Solo mostrar las 3 características clave en móvil
              const keys = ["asientos", "transmision", "aire"];
              // Buscar la primera coincidencia de cada key
              const found = { asientos: null, transmision: null, aire: null };
              modeloSeleccionado.caracteristicas.forEach((car, i) => {
                if (!found.asientos && /asiento/i.test(car.texto)) found.asientos = { car, i };
                else if (!found.transmision && (/manual|autom[aá]tico/i.test(car.texto))) found.transmision = { car, i };
                else if (!found.aire && /aire/i.test(car.texto)) found.aire = { car, i };
              });
              return keys.map(key => {
                if (!found[key]) return null;
                const { car, i } = found[key];
                const Icon = iconMap[car.icono];
                return (
                  <span key={key} className="caracteristica-flat" data-car={key}>
                    {Icon && <Icon color="#1b7e3c" size={20} />} {car.texto}
                  </span>
                );
              });
            })()}
          </div>
          <div className="vehiculo-precio-flat">
            <div className="vehiculo-precio-label-flat">Precio por día</div>
            <div className="vehiculo-precio-num-flat">${modeloSeleccionado.precio.toLocaleString()}</div>
          </div>
        </div>
      )}
      <div className="vehiculo-btns-flat">
        <button type="button" onClick={onBack} className="back-btn-flat">atras</button>
        <button type="button" onClick={onNext} className="next-btn-flat" disabled={!modeloSeleccionado}>Siguiente</button>
      </div>
    </div>
  );
};

export default StepVehiculo;
