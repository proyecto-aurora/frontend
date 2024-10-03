import React, { useState } from 'react';
import PropTypes from 'prop-types';
 
const CrearAreaModal = ({ isOpen, onClose, onCreate, estados }) => {
  const [nombreArea, setNombreArea] = useState('');
  const [descripcionArea, setDescripcionArea] = useState('');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
 
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
      setNombreArea(''); // Limpiar el campo de nombre
      setDescripcionArea(''); // Limpiar el campo de descripción
      setEstadoSeleccionado(''); // Limpiar el estado seleccionado
    }
  };
 
  return (
<div style={{
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      width: '515px', height: 'auto', backgroundColor: '#2D2D2D', border: '1px solid #7F8C8D',
      padding: '20px', boxSizing: 'border-box'
    }}>
<h2 style={{ textAlign: 'center', color: '#E67E22', marginBottom: '20px' }}>Nueva Área</h2>
<hr style={{ width: '460px', height: '2px', backgroundColor: '#F5F5DC', border: 'none', marginBottom: '20px' }} />
<label style={{ color: '#F5F5DC', display: 'block', marginBottom: '10px' }}>Nombre</label>
<input
        type="text"
        placeholder="Digita el nombre del área"
        value={nombreArea}
        onChange={(e) => setNombreArea(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '20px', border: '1px solid #000' }}
      />
 
      <label style={{ color: '#F5F5DC', display: 'block', marginBottom: '10px' }}>Descripción</label>
<textarea
        placeholder="Digita descripción del área"
        value={descripcionArea}
        onChange={(e) => setDescripcionArea(e.target.value)}
        style={{ width: '100%', padding: '8px', height: '80px', marginBottom: '20px', border: '1px solid #000' }}
      />
 
      <label style={{ color: '#F5F5DC', display: 'block', marginBottom: '10px' }}>Estado</label>
<select
        value={estadoSeleccionado}
        onChange={(e) => setEstadoSeleccionado(e.target.value)}
        style={{ width: '100%', padding: '8px', border: '1px solid #000', marginBottom: '20px' }}
>
<option value="" disabled>Selecciona el estado</option>
        {estados.map((estado) => (
<option key={estado.id_estados} value={estado.id_estados}>{estado.nombre_estado}</option>
        ))}
</select>
 
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
<button
          onClick={onClose}
          style={{ backgroundColor: '#E67E22', color: '#fff', padding: '10px', border: 'none', cursor: 'pointer' }}
>
          Cancelar
</button>
<button
          onClick={handleCreate}
          style={{ backgroundColor: '#2ECC71', color: '#fff', padding: '10px', border: 'none', cursor: 'pointer' }}
>
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