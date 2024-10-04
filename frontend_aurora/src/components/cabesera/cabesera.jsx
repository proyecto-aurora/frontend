import React from "react";
import PropTypes from "prop-types";
import BotonCrear from "../crear/botoncrear"
import '../../css/cabecera.css'

const Cabecera = ({nombre, onCreate}) => {
    return (
        <header className="containerHeader">
            <article className="containerTitle">
                <h1>{nombre}</h1>
            </article>
            <hr className="lineDivision" />
            <article className="containerBuscador">
                    {/*Agregar sistema de busqueda aqui*/}
                    <input className="buscador" type="text" placeholder={`Buscar ${nombre}`}/>
                <BotonCrear onClick={onCreate}/>
            </article>
        </header>
    )
};

Cabecera.PropTypes = {
    nombre: PropTypes.string.isRequired,
    onCreate: PropTypes.func.isRequired,
}

export default Cabecera