
function Card({ titulo, valor, descricao, icone: Icone }) {
    return (
        <article className="dashboard-card">

            <div className="card-top">
                <span>{titulo}</span>
                <Icone size={22} />
            </div>

            <h2>{valor}</h2>

            <p>{descricao}</p>

        </article>
    );
}

export default Card;
