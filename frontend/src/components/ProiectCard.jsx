const ETICHETE_AFISATE = {
    "Formula Student": "Formula Student",
    "Drift": "Drift",
    "Private": "Private",
};

const CLASE_BADGE = {
    "Formula Student": "badge-fs",
    "Drift": "badge-drift",
    "Private": "badge-private",
};

export default function ProiectCard({ proiect, onToggle, onDelete }) {
    return (
        <li
            className={proiect.gata ? "task-card done" : "task-card"}
            data-testid="item"
            data-id={proiect.id}
        >
            <label className="task-main">
                <input
                    type="checkbox"
                    checked={proiect.gata}
                    onChange={() => onToggle(proiect.id)}
                    data-testid="item-toggle"
                />
                <div>
                    <h3 data-testid="item-title">{proiect.titlu}</h3>
                    <span className={`badge ${CLASE_BADGE[proiect.eticheta] || "badge-private"}`}>
                        {ETICHETE_AFISATE[proiect.eticheta] || proiect.eticheta}
                    </span>
                </div>
            </label>
            <button
                className="btn-danger"
                onClick={() => onDelete(proiect.id)}
                aria-label={`Șterge ${proiect.titlu}`}
                data-testid="item-delete"
            >
                Șterge
            </button>
        </li>
    );
}
