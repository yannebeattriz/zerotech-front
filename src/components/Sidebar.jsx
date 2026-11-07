
import { NavLink } from "react-router-dom";
import { useState } from "react";

import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    ClipboardList,
    FileText,
    AlertTriangle,
    Settings,
    Menu,
    X
} from "lucide-react";

function Sidebar() {
    const [aberto, setAberto] = useState(false);

    const menu = [
        {
            nome: "Dashboard",
            caminho: "/dashboard",
            icone: LayoutDashboard
        },
        {
            nome: "Trabalhadores",
            caminho: "/trabalhadores",
            icone: Users
        },
        {
            nome: "EPIs",
            caminho: "/epis",
            icone: ShieldCheck
        },
        {
            nome: "Fichas de EPI",
            caminho: "/fichas-epi",
            icone: ClipboardList
        },
        {
            nome: "Documentos",
            caminho: "/documentos",
            icone: FileText
        },
        {
            nome: "Gestão de riscos",
            caminho: "/riscos",
            icone: AlertTriangle
        },
        {
            nome: "Configurações",
            caminho: "/configuracoes",
            icone: Settings
        }
    ];

    return (
        <>
            <button
                className="mobile-menu-button"
                onClick={() => setAberto(!aberto)}
                aria-label="Abrir menu"
            >
                {aberto ? <X size={23} /> : <Menu size={23} />}
            </button>

            {aberto && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setAberto(false)}
                />
            )}

            <aside className={`sidebar ${aberto ? "sidebar-open" : ""}`}>

                <div className="sidebar-logo">
                    <ShieldCheck size={30} />
                    <h2>
                        Zero<span>Tech</span>
                    </h2>
                </div>

                <p className="menu-title">MENU PRINCIPAL</p>

                <nav className="sidebar-menu">
                    {menu.map((item) => {
                        const Icone = item.icone;

                        return (
                            <NavLink
                                key={item.caminho}
                                to={item.caminho}
                                onClick={() => setAberto(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? "menu-item active"
                                        : "menu-item"
                                }
                            >
                                <Icone size={19} />
                                <span>{item.nome}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <p>ZeroTech © 2026</p>
                    <span>Gestão inteligente de SST</span>
                </div>

            </aside>
        </>
    );
}

export default Sidebar;
