
import { useState } from "react";
import { Plus, Search, ClipboardList } from "lucide-react";
import Layout from "../components/Layout";

function FichasEpi() {
    const [fichas, setFichas] = useState([]);
    const [busca, setBusca] = useState("");
    const [modal, setModal] = useState(false);

    const [trabalhador, setTrabalhador] = useState("");
    const [epi, setEpi] = useState("");
    const [quantidade, setQuantidade] = useState("1");
    const [ca, setCa] = useState("");
    const [lote, setLote] = useState("");
    const [data, setData] = useState("");
    const [assinatura, setAssinatura] = useState("");

    function cadastrar(event) {
        event.preventDefault();

        setFichas((anteriores) => [
            {
                id: Date.now(),
                trabalhador,
                epi,
                quantidade,
                ca,
                lote,
                data,
                assinatura
            },
            ...anteriores
        ]);

        setTrabalhador("");
        setEpi("");
        setQuantidade("1");
        setCa("");
        setLote("");
        setData("");
        setAssinatura("");
        setModal(false);
    }

    const filtradas = fichas.filter((ficha) =>
        `${ficha.trabalhador} ${ficha.epi}`
            .toLowerCase()
            .includes(busca.toLowerCase())
    );

    return (
        <Layout>
            <section className="page-heading module-heading">
                <div>
                    <h1>Fichas de entrega de EPI</h1>
                    <p>Registre e acompanhe a entrega de equipamentos aos trabalhadores.</p>
                </div>
                <button className="primary-button" onClick={() => setModal(true)}>
                    <Plus size={18} /> Nova entrega
                </button>
            </section>

            <section className="module-panel">
                <div className="module-toolbar">
                    <div>
                        <h2>Histórico de entregas</h2>
                        <p>{fichas.length} entrega(s) registrada(s)</p>
                    </div>
                    <div className="module-search">
                        <Search size={18} />
                        <input
                            placeholder="Buscar trabalhador ou EPI..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                </div>

                {filtradas.length === 0 ? (
                    <div className="module-empty">
                        <ClipboardList size={40} />
                        <h3>Nenhuma entrega registrada</h3>
                        <p>As fichas cadastradas aparecerão aqui.</p>
                    </div>
                ) : (
                    <div className="table-scroll">
                        <table className="module-table">
                            <thead>
                                <tr>
                                    <th>Trabalhador</th>
                                    <th>Equipamento</th>
                                    <th>Quantidade</th>
                                    <th>CA</th>
                                    <th>Lote</th>
                                    <th>Data</th>
                                    <th>Assinatura</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtradas.map((ficha) => (
                                    <tr key={ficha.id}>
                                        <td>{ficha.trabalhador}</td>
                                        <td>{ficha.epi}</td>
                                        <td>{ficha.quantidade}</td>
                                        <td>{ficha.ca}</td>
                                        <td>{ficha.lote || "—"}</td>
                                        <td>{ficha.data}</td>
                                        <td>{ficha.assinatura}</td>
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
                                <h2>Registrar entrega</h2>
                                <p>Informe os dados do equipamento entregue.</p>
                            </div>
                            <button className="modal-close" onClick={() => setModal(false)}>×</button>
                        </div>

                        <form onSubmit={cadastrar}>
                            <label>Nome do trabalhador</label>
                            <input required value={trabalhador} onChange={(e) => setTrabalhador(e.target.value)} placeholder="Nome completo" />

                            <label>Equipamento entregue</label>
                            <input required value={epi} onChange={(e) => setEpi(e.target.value)} placeholder="Ex.: Capacete de segurança" />

                            <div className="module-form-grid">
                                <div>
                                    <label>Quantidade</label>
                                    <input required type="number" min="1" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                                </div>
                                <div>
                                    <label>CA</label>
                                    <input required value={ca} onChange={(e) => setCa(e.target.value)} placeholder="Número do CA" />
                                </div>
                                <div>
                                    <label>Lote</label>
                                    <input value={lote} onChange={(e) => setLote(e.target.value)} placeholder="Número do lote" />
                                </div>
                                <div>
                                    <label>Data da entrega</label>
                                    <input required type="date" value={data} onChange={(e) => setData(e.target.value)} />
                                </div>
                            </div>

                            <label>Assinatura / identificação do recebimento</label>
                            <input required value={assinatura} onChange={(e) => setAssinatura(e.target.value)} placeholder="Nome ou identificação do responsável" />

                            <div className="modal-actions">
                                <button type="button" className="secondary-button" onClick={() => setModal(false)}>Cancelar</button>
                                <button className="primary-button" type="submit">Registrar entrega</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default FichasEpi;
