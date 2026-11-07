
import { useState } from "react";
import {
    Plus,
    Search,
    ShieldCheck,
    Package,
    AlertTriangle
} from "lucide-react";
import Layout from "../components/Layout";

function Epis() {
    const [epis, setEpis] = useState([]);
    const [busca, setBusca] = useState("");
    const [modalAberto, setModalAberto] = useState(false);

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [ca, setCa] = useState("");
    const [fabricante, setFabricante] = useState("");
    const [quantidade, setQuantidade] = useState("");

    function cadastrarEpi(event) {
        event.preventDefault();

        const novoEpi = {
            id: Date.now(),
            nome,
            descricao,
            ca,
            fabricante,
            quantidade: Number(quantidade)
        };

        setEpis([...epis, novoEpi]);

        setNome("");
        setDescricao("");
        setCa("");
        setFabricante("");
        setQuantidade("");
        setModalAberto(false);
    }

    const episFiltrados = epis.filter((epi) =>
        `${epi.nome} ${epi.ca} ${epi.fabricante}`
            .toLowerCase()
            .includes(busca.toLowerCase())
    );

    const totalEstoque = epis.reduce(
        (total, epi) => total + epi.quantidade,
        0
    );

    const estoqueBaixo = epis.filter(
        (epi) => epi.quantidade <= 5
    ).length;

    return (
        <Layout>
            <section className="page-heading epi-page-heading">
                <div>
                    <h1>Equipamentos de Proteção Individual</h1>
                    <p>Gerencie os EPIs e acompanhe a disponibilidade do estoque.</p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => setModalAberto(true)}
                >
                    <Plus size={18} />
                    Novo EPI
                </button>
            </section>

            <section className="epi-indicators">
                <div className="epi-indicator">
                    <div className="epi-indicator-icon">
                        <ShieldCheck size={22} />
                    </div>
                    <div>
                        <span>Tipos de EPIs</span>
                        <h2>{epis.length}</h2>
                    </div>
                </div>

                <div className="epi-indicator">
                    <div className="epi-indicator-icon">
                        <Package size={22} />
                    </div>
                    <div>
                        <span>Itens em estoque</span>
                        <h2>{totalEstoque}</h2>
                    </div>
                </div>

                <div className="epi-indicator">
                    <div className="epi-indicator-icon warning">
                        <AlertTriangle size={22} />
                    </div>
                    <div>
                        <span>Estoque baixo</span>
                        <h2>{estoqueBaixo}</h2>
                    </div>
                </div>
            </section>

            <section className="epi-list-panel">
                <div className="epi-list-header">
                    <div>
                        <h2>EPIs cadastrados</h2>
                        <p>Consulte os equipamentos registrados no sistema.</p>
                    </div>

                    <div className="epi-search">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Buscar EPI..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                </div>

                {episFiltrados.length === 0 ? (
                    <div className="epi-empty">
                        <ShieldCheck size={40} />
                        <h3>Nenhum EPI encontrado</h3>
                        <p>Cadastre um equipamento para começar seu controle de estoque.</p>
                    </div>
                ) : (
                    <div className="worker-table-container">
                        <table className="worker-table">
                            <thead>
                                <tr>
                                    <th>Equipamento</th>
                                    <th>CA</th>
                                    <th>Fabricante</th>
                                    <th>Quantidade</th>
                                    <th>Situação</th>
                                </tr>
                            </thead>

                            <tbody>
                                {episFiltrados.map((epi) => (
                                    <tr key={epi.id}>
                                        <td>
                                            <strong>{epi.nome}</strong>
                                            <small className="epi-description">
                                                {epi.descricao || "Sem descrição"}
                                            </small>
                                        </td>
                                        <td>{epi.ca}</td>
                                        <td>{epi.fabricante}</td>
                                        <td>{epi.quantidade}</td>
                                        <td>
                                            <span className={
                                                epi.quantidade <= 5
                                                    ? "stock-status low"
                                                    : "stock-status available"
                                            }>
                                                {epi.quantidade <= 5
                                                    ? "Estoque baixo"
                                                    : "Disponível"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {modalAberto && (
                <div className="modal-overlay">
                    <div className="epi-modal">
                        <div className="modal-header">
                            <div>
                                <h2>Novo equipamento</h2>
                                <p>Preencha os dados para cadastrar um EPI.</p>
                            </div>

                            <button
                                className="modal-close"
                                onClick={() => setModalAberto(false)}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={cadastrarEpi}>
                            <label>Nome do equipamento</label>
                            <input
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Ex.: Capacete de segurança"
                                required
                            />

                            <label>Descrição</label>
                            <textarea
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Descreva o equipamento..."
                                rows="3"
                            />

                            <div className="epi-modal-grid">
                                <div>
                                    <label>Certificado de Aprovação (CA)</label>
                                    <input
                                        value={ca}
                                        onChange={(e) => setCa(e.target.value)}
                                        placeholder="Número do CA"
                                        required
                                    />
                                </div>

                                <div>
                                    <label>Fabricante</label>
                                    <input
                                        value={fabricante}
                                        onChange={(e) => setFabricante(e.target.value)}
                                        placeholder="Fabricante"
                                        required
                                    />
                                </div>
                            </div>

                            <label>Quantidade em estoque</label>
                            <input
                                type="number"
                                min="0"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                                placeholder="Ex.: 50"
                                required
                            />

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={() => setModalAberto(false)}
                                >
                                    Cancelar
                                </button>

                                <button type="submit" className="primary-button">
                                    Cadastrar EPI
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default Epis;
