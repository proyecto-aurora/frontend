import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Cabecera from "../cabesera/cabesera";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"; // Iconos de ordenación
import "../../css/areas.css";

const API_URL = "http://172.27.90.226:8000/api/area/"

const Areas = ({ nombre }) => {
    const [name, setNombre] = useState(nombre);
    const [areas, setAreas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 10;

    // Definición de las columnas para la tabla
    const columns = [
        { label: 'ID', key: 'id_area' },
        { label: 'Nombre Área', key: 'nombre_area' },
        { label: 'Descripción Área', key: 'descripcion_area' },
        { label: 'Fecha Creada', key: 'fecha_creada' },
        { label: 'Fecha Actualización', key: 'fecha_actualizacion' },
        { label: 'Estado', key: 'estados_id_estados' },
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
        return ()=> {
            isMounted = false
        };
    }, []);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedAreas = useMemo(() => {
        if(!sortConfig.key) return areas;
        return [...areas].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Manejar fechas
            if (sortConfig.key.includes('fecha')) {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            //Convertir los textos a minusculas para evitar errores al ordenar
            if(typeof aValue === 'string') aValue = aValue.toLowerCase();
            if(typeof bValue === 'string') bValue = bValue.toLowerCase();

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

    return (
        <>
            <article className="containerFullAreas">
                <header className="containerHeader">
                    <Cabecera nombre={nombre} />
                    <article className="containerBuscador">
                        <section className="buscador">
                            <span className="textoBuscador">Buscar {nombre}</span>
                        </section>
                    </article>
                </header>
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
                                            className="sortable"
                                            >
                                                {column.label}{" "}
                                                {sortConfig.key === column.key ?
                                                (sortConfig.direction ==='ascending' ?
                                                <FaSortUp/> : <FaSortDown/> ) : (<FaSort/>)}
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
                    <nav aria-label="Paginacion de areas" className="paginacion">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} aria-label="Anterior">
                                    Anterior
                                </button>
                            </li>
                            {getPaginationButtons()}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} aria-label="Siguiente">
                                    Siguiente
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </article>
        </>
    );
}

export default Areas