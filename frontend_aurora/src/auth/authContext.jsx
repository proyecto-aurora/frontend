// authContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(false);
  const [userData, setUserData] = useState({
    cargo: '',
    nombres: '',
    apellidos: ''
  });

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
      setAutenticado(true);
    }
  }, []);

  const login = (cargo, nombres, apellidos) => {
    const newUserData = { cargo, nombres, apellidos };
    setUserData(newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));
    setAutenticado(true);
  };

  const logout = () => {
    setUserData({ cargo: '', nombres: '', apellidos: '' });
    localStorage.removeItem('userData');
    setAutenticado(false);
  };

  return (
    <AuthContext.Provider value={{ autenticado, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
