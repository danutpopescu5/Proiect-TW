const ETICHETE_AFISATE = {
    "Formula Student": "Formula Student",
    "Drift": "Drift",
    "Private": "Private"
};

const CLASE_BADGE = {
    "Formula Student": "badge-fs",
    "Drift": "badge-drift",
    "Private": "badge-private"
};

export default function ProiectCard({ proiect, onToggle, onDelete }) {
    return (
        <li className={proiect.gata ? "task-card done" : "task-card"}>
            <label className="task-main">
                <input
                    type="checkbox"
                    checked={proiect.gata}
                    onChange={() => onToggle(proiect.id)}
                />
                <div>
                    <h3>{proiect.titlu}</h3>
                    <span className={`badge ${CLASE_BADGE[proiect.eticheta] || "badge-private"}`}>
                        {ETICHETE_AFISATE[proiect.eticheta] || proiect.eticheta}
                    </span>
                </div>
            </label>
            <button
                className="btn-danger"
                onClick={() => onDelete(proiect.id)}
                aria-label={`Șterge ${proiect.titlu}`}
            >
                Șterge
            </button>
        </li>
    );
}