
import { useState } from "react";
import { Plus, Search, AlertTriangle, ClipboardCheck } from "lucide-react";
import Layout from "../components/Layout";

function Riscos() {
    const [riscos, setRiscos] = useState([]);
    const [busca, setBusca] = useState("");
    const [modal, setModal] = useState(false);

    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("Físico");
    const [severidade, setSeveridade] = useState("Média");
    const [localizacao, setLocalizacao] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [prazo, setPrazo] = useState("");
    const [acao, setAcao] = useState("");

    function cadastrar(event) {
        event.preventDefault();

        setRiscos((anteriores) => [
            {
                id: Date.now(),
                descricao,
                tipo,
                severidade,
                localizacao,
                responsavel,
                prazo,
                acao,
                status: "Aberto"
            },
            ...anteriores
        ]);

        setDescricao("");
        setTipo("Físico");
        setSeveridade("Média");
        setLocalizacao("");
        setResponsavel("");
        setPrazo("");
        setAcao("");
        setModal(false);
    }

    function alterarStatus(id, novoStatus) {
        setRiscos((anteriores) =>
            anteriores.map((risco) =>
                risco.id === id
                    ? { ...risco, status: novoStatus }
                    : risco
            )
        );
    }

    const filtrados = riscos.filter((risco) =>
        `${risco.descricao} ${risco.tipo} ${risco.localizacao} ${risco.responsavel}`
            .toLowerCase()
            .includes(busca.toLowerCase())
    );

    const abertos = riscos.filter((r) => r.status === "Aberto").length;
    const andamento = riscos.filter((r) => r.status === "Em andamento").length;
    const concluidos = riscos.filter((r) => r.status === "Concluído").length;

    return (
        <Layout>
            <section className="page-heading module-heading">
                <div>
                    <h1>Gestão de riscos</h1>
                    <p>Registre situações de risco e acompanhe as medidas corretivas.</p>
                </div>
                <button className="primary-button" onClick={() => setModal(true)}>
                    <Plus size={18} /> Registrar risco
                </button>
            </section>

            <section className="module-stats">
                <div className="module-stat">
                    <AlertTriangle size={23} />
                    <div><span>Riscos em aberto</span><h2>{abertos}</h2></div>
                </div>
                <div className="module-stat">
                    <ClipboardCheck size={23} />
                    <div><span>Em andamento</span><h2>{andamento}</h2></div>
                </div>
                <div className="module-stat">
                    <ClipboardCheck size={23} />
                    <div><span>Concluídos</span><h2>{concluidos}</h2></div>
                </div>
            </section>

            <section className="module-panel">
                <div className="module-toolbar">
                    <div>
                        <h2>Registros de riscos</h2>
                        <p>{riscos.length} ocorrência(s) registrada(s)</p>
                    </div>
                    <div className="module-search">
                        <Search size={18} />
                        <input placeholder="Buscar ocorrência..." value={busca} onChange={(e) => setBusca(e.target.value)} />
                    </div>
                </div>

                {filtrados.length === 0 ? (
                    <div className="module-empty">
                        <AlertTriangle size={40} />
                        <h3>Nenhum risco registrado</h3>
                        <p>As ocorrências registradas aparecerão aqui.</p>
                    </div>
                ) : (
                    <div className="table-scroll">
                        <table className="module-table">
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Tipo</th>
                                    <th>Severidade</th>
                                    <th>Local</th>
                                    <th>Responsável</th>
                                    <th>Prazo</th>
                                    <th>Status</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtrados.map((risco) => (
                                    <tr key={risco.id}>
                                        <td>{risco.descricao}</td>
                                        <td>{risco.tipo}</td>
                                        <td>
                                            <span className={`status-pill ${risco.severidade === "Alta" ? "status-danger" : risco.severidade === "Baixa" ? "status-success" : "status-warning"}`}>
                                                {risco.severidade}
                                            </span>
                                        </td>
                                        <td>{risco.localizacao}</td>
                                        <td>{risco.responsavel}</td>
                                        <td>{risco.prazo || "—"}</td>
                                        <td>
                                            <span className={`status-pill ${risco.status === "Concluído" ? "status-success" : risco.status === "Em andamento" ? "status-warning" : "status-danger"}`}>
                                                {risco.status}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                className="status-select"
                                                value={risco.status}
                                                onChange={(e) => alterarStatus(risco.id, e.target.value)}
                                            >
                                                <option>Aberto</option>
                                                <option>Em andamento</option>
                                                <option>Concluído</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {modal && (
                <div className="modal-overlay">
                    <div className="module-modal">
                        <div className="modal-header">
                            <div>
                                <h2>Registrar ocorrência</h2>
                                <p>Descreva o risco identificado.</p>
                            </div>
                            <button className="modal-close" onClick={() => setModal(false)}>×</button>
                        </div>

                        <form onSubmit={cadastrar}>
                            <label>Descrição da ocorrência</label>
                            <textarea required rows="3" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descreva a situação identificada..." />

                            <div className="module-form-grid">
                                <div>
                                    <label>Tipo de risco</label>
                                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                        <option>Físico</option>
                                        <option>Químico</option>
                                        <option>Biológico</option>
                                        <option>Ergonômico</option>
                                        <option>Acidente</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Severidade</label>
                                    <select value={severidade} onChange={(e) => setSeveridade(e.target.value)}>
                                        <option>Baixa</option>
                                        <option>Média</option>
                                        <option>Alta</option>
                                    </select>
                                </div>
                            </div>

                            <label>Localização</label>
                            <input required value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} placeholder="Local onde o risco foi identificado" />

                            <label>Responsável pela ação</label>
                            <input required value={responsavel} onChange={(e) => setResponsavel(e.target.value)} placeholder="Nome do responsável" />

                            <label>Prazo para resolução</label>
                            <input type="date" value={prazo} onChange={(e) => setPrazo(e.target.value)} />

                            <label>Ação corretiva proposta</label>
                            <textarea rows="3" value={acao} onChange={(e) => setAcao(e.target.value)} placeholder="Descreva a medida corretiva..." />

                            <div className="modal-actions">
                                <button type="button" className="secondary-button" onClick={() => setModal(false)}>Cancelar</button>
                                <button type="submit" className="primary-button">Registrar risco</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default Riscos;
