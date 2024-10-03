import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Cabecera from "../cabesera/cabesera";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"; // Iconos de ordenación
import "../../css/areas.css";
import BotonCrear from "../crear/botoncrear"; // Importa tu botón
import CrearAreaModal from "../crear/crearareamodal"; // Importa tu modal
 
const API_URL = "http://172.27.90.226:8000/api/area/";
 
const Areas = ({ nombre }) => {
  const [name, setNombre] = useState(nombre);
  const [areas, setAreas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // Estado para manejar la visibilidad del modal
  const [estados, setEstados] = useState([]); // Estado para los estados
 
  const itemsPerPage = 10;
 
  // Definición de las columnas para la tabla
  const columns = [
    { label: "ID", key: "id_area" },
    { label: "Nombre Área", key: "nombre_area" },
    { label: "Descripción Área", key: "descripcion_area" },
    { label: "Fecha Creada", key: "fecha_creada" },
    { label: "Fecha Actualización", key: "fecha_actualizacion" },
    { label: "Estado", key: "estados_id_estados" },
  ];
 
  useEffect(() => {
    let isMounted = true;
    // Obtener áreas
    axios
      .get(API_URL)
      .then((response) => {
        if (isMounted) {
          setAreas(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error("There was an error fetching the data!", error);
          setError("No se pudo obtener la lista de áreas. Inténtalo de nuevo más tarde.");
          setLoading(false);
        }
      });
 
    // Obtener estados
    axios
      .get("http://172.27.90.226:8000/api/estados/")
      .then((response) => {
        if (isMounted) {
          setEstados(response.data);
          console.log(estados)
        }
      })
      .catch((error) => {
        console.error("Error fetching estados", error);
      });
 
    return () => {
      isMounted = false;
    };
  }, []);
 
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
 
  const sortedAreas = useMemo(() => {
    if (!sortConfig.key) return areas;
    return [...areas].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
 
      // Manejar fechas
      if (sortConfig.key.includes("fecha")) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
 
      // Convertir los textos a minúsculas para evitar errores al ordenar
      if (typeof aValue === "string") aValue = aValue.toLowerCase();
      if (typeof bValue === "string") bValue = bValue.toLowerCase();
 
      // Manejar datos null o undefined
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
 
      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
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
<li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
<button
            className="page-link"
            onClick={() => setCurrentPage(i)}
            aria-current={currentPage === i ? "page" : undefined}
>
            {i}
</button>
</li>
      );
    }
 
    return buttons;
  };
 
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
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
<>
<article className="containerFullAreas">
<header className="containerHeader">
<Cabecera nombre={nombre} />
<article className="containerBuscador">
<section className="buscador d-flex justify-content-between align-items-center">
<span className="textoBuscador">Buscar {nombre}</span>
<div className="d-flex align-items-center" style={{ marginLeft: "20px" }}>
<BotonCrear onClick={openModal} /> {/* Botón para abrir el modal */}
</div>
</section>
</article>
 
          {/* Aquí agregamos el modal */}
          {modalVisible && (
<CrearAreaModal
              isOpen={modalVisible}
              onClose={closeModal}
              onCreate={handleCreateArea}
              estados={estados}
            />
          )}
 
          {/* Aquí va tu tabla de áreas y el resto del contenido */}
          {loading && <p>Cargando...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && (
<table className="table table-bordered">
<thead>
<tr>
                  {columns.map((column) => (
<th key={column.key} onClick={() => handleSort(column.key)}>
                      {column.label}
                      {sortConfig.key === column.key ? (
                        sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />
                      ) : (
<FaSort />
                      )}
</th>
                  ))}
</tr>
</thead>
<tbody>
                {currentAreas.map((area) => (
<tr key={area.id_area}>
<td>{area.id_area}</td>
<td>{area.nombre_area}</td>
<td>{area.descripcion_area}</td>
<td>{formatDate(area.fecha_creada)}</td>
<td>{formatDate(area.fecha_actualizacion)}</td>
<td>{area.estados_id_estados}</td>
</tr>
                ))}
</tbody>
</table>
          )}
<nav>
<ul className="pagination">{getPaginationButtons()}</ul>
</nav>
</header>
</article>
</>
  );
};
 
export default Areas;