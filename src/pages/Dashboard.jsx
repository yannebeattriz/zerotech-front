
import Layout from "../components/Layout";
import Card from "../components/Card";

import {
    Users,
    ShieldCheck,
    FileWarning,
    AlertTriangle,
    ArrowUpRight,
    Activity,
    Clock3,
    CheckCircle2
} from "lucide-react";



function Dashboard() {
    const indicadores = [
        {
            titulo: "Trabalhadores",
            valor: "0",
            descricao: "Cadastrados no sistema",
            icone: Users
        },
        {
            titulo: "EPIs cadastrados",
            valor: "0",
            descricao: "Itens no estoque",
            icone: ShieldCheck
        },
        {
            titulo: "Documentos pendentes",
            valor: "0",
            descricao: "Precisam de atenção",
            icone: FileWarning
        },
        {
            titulo: "Riscos em aberto",
            valor: "0",
            descricao: "Aguardando resolução",
            icone: AlertTriangle
        }
    ];

    return (
        <Layout>
            <main className="dashboard-page">

                <section className="dashboard-heading">
                    <div>
                        <span className="dashboard-overline">
                            PAINEL DE CONTROLE / SST
                        </span>

                        <h1>Visão geral</h1>

                        <p>
                            Acompanhe os indicadores e a situação da
                            segurança da sua operação.
                        </p>
                    </div>

                    <div className="dashboard-status">
                        <span className="dashboard-status-dot" />
                        SISTEMA OPERACIONAL
                    </div>
                </section>

                <section className="dashboard-section">
                    <div className="dashboard-section-title">
                        <div>
                            <span>MONITORAMENTO</span>
                            <h2>Indicadores gerais</h2>
                        </div>

                        <Activity size={20} />
                    </div>

                    <div className="dashboard-cards">
                        {indicadores.map((item) => (
                            <Card
                                key={item.titulo}
                                titulo={item.titulo}
                                valor={item.valor}
                                descricao={item.descricao}
                                icone={item.icone}
                            />
                        ))}
                    </div>
                </section>

                <section className="dashboard-bottom">

                    <div className="dashboard-panel">
                        <div className="panel-heading">
                            <div className="panel-icon">
                                <Activity size={19} />
                            </div>

                            <div>
                                <span>HISTÓRICO</span>
                                <h3>Atividades recentes</h3>
                            </div>

                            <ArrowUpRight size={19} className="panel-arrow" />
                        </div>

                        <div className="dashboard-empty">
                            <div className="empty-icon">
                                <Clock3 size={24} />
                            </div>

                            <h4>Nenhuma atividade registrada</h4>

                            <p>
                                As movimentações realizadas na plataforma
                                aparecerão aqui.
                            </p>
                        </div>
                    </div>

                    <div className="dashboard-panel">
                        <div className="panel-heading">
                            <div className="panel-icon warning-icon">
                                <AlertTriangle size={19} />
                            </div>

                            <div>
                                <span>ACOMPANHAMENTO</span>
                                <h3>Atenção necessária</h3>
                            </div>
                        </div>

                        <div className="dashboard-empty">
                            <div className="empty-icon success-icon">
                                <CheckCircle2 size={24} />
                            </div>

                            <h4>Nenhuma pendência identificada</h4>

                            <p>
                                Quando houver documentos ou riscos
                                pendentes, eles serão exibidos aqui.
                            </p>
                        </div>
                    </div>

                </section>

                <footer className="dashboard-footer">
                    <span>ZEROTECH / GESTÃO INTELIGENTE DE SST</span>
                    <span>PAINEL ADMINISTRATIVO</span>
                </footer>

            </main>
        </Layout>
    );
}

export default Dashboard;
