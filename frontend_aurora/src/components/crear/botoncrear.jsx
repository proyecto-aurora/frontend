import { useState } from 'react';
import { FaPlus } from 'react-icons/fa'; // Ícono de suma
 
const CrearAreaButton = ({ onClick }) => {
  return (
<button onClick={onClick} className='BotonCrear'>
  <FaPlus style={{ color: 'white', fontSize: '20px' }} />
</button>
  );
};
 
export default CrearAreaButton;