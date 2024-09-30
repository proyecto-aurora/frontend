import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BotonBanner = ({ icon, texto, opciones = [], evento }) => {
    const [showOptions, setShowOptions] = useState(false);

    const handleMouseEnter = () => {
        setShowOptions(true);
    };

    const handleMouseLeave = () => {
        setShowOptions(false);
    };

    const handleOptionClick = (opcion) => {
        if (evento) {
            evento(opcion); // Llama al evento con la opción seleccionada
        }
    };

    return (
        <div
            className="optionContainerBtn"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="optionContainerBtnOne">
                <span className="material-symbols-outlined">{icon}</span>
                <div></div>
                <span>{texto}</span>
                <div className="arrow"><box-icon name='chevron-up' color='#ffff'></box-icon></div>
            </div>
            {opciones.length > 0 && (
                <div className={`dropdownOptions ${showOptions ? 'show' : 'hide'}`}>
                    {opciones.map((opcion, index) => (
                        <div key={index} className="dropdownOption" onClick={() => handleOptionClick(opcion)}>
                            {opcion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

BotonBanner.propTypes = {
    icon: PropTypes.string.isRequired,
    texto: PropTypes.string.isRequired,
    opciones: PropTypes.arrayOf(PropTypes.string),
    evento: PropTypes.func, // Evento como prop
};

export default BotonBanner;
