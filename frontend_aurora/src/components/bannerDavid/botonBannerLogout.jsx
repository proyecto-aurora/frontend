import React from 'react';
import PropTypes from 'prop-types';

const BotonBannerLogout = ({ icon, handleLogout }) => {
    return (
        <button className="optionContainerBtn" id="logout" onClick={handleLogout}>
            <div className="optionContainerBtnOne">
                <span className="material-symbols-outlined">{icon}</span>
                <div></div>
                <span>Cerrar Sesion</span>
            </div>
        </button>
    );
};

BotonBannerLogout.propTypes = {
    icon: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
};

export default BotonBannerLogout;
