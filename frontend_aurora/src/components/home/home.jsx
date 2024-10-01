import Banner from "../bannerDavid/banner";
import { useState } from "react";
import Usuarios from "../usuarios/usuarios.jsx"
import Areas from "../areas/areas.jsx";
import Roles from "../roles/roles";
import "../../css/cabecera.css"
import "../../css/usuarios.css"
import "../../css/areas.css.css"

const Home = () => {
    const [showContainer, setShowContainer] = useState(false);
    const [opcion, setOpcion] = useState('');

    const handleOptionSelect = (option) => {
        setShowContainer(true);
        setOpcion(option);
    };

    const renderComponent = () => {
        switch (opcion) {
            case 'Usuarios':
                return <Usuarios nombre={opcion}/>;
            case 'Areas':
                return <Areas nombre={opcion}/>;
            case 'Roles':
                return <Roles nombre={opcion}/>;
            default:
                return <p>Seleccione una opción del menú</p>; 
        }
    };

    return (
        <>
            <Banner onOptionSelect={handleOptionSelect} />
            <main>
                {showContainer ? renderComponent() : <p>Elige una opción para mostrar el contenido</p>}
            </main>
        </>
    );
};

export default Home;
