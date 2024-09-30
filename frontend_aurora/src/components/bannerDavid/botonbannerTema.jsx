import React from 'react';
import PropTypes from 'prop-types';

const BotonBannerTema = ({icon}) => {
    return (
        <button className="optionContainerBtn">
            <div className="optionContainerBtnOne">
                <span className="material-symbols-outlined">{icon}</span>
                <div></div>
                <span>Tema Oscuro</span>
                <label className="switch">
                    <input type="checkbox" id="toggleSwitch" />
                    <span className="slider"></span>
                </label>
            </div>
        </button>
    );
};

BotonBannerTema.propTypes = {
    icon: PropTypes.string.isRequired,
  };

export default BotonBannerTema;
