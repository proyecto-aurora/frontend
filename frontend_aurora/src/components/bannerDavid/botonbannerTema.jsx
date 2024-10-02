import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BotonBannerTema = ({icon}) => {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <button className="optionContainerBtn" onClick={toggleTheme}>
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
