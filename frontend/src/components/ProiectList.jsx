import ProiectCard from "./ProiectCard.jsx";

export default function ProiectList({ proiecte }) {
    if (proiecte.length === 0) {
        return <p className="empty">Nu există niciun proiect înregistrat.</p>;
    }

    return (
        <ul className="item-list">
            {proiecte.map((proiect) => (
                <ProiectCard key={proiect.id} proiect={proiect} />
            ))}
        </ul>
    );
}