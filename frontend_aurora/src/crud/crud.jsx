import React, { useState, useEffect } from 'react';

// Lista de estados. Esto debería venir de tu API si es posible.
const estados = [
  { id: 1, nombre: 'Activo' },
  { id: 2, nombre: 'Inactivo' },
];

const AreaCRUD = () => {
  const [areas, setAreas] = useState([]);
  const [formData, setFormData] = useState({
    nombre_area: '',
    descripcion_area: '',
    estados_id_estados: '',
    fecha_creada: '',
    fecha_actualizacion: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/area/');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setAreas(data);
    } catch (error) {
      console.error('Error fetching areas:', error);
      setError('Failed to fetch areas. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const url = editingId
        ? `http://127.0.0.1:8000/api/area/${editingId}/`
        : 'http://127.0.0.1:8000/api/area/';
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to save');
      await fetchAreas();
      setFormData({
        nombre_area: '',
        descripcion_area: '',
        estados_id_estados: '',
        fecha_creada: '',
        fecha_actualizacion: '',
      });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving area:', error);
      setError('Failed to save area. Please try again.');
    }
  };

  const handleEdit = (area) => {
    setFormData({
      nombre_area: area.nombre_area,
      descripcion_area: area.descripcion_area,
      estados_id_estados: area.estados_id_estados,
      fecha_creada: new Date(area.fecha_creada).toISOString().split('T')[0],
      fecha_actualizacion: new Date(area.fecha_actualizacion).toISOString().split('T')[0],
    });
    setEditingId(area.id_area);
  };

  const handleDelete = async (id) => {
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/area/${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      await fetchAreas();
    } catch (error) {
      console.error('Error deleting area:', error);
      setError('Failed to delete area. Please try again.');
    }
  };

  // Nueva función para habilitar/deshabilitar un área
  const toggleEstado = async (area) => {
    setError(null);
    try {
      const newEstado = area.estados_id_estados === 1 ? 2 : 1;
      const response = await fetch(`http://127.0.0.1:8000/api/area/${area.id_area}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...area, estados_id_estados: newEstado }),
      });
      if (!response.ok) throw new Error('Failed to toggle estado');
      await fetchAreas();
    } catch (error) {
      console.error('Error toggling estado:', error);
      setError('Failed to toggle estado. Please try again.');
    }
  };

  // Función para obtener el nombre del estado
  const getEstadoNombre = (id) => {
    const estado = estados.find(e => e.id === id);
    return estado ? estado.nombre : 'Unknown';
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Administración de Área</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          name="nombre_area"
          value={formData.nombre_area}
          onChange={handleInputChange}
          placeholder="Nombre del Área"
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          name="descripcion_area"
          value={formData.descripcion_area}
          onChange={handleInputChange}
          placeholder="Descripción"
          className="border p-2 mr-2"
          required
        />
        <select
          name="estados_id_estados"
          value={formData.estados_id_estados}
          onChange={handleInputChange}
          className="border p-2 mr-2"
          required
        >
          <option value="">Seleccione Estado</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {estado.nombre}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="fecha_creada"
          value={formData.fecha_creada}
          onChange={handleInputChange}
          placeholder="Fecha de Creación"
          className="border p-2 mr-2"
          
        />
        <input
          type="date"
          name="fecha_actualizacion"
          value={formData.fecha_actualizacion}
          onChange={handleInputChange}
          placeholder="Fecha de Actualización"
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingId ? 'Actualizar' : 'Crear'} área
        </button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Fecha de Creación</th>
            <th className="border p-2">Fecha de Actualización</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((area) => (
            <tr key={area.id_area}>
              <td className="border p-2">{area.id_area}</td>
              <td className="border p-2">{area.nombre_area}</td>
              <td className="border p-2">{area.descripcion_area}</td>
              <td className="border p-2">{getEstadoNombre(area.estados_id_estados)}</td>
              <td className="border p-2">{new Date(area.fecha_creada).toLocaleDateString()}</td>
              <td className="border p-2">{new Date(area.fecha_actualizacion).toLocaleDateString()}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(area)} className="bg-yellow-500 text-white p-2 mr-2 rounded">
                  Editar
                </button>
                <button onClick={() => toggleEstado(area)} className={`bg-${area.estados_id_estados === 1 ? 'red' : 'green'}-500 text-white p-2 mr-2 rounded`}>
                  {area.estados_id_estados === 1 ? 'Deshabilitar' : 'Habilitar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AreaCRUD;
