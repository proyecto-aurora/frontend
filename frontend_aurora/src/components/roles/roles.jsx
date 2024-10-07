import { useState } from "react";
import Cabecera from "../cabesera/cabesera";

const Roles = ({ nombre }) => {
    const [name, setNombre] = useState(nombre)
    return (
        <>
            <article className="containerFullUsers">
                <header className="containerHeader">
                    <Cabecera nombre={name} />
                    <article className="containerBuscador">
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

export default Roles;