import { useState } from "react";
import Cabecera from "../cabesera/cabesera";
import TituloBuscador from "../cabesera/tituloBuscador";

const Areas = ({ nombre }) => {
    const [name, setNombre] = useState(nombre)
    return (
        <>
            <article className="containerFullUsers">
                <header className="containerHeader">
                    <Cabecera nombre={name} />
                    <article className="containerBuscador">
                        <TituloBuscador nombre={name} />
                        <section className="buscador">

                        </section>
                    </article>
                </header>
                <section className="containerListUsers">

                </section>
            </article>
        </>
    );
}

export default Areas