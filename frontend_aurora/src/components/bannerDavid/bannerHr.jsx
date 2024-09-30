const LineaDivider = () => {
    return (
        <>
            <hr style={{
                width: "80%",
                height: "1px",
                backgroundColor: "#ffffff", // Sin !important, pero alta prioridad
                opacity: 0.6,
                border: "none", // Elimina cualquier borde predeterminado
                display: "block", // Asegura que se comporte como un bloque
                margin: "0 auto", // Centra el divider horizontalmente
            }} />
        </>
    );
};

export default LineaDivider;
