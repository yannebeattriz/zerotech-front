
import { useState } from "react";
import { Plus, Search, FileText, CalendarClock } from "lucide-react";
import Layout from "../components/Layout";

function Documentos() {
    const [documentos, setDocumentos] = useState([]);
    const [busca, setBusca] = useState("");
    const [modal, setModal] = useState(false);

    const [trabalhador, setTrabalhador] = useState("");
    const [tipo, setTipo] = useState("ASO");
    const [numero, setNumero] = useState("");
    const [emissao, setEmissao] = useState("");
    const [validade, setValidade] = useState("");

    function cadastrar(event) {
        event.preventDefault();

        setDocumentos((anteriores) => [
            {
                id: Date.now(),
                trabalhador,
                tipo,
                numero,
                emissao,
                validade
            },
            ...anteriores
        ]);

        setTrabalhador("");
        setTipo("ASO");
        setNumero("");
        setEmissao("");
        setValidade("");
        setModal(false);
    }

    function situacao(data) {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const vencimento = new Date(`${data}T00:00:00`);
        const dias = Math.ceil((vencimento - hoje) / 86400000);

        if (dias < 0) return "Vencido";
        if (dias <= 7) return "Vence em breve";
        if (dias <= 30) return "Atenção";
        return "Em dia";
    }

    const filtrados = documentos.filter((doc) =>
        `${doc.trabalhador} ${doc.tipo} ${doc.numero}`
            .toLowerCase()
            .includes(busca.toLowerCase())
    );

    const vencidos = documentos.filter((doc) => situacao(doc.validade) === "Vencido").length;
    const proximos = documentos.filter((doc) => ["Vence em breve", "Atenção"].includes(situacao(doc.validade))).length;

    return (
        <Layout>
            <section className="page-heading module-heading">
                <div>
                    <h1>Documentos</h1>
                    <p>Controle documentos, certificados e prazos de validade.</p>
                </div>
                <button className="primary-button" onClick={() => setModal(true)}>
                    <Plus size={18} /> Novo documento
                </button>
            </section>

            <section className="module-stats">
                <div className="module-stat">
                    <FileText size={23} />
                    <div><span>Total de documentos</span><h2>{documentos.length}</h2></div>
                </div>
                <div className="module-stat">
                    <CalendarClock size={23} />
                    <div><span>Próximos do vencimento</span><h2>{proximos}</h2></div>
                </div>
                <div className="module-stat">
                    <CalendarClock size={23} />
                    <div><span>Documentos vencidos</span><h2>{vencidos}</h2></div>
                </div>
            </section>

            <section className="module-panel">
                <div className="module-toolbar">
                    <div>
                        <h2>Documentos cadastrados</h2>
                        <p>Acompanhe a situação de cada registro.</p>
                    </div>
                    <div className="module-search">
                        <Search size={18} />
                        <input placeholder="Buscar documento..." value={busca} onChange={(e) => setBusca(e.target.value)} />
                    </div>
                </div>

                {filtrados.length === 0 ? (
                    <div className="module-empty">
                        <FileText size={40} />
                        <h3>Nenhum documento cadastrado</h3>
                        <p>Cadastre documentos para acompanhar seus vencimentos.</p>
                    </div>
                ) : (
                    <div className="table-scroll">
                        <table className="module-table">
                            <thead>
                                <tr>
                                    <th>Trabalhador</th>
                                    <th>Tipo</th>
                                    <th>Número</th>
                                    <th>Emissão</th>
                                    <th>Validade</th>
                                    <th>Situação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtrados.map((doc) => {
                                    const status = situacao(doc.validade);
                                    return (
                                        <tr key={doc.id}>
                                            <td>{doc.trabalhador}</td>
                                            <td>{doc.tipo}</td>
                                            <td>{doc.numero || "—"}</td>
                                            <td>{doc.emissao || "—"}</td>
                                            <td>{doc.validade}</td>
                                            <td>
                                                <span className={`status-pill ${status === "Vencido" ? "status-danger" : status === "Em dia" ? "status-success" : "status-warning"}`}>
                                                    {status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
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
                                <h2>Cadastrar documento</h2>
                                <p>Preencha as informações do documento.</p>
                            </div>
                            <button className="modal-close" onClick={() => setModal(false)}>×</button>
                        </div>

                        <form onSubmit={cadastrar}>
                            <label>Trabalhador ou responsável</label>
                            <input required value={trabalhador} onChange={(e) => setTrabalhador(e.target.value)} placeholder="Nome completo" />

                            <label>Tipo de documento</label>
                            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                <option>ASO</option>
                                <option>Certificado de treinamento</option>
                                <option>Documento de EPI</option>
                                <option>Documento de empresa terceirizada</option>
                                <option>Outro</option>
                            </select>

                            <label>Número / identificação</label>
                            <input value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Número do documento" />

                            <div className="module-form-grid">
                                <div>
                                    <label>Data de emissão</label>
                                    <input type="date" value={emissao} onChange={(e) => setEmissao(e.target.value)} />
                                </div>
                                <div>
                                    <label>Data de validade</label>
                                    <input required type="date" value={validade} onChange={(e) => setValidade(e.target.value)} />
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="secondary-button" onClick={() => setModal(false)}>Cancelar</button>
                                <button type="submit" className="primary-button">Cadastrar documento</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default Documentos;
