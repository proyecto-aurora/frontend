import React, { useState, useEffect } from 'react';
import "../../css/login.css";
import FlechaIzquierda from "../../img/FlechaIzquierda.png";
import LogoAmericas from "../../img/LogoAmericas.png";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/authContext.jsx';
import Axios from "axios";

const LoginPage = () => {
  const [contra, setContra] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { autenticado, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (autenticado) {
      navigate('/home', { replace: true }); // Redirigir si ya está autenticado
    }
  }, [autenticado, navigate]);

  const enmascararContra = () => {
    setContra(!contra);
  };

  const logear = (event) => {
    event.preventDefault();
    Axios.post('http://172.27.90.226:8000/api/login/', {
      login: usuario,
      contrasena: password
    }).then(response => {
      console.log(response.data.message);
      const nombres = response.data.nombres
      const apellidos = response.data.apellidos
      const cargo = response.data.cargo
      login(cargo,nombres,apellidos);
      navigate('/home', { replace: true }); // Usar replace: true para reemplazar la entrada en el historial
    }).catch(error => {
      const err = error.response.data.mensaje;
      alert(err);
    });
  };

  const logeartwo = (event) =>{
    const cargo = '1'
    const nombres = 'camilo'
    const apellidos = 'castillo'
    login(cargo,nombres,apellidos);
    navigate('/home', { replace: true });
  }

  return (
    <>
      <main className='containerLogin'>
        <article className='containerLoginSonOne'>
          <form onSubmit={logear} className='FormLoginSonOne'>
            <section>
              <h1>Login</h1>
              <p>Ingrese los detalles de su cuenta</p>
            </section>
            <section className='FormLoginSonOneblock'>
              <div className="FormLoginSonOneblockOne">
                <label>
                  <input className="input" type="text" placeholder="Usuario" maxLength={20} value={usuario}
                    onChange={(e) => setUsuario(e.target.value)} required />
                  <hr />
                  <i className="bx bxs-user" />
                </label>
              </div>
              <div className="FormLoginSonOneblockTwo">
                <label>
                  <input className="input" type={contra ? "text" : "password"} placeholder="Contraseña" maxLength={25}
                    value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <hr />
                  <i className={`bx ${contra ? 'bxs-show' : 'bxs-hide'}`} onClick={enmascararContra}
                    style={{ cursor: 'pointer', color: '#fff', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                </label>
              </div>
            </section>
            <section className='FormLoginSonOneButton'>
              <button type="submit">
                <img src={FlechaIzquierda} alt="LogoIngresar" width="20px" />
                <div className='vacio'></div>
                <p>Entrar</p>
              </button>
            </section>
          </form>
        </article>
        <article className='containerLoginSonTwo'>
          <section className='LoginSonTwoName'>
            <div className='LoginSonTwoNameBox'>
              <h1>Bienvenido a AURORA</h1>
              <p>Inicia sesión para acceder a tu cuenta</p>
            </div>
          </section>
          <section className='LoginSonTwoLogo'>
            <img src={LogoAmericas} alt="LogoAmericasBps" width="800px" />
          </section>
        </article>
      </main>
    </>
  );
};

export default LoginPage;
