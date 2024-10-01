import "./login.css";

const BarraExplorer = () => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Aladin&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css"></link>
            <div className="ExplorerContainer">
                <div className="UsuarioContainer">
                    <div className="Tittle">AURORA</div>

                    <hr className="Divider" />
                    <div className="menu-item">
                        <i className="icon">��</i>
                        <div className="UserContDatos">
                            <span className="TextDesc">Administrador</span>
                            <span className="TextName">David Felipe Ramirez Martin</span>
                        </div>
                    </div>
                    
                    <hr className="Divider" />

                    <div className="menu-item">
                        <i class="bi bi-people" id="settings-icon"></i>
                        <span className="TextLight">Area</span>
                    </div>

                    <div className="menu-item">
                        <i class="bi bi-folder" id="settings-icon"></i>
                        <span className="TextLight">Proyectos</span>
                    </div>

                    <div className="menu-item">
                        <i class="bi bi-bar-chart-steps" id="settings-icon"></i>
                        <span className="TextLight">Control</span>
                    </div>

                    <div className="menu-item">
                        <i class="bi bi-file-earmark-text" id="settings-icon"></i>
                        <span className="TextLight">Documentos</span>
                    </div>

                    <div className="menu-item">
                        <i class="bi bi-archive" id="settings-icon"></i>
                        <span className="TextLight">Base de Conocimiento</span>
                    </div>
                </div>

                <div className="OptionsContainer">
                    <hr className="Divider" />
                    <div className="menu-item">
                        <i class="bi bi-gear" id="settings-icon"></i>
                        <div className="TextLight">Ajustes</div>
                    </div>
                    <div className="menu-item">
                        <i class="bi bi-moon" id="settings-icon"></i>
                        <div className="TextLight">Tema Oscuro</div>
                        <label className="switch">
                            <input type="checkbox" id="toggleSwitch"/>
                            <span className="slider"></span>
                        </label>
                    </div>

                    <hr className="Divider" />
                    <div className="menu-item">
                        <i class="bi bi-question-circle" id="settings-icon"></i>
                        <div className="TextLight">Ayuda</div>
                    </div>
                    <div className="menu-item">
                        <i class="bi bi-box-arrow-left" id="settings-ExitIcon"></i>
                        <div className="TextExit">Cerrar Sesion</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BarraExplorer;
