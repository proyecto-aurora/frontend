import { useState } from 'react';
import { FaPlus } from 'react-icons/fa'; // Ícono de suma
 
const CrearAreaButton = ({ onClick }) => {
  return (
<button onClick={onClick} style={{ 
      backgroundColor: '#E67E22', 
      borderRadius: '50%', 
      width: '50px', 
      height: '50px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      border: 'none', 
      cursor: 'pointer' 
    }}>
<FaPlus style={{ color: 'white', fontSize: '20px' }} />
</button>
  );
};
 
export default CrearAreaButton;