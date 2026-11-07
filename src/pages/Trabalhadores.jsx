
import { useEffect, useState } from "react";
import { Plus, Search, Users } from "lucide-react";
import Layout from "../components/Layout";
import api from "../services/api";

function Trabalhadores() {
    const [trabalhadores, setTrabalhadores] = useState([]);
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [cargo, setCargo] = useState("");
    const [setor, setSetor] = useState("");
    const [telefone, setTelefone] = useState("");
    const [busca, setBusca] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function carregarTrabalhadores() {
        try {
            const resposta = await api.get("/trabalhadores");
            setTrabalhadores(resposta.data);
        } catch (error) {
            setErro("Não foi possível carregar os trabalhadores.");
        }
    }

    useEffect(() => {
        carregarTrabalhadores();
    }, []);

    async function cadastrarTrabalhador(event) {
        event.preventDefault();
        setErro("");
        setCarregando(true);

        try {
            await api.post("/trabalhadores", {
                nome,
                cpf,
                cargo,
                setor,
                telefone
            });

            setNome("");
            setCpf("");
            setCargo("");
            setSetor("");
            setTelefone("");

            await carregarTrabalhadores();
        } catch (error) {
            setErro(
                error.response?.data?.mensagem ||
                "Não foi possível cadastrar o trabalhador."
            );
        } finally {
            setCarregando(false);
        }
    }

    const trabalhadoresFiltrados = trabalhadores.filter((trabalhador) =>
        trabalhador.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <Layout>
            <section className="page-heading">
                <div>
                    <h1>Trabalhadores</h1>
                    <p>Gerencie os trabalhadores cadastrados na ZeroTech.</p>
                </div>
            </section>

            <section className="worker-form-panel">
                <h2><Plus size={20} /> Cadastrar trabalhador</h2>

                <form onSubmit={cadastrarTrabalhador}>
                    <div className="worker-form-grid">
                        <input
                            placeholder="Nome completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />

                        <input
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            required
                        />

                        <input
                            placeholder="Cargo"
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                            required
                        />

                        <input
                            placeholder="Setor"
                            value={setor}
                            onChange={(e) => setSetor(e.target.value)}
                            required
                        />

                        <input
                            placeholder="Telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </div>

                    {erro && <p className="form-error">{erro}</p>}

                    <button type="submit" disabled={carregando}>
                        {carregando ? "Salvando..." : "Cadastrar trabalhador"}
                    </button>
                </form>
            </section>

            <section className="worker-list-panel">
                <div className="worker-list-heading">
                    <div>
                        <h2>Trabalhadores cadastrados</h2>
                        <p>{trabalhadores.length} registro(s)</p>
                    </div>

                    <div className="worker-search">
                        <Search size={18} />
                        <input
                            placeholder="Buscar trabalhador..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                </div>

                {trabalhadoresFiltrados.length === 0 ? (
                    <div className="worker-empty">
                        <Users size={35} />
                        <p>Nenhum trabalhador encontrado.</p>
                    </div>
                ) : (
                    <div className="worker-table-container">
                        <table className="worker-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Cargo</th>
                                    <th>Setor</th>
                                    <th>Telefone</th>
                                </tr>
                            </thead>

                            <tbody>
                                {trabalhadoresFiltrados.map((trabalhador) => (
                                    <tr key={trabalhador.id}>
                                        <td>{trabalhador.nome}</td>
                                        <td>{trabalhador.cpf}</td>
                                        <td>{trabalhador.cargo}</td>
                                        <td>{trabalhador.setor}</td>
                                        <td>{trabalhador.telefone || "—"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </Layout>
    );
}

export default Trabalhadores;
