import ProiectCard from "./ProiectCard.jsx";

export default function ProiectList({ proiecte, onToggle, onDelete }) {
    if (proiecte.length === 0) {
        return <p className="empty">Nu există niciun proiect înregistrat.</p>;
    }

    return (
        <ul className="task-list">
            {proiecte.map((proiect) => (
                <ProiectCard
                    key={proiect.id}
                    proiect={proiect}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}