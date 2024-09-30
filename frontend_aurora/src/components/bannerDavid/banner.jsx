import React, { useState, useEffect } from 'react';
import "../../css/banner.css";
import { useAuth } from "../../auth/authContext.jsx";
import { useNavigate } from "react-router-dom";
import Avatar from "../../img/avatar.png";
import BotonBanner from './botonbanner.jsx';
import BotonBannerTema from './botonbannerTema.jsx';
import BotonBannerLogout from './botonBannerLogout.jsx';
import BotonBannerSettings from './botonbannerSettings.jsx';
import LineaDivider from './bannerHr.jsx';

const Banner = ({ onOptionSelect }) => {
    const { logout, userData } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState(userData.nombres);
    const [lastName, setLastName] = useState(userData.apellidos);

    useEffect(() => {
        if (userData.nombres && userData.apellidos) {
            setName(userData.nombres);
            setLastName(userData.apellidos);
        } else {
            const storedUserData = JSON.parse(localStorage.getItem('userData'));
            if (storedUserData) {
                setName(storedUserData.nombres);
                setLastName(storedUserData.apellidos);
            }
        }
    }, [userData]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <>
            <aside className="ExplorerContainer">
                <article className="UsuarioContainer">
                    <section className="Tittle">AURORA</section>
                    <LineaDivider/>
                    <section className="menu-item">
                        <div className="avatar"
                            style={{
                                backgroundImage: `url(${Avatar})`,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}
                        ></div>
                        <div className="UserContDatos">
                            <span className="TextDesc">Administrador</span>
                            <span className="TextName">
                                {name} {lastName}
                            </span>
                        </div>
                    </section>
                    <LineaDivider/>
                </article>
                <article className="optionsContainer">

                    <BotonBanner icon="groups" texto="Area" opciones={['Usuarios', 'Roles', 'Areas']} evento={onOptionSelect} />
                    <BotonBanner icon="folder" texto="Proyectos" />
                    <BotonBanner icon="monitoring" texto="Control" />
                    <BotonBanner icon="archive" texto="Documentos" />
                    <BotonBanner icon="language" texto="Base de conocimiento" />

                </article>

                <article className="settingsContainer">

                    <LineaDivider/>
                    <br />
                    <BotonBannerSettings icon="settings" texto="Ajustes" />
                    <BotonBannerTema icon='dark_mode' />
                    <br />
                    <LineaDivider/>
                    <br />
                    <BotonBannerSettings icon="help" texto="Ayuda" />
                    <BotonBannerLogout icon='logout' handleLogout={handleLogout} />
                </article>
            </aside >
        </>
    );
};

export default Banner;
