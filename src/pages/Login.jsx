
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ShieldCheck,
    Eye,
    EyeOff,
    ArrowUpRight,
    Activity,
    LockKeyhole
} from "lucide-react";

import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function realizarLogin(e) {
        e.preventDefault();

        setErro("");
        setCarregando(true);

        try {
           const resposta = await api.post("/usuarios/login", {
    email: email.trim(),
    senha
});

            localStorage.setItem("token", resposta.data.token);
            localStorage.setItem(
                "usuario",
                JSON.stringify(resposta.data.usuario)
            );

            navigate("/dashboard");

        } catch (error) {
    console.log("ERRO COMPLETO:", error);
    console.log("RESPOSTA DO SERVIDOR:", error.response?.data);
    console.log("STATUS:", error.response?.status);

    setErro(
        error.response?.data?.mensagem ||
        error.message ||
        "Não foi possível realizar o login."
    );
}finally {
            setCarregando(false);
        }
    }

    return (
        <main className="tech-login">

            {/* BACKGROUND DECORATIVO */}
            <div className="tech-background">
                <div className="tech-grid"></div>
                <div className="tech-glow glow-one"></div>
                <div className="tech-glow glow-two"></div>
                <div className="tech-orbit orbit-one"></div>
                <div className="tech-orbit orbit-two"></div>
                <div className="tech-orbit orbit-three"></div>
            </div>

            {/* PAINEL INSTITUCIONAL */}
            <section className="tech-showcase">

                <header className="tech-header">
                    <div className="tech-logo">
                        <div className="tech-logo-icon">
                            <ShieldCheck size={25} />
                        </div>

                        <span>
                            Zero<span>Tech</span>
                        </span>
                    </div>

                    <span className="tech-version">
                        DIGITAL PLATFORM / 2026
                    </span>
                </header>

                <div className="tech-presentation">

                    <div className="tech-status">
                        <span className="status-dot"></span>
                        TECNOLOGIA A SERVIÇO DA SEGURANÇA
                    </div>

                    <h1>
                        Inteligência que
                        <br />
                        transforma a
                        <br />
                        <span>gestão.</span>
                    </h1>

                    <p>
                        Conectando tecnologia, organização e
                        segurança para proporcionar uma gestão
                        mais eficiente e inteligente.
                    </p>

                    <div className="tech-visual">

                        <div className="visual-circle">
                            <div className="visual-inner">
                                <ShieldCheck size={65} strokeWidth={1.1} />
                            </div>

                            <div className="visual-orbit orbit-a"></div>
                            <div className="visual-orbit orbit-b"></div>

                            <span className="visual-point point-a"></span>
                            <span className="visual-point point-b"></span>
                        </div>

                        <div className="visual-caption">
                            <span>01 / TECNOLOGIA INTEGRADA</span>
                            <span>PRECISÃO • CONTROLE • SEGURANÇA</span>
                        </div>

                    </div>

                </div>

                <footer className="tech-showcase-footer">
                    <span>ZeroTech © 2026</span>
                    <span>GESTÃO INTELIGENTE DE SST</span>
                </footer>

            </section>

            {/* ÁREA DE AUTENTICAÇÃO */}
            <section className="tech-auth">

                <div className="auth-top">
                    <div className="auth-system">
                        <Activity size={16} />
                        <span>SISTEMA DE AUTENTICAÇÃO</span>
                    </div>

                    <span className="auth-online">
                        <span></span>
                        ONLINE
                    </span>
                </div>

                <div className="auth-content">

                    <div className="auth-heading">
                        <span className="auth-overline">
                            ACESSO À PLATAFORMA
                        </span>

                        <h2>
                            Bem-vindo
                            <br />
                            <span>de volta.</span>
                        </h2>

                        <p>
                            Entre com suas credenciais para acessar
                            seu ambiente de gestão.
                        </p>
                    </div>

                    <form
                        className="tech-form"
                        onSubmit={realizarLogin}
                    >

                        <div className="tech-field">
                            <label htmlFor="email">
                                ENDEREÇO DE E-MAIL
                            </label>

                            <div className="field-wrapper">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="nome@empresa.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="tech-field">
                            <label htmlFor="senha">
                                SENHA DE ACESSO
                            </label>

                            <div className="field-wrapper password-wrapper">
                                <input
                                    id="senha"
                                    type={mostrarSenha ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setMostrarSenha(!mostrarSenha)
                                    }
                                    aria-label={
                                        mostrarSenha
                                            ? "Ocultar senha"
                                            : "Mostrar senha"
                                    }
                                >
                                    {mostrarSenha
                                        ? <EyeOff size={19} />
                                        : <Eye size={19} />
                                    }
                                </button>
                            </div>
                        </div>

                        {erro && (
                            <div className="tech-error">
                                {erro}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="tech-submit"
                            disabled={carregando}
                        >
                            <span>
                                {carregando
                                    ? "Autenticando..."
                                    : "Acessar plataforma"}
                            </span>

                            {!carregando && (
                                <ArrowUpRight size={20} />
                            )}
                        </button>

                    </form>

                    <div className="auth-security">
                        <LockKeyhole size={17} />

                        <span>
                            Sua conexão está protegida.
                        </span>

                        <div className="security-line"></div>
                    </div>

                </div>

                <footer className="auth-footer">
                    <span>ZERO TECH / DIGITAL ENVIRONMENT</span>
                    <span>VERSÃO 1.0.0</span>
                </footer>

            </section>

        </main>
    );
}

export default Login;
