
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Configuracoes() {
    const navigate = useNavigate();

    const usuario = JSON.parse(
        localStorage.getItem("usuario") || "{}"
    );

    const [nome, setNome] = useState(usuario.nome || "");
    const [email, setEmail] = useState(usuario.email || "");
    const [mensagem, setMensagem] = useState("");

    function salvarAlteracoes(e) {
        e.preventDefault();

        const usuarioAtualizado = {
            ...usuario,
            nome,
            email
        };

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuarioAtualizado)
        );

        setMensagem("Alterações salvas com sucesso!");
    }

    function sair() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/");
    }

    return (
        <Layout>
            <div className="page-heading">
                <div>
                    <h1>Configurações</h1>
                    <p>Gerencie suas informações e preferências.</p>
                </div>
            </div>

            <section className="settings-panel">
                <h2>Meu perfil</h2>

                <form onSubmit={salvarAlteracoes}>
                    <label>Nome</label>
                    <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <label>E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit">
                        Salvar alterações
                    </button>
                </form>

                {mensagem && <p>{mensagem}</p>}

                <button type="button" onClick={sair}>
                    Sair da conta
                </button>
            </section>
        </Layout>
    );
}

export default Configuracoes;
