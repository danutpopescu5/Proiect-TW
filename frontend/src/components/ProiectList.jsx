import ProiectCard from "./ProiectCard.jsx";
import styles from "./ProiectList.module.css";

export default function ProiectList({ proiecte, onToggle, onDelete }) {
  if (proiecte.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        Nu există niciun proiect înregistrat.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
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
