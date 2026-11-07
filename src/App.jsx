
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Trabalhadores from "./pages/Trabalhadores";
import Epis from "./pages/Epis";
import FichasEpi from "./pages/FichasEpi";
import Documentos from "./pages/Documentos";
import Riscos from "./pages/Riscos";
import Configuracoes from "./pages/Configuracoes";

import RotaProtegida from "./components/RotaProtegida";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <RotaProtegida>
                            <Dashboard />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/trabalhadores"
                    element={
                        <RotaProtegida>
                            <Trabalhadores />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/epis"
                    element={
                        <RotaProtegida>
                            <Epis />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/fichas-epi"
                    element={
                        <RotaProtegida>
                            <FichasEpi />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/documentos"
                    element={
                        <RotaProtegida>
                            <Documentos />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/riscos"
                    element={
                        <RotaProtegida>
                            <Riscos />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/configuracoes"
                    element={
                        <RotaProtegida>
                            <Configuracoes />
                        </RotaProtegida>
                    }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
