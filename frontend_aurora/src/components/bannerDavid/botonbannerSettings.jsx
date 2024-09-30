import React from 'react';
import PropTypes from 'prop-types';

const BotonBannerSettings = ({ icon, texto }) => {
  return (
    <button className="optionContainerBtn">
      <div className="optionContainerBtnOne">
        <span className="material-symbols-outlined">{icon}</span>
        <div></div>
        <span>{texto}</span>
      </div>
    </button>
  );
};

BotonBannerSettings.propTypes = {
  icon: PropTypes.string.isRequired,
  texto: PropTypes.string.isRequired,
};

export default BotonBannerSettings;
