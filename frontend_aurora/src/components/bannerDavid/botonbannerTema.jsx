import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BotonBannerTema = ({icon}) => {
    const [theme, setTheme] = useState('light')

    useEffect(()=> {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
        document.documentElement.setAttribute('data-theme', storedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button className="optionContainerBtn" onClick={toggleTheme}>
            <div className='optionContainerBtnOne'>
                <span className="material-symbols-outlined" style={{ marginRight: '8px' }}>
                    {theme === 'light' ? 'dark_mode' : 'light_mode'}
                </span>
                {theme === 'light' ? 'Tema Oscuro' : 'Tema claro'}
            </div>
        </button>
    );
};

BotonBannerTema.propTypes = {
    icon: PropTypes.string.isRequired,
  };

export default BotonBannerTema;
