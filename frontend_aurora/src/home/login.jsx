import React, { useState, useEffect } from 'react';
import logo from '../home/img/img1.png'

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [message, setMessage] = useState('');
  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    // Función para obtener los cargos desde la API
    const fetchCargos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/cargo/');
        if (response.ok) {
          const data = await response.json();
          setCargos(data); // Asigna los cargos obtenidos al estado
        } else {
          console.error('Error al obtener los cargos:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud de cargos:', error);
      }
    };

    fetchCargos(); // Llama a la función cuando el componente se monta
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password, userType }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Login successful');
        console.log('Login successful:', data);
      } else {
        const error = await response.json();
        setMessage(error.message || 'Login failed');
        console.error('Login failed:', error);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex h-screen">
      
      <div className="w-1/2 bg-gray-900 flex flex-col justify-center items-center p-8">
        <h1 className="text-5xl font-bold text-white mb-2">Login</h1>
        <p className="text-gray-400 mb-8">Ingrese los detalles de su cuenta</p>
        <div className="w-full max-w-xs">
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="login">Login</label>
            <div className="relative">
              <input
                className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-pink-500"
                id="login"
                placeholder="Login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <i className="fas fa-user absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="password">Contraseña</label>
            <div className="relative">
              <input
                className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-pink-500"
                id="password"
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fas fa-eye-slash absolute right-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="userType">Tipo de usuario</label>
            <select
              className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-pink-500"
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option className="su">Seleccione un tipo de usuario</option>
              {cargos.map((cargo) => (
                <option className='cg' key={cargo.id} value={cargo.cargo}>{cargo.cargo}</option>
              ))}
            </select>
          </div>
          <button
            className="w-full bg-pink-600 text-white py-2 rounded btn-hover"
            onClick={handleLogin}
          >
            Entrar
          </button>
          {message && <p className="mt-4 text-white">{message}</p>}
        </div>
      </div>
      
      <div className="w-1/2 bg-gradient-to-r from-purple-800 to-pink-600 flex flex-col justify-center items-center p-8">
        <h1 className="text-5xl font-bold text-white mb-2">
          Bienvenido a <span className="text-pink-500">AURORA</span>
        </h1>
        <p className="text-gray-200 mb-8">Inicia sesión para acceder a tu cuenta</p>
        <img className='logoame'
         src={logo}
         
        />
       
        </div>
      </div>
    
  );
};

export default LoginPage;