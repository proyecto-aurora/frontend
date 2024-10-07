import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Cabecera from "../cabesera/cabesera";
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash } from "react-icons/fa"; // Iconos de ordenación
import "../../css/areas.css";
import CrearAreaModal from "../crear/crearareamodal"
import Pagination from "../Paginado/Paginacion";
 
const API_URL = "http://172.27.90.226:8000/api/area/"
 
const Areas = ({ nombre }) => {
    const [name, setNombre] = useState(nombre);
    const [areas, setAreas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [estados, setEstados] = useState([]);

    const itemsPerPage = 10;

    // Definición de las columnas para la tabla
    const columns = [
        { label: 'ID', key: 'id_area' },
        { label: 'Nombre Área', key: 'nombre_area' },
        { label: 'Descripción Área', key: 'descripcion_area' },
        { label: 'Fecha Creada', key: 'fecha_creada' },
        { label: 'Fecha Actualización', key: 'fecha_actualizacion' },
        { label: 'Estado', key: 'estados_id_estados' },
        { label: 'Acciones', key: 'acciones'}
    ];
  
    useEffect(() => {
        let isMounted = true;
        axios.get(API_URL)
            .then(response => {
                if (isMounted) {
                    setAreas(response.data);
                    setLoading(false);
                }
            })
            .catch(error => {
                if (isMounted) {
                    console.error("There was an error fetching the data!", error);
                    setError("No se pudo obtener la lista de areas.  Intántalo de nuevo más tarde.")
                    setLoading(false)
                }
            });

            //Obtener estados
            axios.get("http://172.27.90.226:8000/api/estados/")
            .then(response => {
              if (isMounted){
                setEstados(response.data)
              }
            })
        return () => {
            isMounted = false;
        };
    }, []);
 
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleEdit = (area) => {
      console.log("Editar area: ", area);
    };

    // Función para manejar la eliminación de un área
    const handleDelete = async (id) => {
      if (window.confirm("¿Estás seguro de que deseas eliminar esta área?")) {
          try {
              await axios.delete(`${API_URL}${id}/`);
              // Actualizar la lista de áreas después de la eliminación
              setAreas(prevAreas => prevAreas.filter(area => area.id_area !== id));
              console.log("Área eliminada:", id);
          } catch (error) {
              console.error("Error al eliminar el área:", error);
              setError("No se pudo eliminar el área. Inténtalo de nuevo.");
          }
      }
    };

    const sortedAreas = useMemo(() => {
        if (!sortConfig.key) return areas;
        return [...areas].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];
 
            // Manejar fechas
            if (sortConfig.key.includes('fecha')) {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }
 
            //Convertir los textos a minusculas para evitar errores al ordenar
            if (typeof aValue === 'string') aValue = aValue.toLowerCase();
            if (typeof bValue === 'string') bValue = bValue.toLowerCase();
 
            //Manejar datos null o undefined
            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;
 
            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [areas, sortConfig]);
   
    const indexOfLastArea = currentPage * itemsPerPage;
    const indexOfFirstArea = indexOfLastArea - itemsPerPage;
    const currentAreas = useMemo(() => {
        return sortedAreas.slice(indexOfFirstArea, indexOfLastArea);
    }, [sortedAreas, indexOfFirstArea, indexOfLastArea]);
 
    const totalPages = Math.ceil(areas.length / itemsPerPage);
 
    const getPaginationButtons = () => {
        const buttons = [];
        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = startPage + maxButtons - 1;
 
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxButtons + 1);
        }
 
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(i)} aria-current={currentPage === i ? 'page' : undefined}>
                        {i}
                    </button>
                </li>
            );
        }
 
        return buttons;
    };
 
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Función para abrir el modal
    const openModal = () => {
      setModalVisible(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setModalVisible(false);
    };

    // Función para crear un área
    const handleCreateArea = async (nuevaArea) => {
        try {
            const response = await axios.post(API_URL, nuevaArea);
            if (response.status === 201) {
                setAreas((prevAreas) => [...prevAreas, response.data]); // Agregar nueva área a la lista
                closeModal(); // Cerrar el modal después de crear el área
            }
        } catch (error) {
            console.error("Error al crear el área:", error);
            setError("No se pudo crear el área. Inténtalo de nuevo.");
        }
    };
 
    return (
        <main className="mainContainer">
            <article className="containerFullAreas">
                <header className="containerHeader">
                    <Cabecera nombre={nombre} onCreate={openModal}/>
                </header>
                {modalVisible && (
                  <CrearAreaModal isOpen={modalVisible} onClose={closeModal} onCreate={handleCreateArea} estados={estados}/>
                )}
                <section className="containerList">
                    {error && (
                        <div className="alerta" role="alert">
                            {error}
                        </div>
                    )}
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                            <div className="spinner-border" role="status" aria-label="Cargando">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    ) : (
                        <table className="tabla" aria-label="Lista de areas">
                            <thead>
                                <tr>
                                    {columns.map(column => (
                                        <th
                                            key={column.key}
                                            onClick={() => handleSort(column.key)}
                                            role="button"
                                            aria-sort={sortConfig.key === column.key ? sortConfig.direction : 'none'}
                                            className={column.key !== 'acciones' ? "sortable" : ""}
                                            >
                                                {column.label}{" "}
                                                {column.key !== 'acciones' && (
                                                  sortConfig.key === column.key ?
                                                  (sortConfig.direction ==='ascending' ?
                                                  <FaSortUp/> : <FaSortDown/> ) : (<FaSort/>)
                                                )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentAreas.length > 0 ? (
                                    currentAreas.map(area => (
                                    <tr key={area.id_area}>
                                        <td>{area.id_area}</td>
                                        <td>{area.nombre_area}</td>
                                        <td>{area.descripcion_area}</td>
                                        <td>{formatDate(area.fecha_creada)}</td>
                                        <td>{formatDate(area.fecha_actualizacion)}</td>
                                        <td>{area.estados_id_estados === 1 ? "Activo" : "Inactivo"}</td>
                                        <td>
                                          <button className="btn-edit" onClick={() => handleEdit(area)}>
                                            <FaEdit style={{ color: 'green', fontSize: '20px' }} />
                                          </button>
                                          <button className="btn-delete" onClick={() => handleDelete(area.id_area)}>
                                            <FaTrash style={{ color: 'red', fontSize: '20px' }} />
                                          </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="text-center">
                                        No hay {nombre} disponibles.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        )}
                    </section>
                {!loading && !error && (
                    <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    getPaginationButtons={getPaginationButtons}
                    />
                )}
            </article>
        </main>
    );
}
 
export default Areas