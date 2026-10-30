const ETICHETE_NOME = {
    "Formula Student": "Formula Student",
    "Drift": "Drift",
    "Private": "Private"
};

export default function ProiectCard({ proiect }) {
    return (
        <li className={proiect.gata ? "item-card done" : "item-card"}>
            <div>
                <h3>{proiect.titlu}</h3>
                <span className={`badge badge-${proiect.eticheta.toLowerCase().replace(/\s+/g, '-')}`}>
                    {ETICHETE_NOME[proiect.eticheta] || proiect.eticheta}
                </span>
            </div>
            <span className="status">{proiect.gata ? "Gata" : "Activ"}</span>
        </li>
    );
}