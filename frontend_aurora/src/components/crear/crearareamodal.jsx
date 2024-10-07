import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../css/modalCrear.css";

const CrearAreaModal = ({ isOpen, onClose, onCreate, estados }) => {
  const [nombreArea, setNombreArea] = useState("");
  const [descripcionArea, setDescripcionArea] = useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");

  if (!isOpen) {
    return null; // No mostrar el modal si no está abierto
  }

  const handleCreate = () => {
    if (nombreArea && descripcionArea && estadoSeleccionado) {
      const nuevaArea = {
        nombre_area: nombreArea,
        descripcion_area: descripcionArea,
        estados_id_estados: parseInt(estadoSeleccionado), // Aseguramos que sea un número
      };
      onCreate(nuevaArea); // Enviar la nueva área al backend
      setNombreArea(""); // Limpiar el campo de nombre
      setDescripcionArea(""); // Limpiar el campo de descripción
      setEstadoSeleccionado(""); // Limpiar el estado seleccionado
    }
  };

  return (
    <div className="mainModal">
      <h2>Nueva Área</h2>
      <hr />
      <label className="labelCampo">Nombre</label>
      <input
        type="text"
        placeholder="Digita el nombre del área"
        value={nombreArea}
        onChange={(e) => setNombreArea(e.target.value)}
        className="campoImput"
      />

      <label className="labelCampo">Descripción</label>
      <textarea
        placeholder="Digita descripción del área"
        value={descripcionArea}
        onChange={(e) => setDescripcionArea(e.target.value)}
        className="campoImput"
        style={{ height: "80px" }}
      />

      <label className="labelCampo">Estado</label>
      <select
        value={estadoSeleccionado}
        onChange={(e) => setEstadoSeleccionado(e.target.value)}
        className="campoImput"
      >
        <option value="" disabled>
          Selecciona el estado
        </option>
        {estados.map((estado) => (
          <option key={estado.id_estados} value={estado.id_estados}>
            {estado.nombre_estado}
          </option>
        ))}
      </select>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onClose} className="btnCancelar">
          Cancelar
        </button>
        <button onClick={handleCreate} className="btnCrear">
          Crear Área
        </button>
      </div>
    </div>
  );
};

CrearAreaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  estados: PropTypes.array.isRequired,
};

export default CrearAreaModal;
