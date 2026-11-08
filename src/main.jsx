import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./index.css";
import App from "./App.jsx";
import "./styles/theme.css";
import "./styles/global.css";

import "./styles/layout.css";
import "./styles/sidebar.css";

import "./styles/components.css";

import "./styles/login.css";
import "./styles/dashboard.css";
import "./styles/epis.css";

import "./styles/responsive.css";
import "./styles/trabalhadores.css";
import "./styles/fichasepi.css";
import "./styles/documentos.css";
import "./styles/configuracoes.css";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);