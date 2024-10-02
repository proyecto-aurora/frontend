import React, { useEffect, useState } from "react";
import axios from "axios";
import Cabecera from "../cabesera/cabesera";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"; 

const Usuarios = ({ nombre }) => {
    const [name, setNombre] = useState(nombre);
    const [usuarios, setUsuarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const itemsPerPage = 10;

    useEffect(() => {
        axios.get("http://172.27.90.226:8000/api/empleados/")
            .then(response => {
                setUsuarios(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsuarios = [...usuarios].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = sortedUsuarios.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(usuarios.length / itemsPerPage);

    return (
        <>
            <article className="containerFullUsers">
                <header className="containerHeader">
                    <Cabecera nombre={name} />
                    <article className="containerBuscador">
                        <section className="buscador">

                        </section>
                    </article>
                </header>
                <section className="containerListUsers">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id_empleado')}>
                                    ID {sortConfig.key === 'id_empleado' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                                </th>
                                <th onClick={() => handleSort('nombres')}>
                                    Nombres {sortConfig.key === 'nombres' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                                </th>
                                <th onClick={() => handleSort('apellidos')}>
                                    Apellidos {sortConfig.key === 'apellidos' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                                </th>
                                <th onClick={() => handleSort('login')}>
                                    Login {sortConfig.key === 'login' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                                </th>
                                <th onClick={() => handleSort('correo_electronico')}>
                                    Correo {sortConfig.key === 'correo_electronico' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                                </th>
                                <th onClick={() => handleSort('estados_id_estados')}>
                                    Estado {sortConfig.key === 'estados_id_estados' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                                </th>
                                <th onClick={() => handleSort('cargo')}>
                                    Rol {sortConfig.key === 'cargo' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                                </th>
                                <th onClick={() => handleSort('area_id_area')}>
                                    Área {sortConfig.key === 'area_id_area' ? (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />) : <FaSort />}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map(usuario => (
                                <tr key={usuario.id_empleado}>
                                    <td>{usuario.id_empleado}</td>
                                    <td>{usuario.nombres}</td>
                                    <td>{usuario.apellidos}</td>
                                    <td>{usuario.login}</td>
                                    <td>{usuario.correo_electronico}</td>
                                    <td>{usuario.estados_id_estados === 1 ? "Activo" : "Inactivo"}</td>
                                    <td>{usuario.cargo === 1 ? "Administrador" : usuario.cargo === 2 ? "Ingeniero" : usuario.cargo === 3 ? "Gerente" : "Desconocido"}</td>
                                    <td>{usuario.area_id_area === 1 ? "Tecnología" : usuario.area_id_area === 2 ? "Contabilidad" : usuario.area_id_area === 3 ? "Soporte" : usuario.area_id_area === 4 ? "Talento Humano" : usuario.area_id_area === 5 ? "BI" : "Desconocido"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <div className="pagination">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                    {[...Array(totalPages).keys()].map(page => (
                        <button key={page + 1} onClick={() => setCurrentPage(page + 1)} className={currentPage === page + 1 ? 'active' : ''}>{page + 1}</button>
                    ))}
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
                </div>
            </article>
        </>
    );
}

export default Usuarios;
