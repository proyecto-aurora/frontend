import React from 'react';
import "../../css/paginacion.css"

const Pagination = ({ currentPage, totalPages, setCurrentPage, getPaginationButtons }) => {
    return (
        <nav aria-label="Paginacion de areas" className="paginacion">
            <ul className="pagination">
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
    );
}

export default Pagination;
