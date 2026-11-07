
import { useState } from "react";
import {
    Bell,
    UserCircle,
    ChevronDown,
    Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const [notificacoesAbertas, setNotificacoesAbertas] = useState(false);
    const [perfilAberto, setPerfilAberto] = useState(false);

    const usuario = JSON.parse(
        localStorage.getItem("usuario") || "{}"
    );

    return (
        <header className="header">

            <div>
                <h2>Painel de controle</h2>
                <p>Acompanhe os indicadores da sua operação.</p>
            </div>

            <div className="header-actions">

                <div className="header-dropdown">

                    <button
                        className="notification-button"
                        onClick={() => {
                            setNotificacoesAbertas(!notificacoesAbertas);
                            setPerfilAberto(false);
                        }}
                        aria-label="Notificações"
                    >
                        <Bell size={20} />
                    </button>

                    {notificacoesAbertas && (
                        <div className="dropdown-panel">
                            <h3>Notificações</h3>
                            <p>Nenhuma notificação nova.</p>
                        </div>
                    )}

                </div>

                <div className="header-dropdown">

                    <button
                        className="user-info user-button"
                        onClick={() => {
                            setPerfilAberto(!perfilAberto);
                            setNotificacoesAbertas(false);
                        }}
                    >
                        <UserCircle size={34} />

                        <div>
                            <strong>
                                {usuario.nome || "Administrador"}
                            </strong>
                            <span>Administrador</span>
                        </div>

                        <ChevronDown size={16} />
                    </button>

                    {perfilAberto && (
                        <div className="dropdown-panel profile-dropdown">
                            <button onClick={() => navigate("/configuracoes")}>
                                <Settings size={16} />
                                Configurações
                            </button>
                        </div>
                    )}

                </div>

            </div>

        </header>
    );
}

export default Header;
