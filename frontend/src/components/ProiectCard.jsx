import { Link } from "react-router-dom";
import { CLASE_BADGE, ETICHETE_PROIECT } from "../constants.js";
import styles from "./ProiectCard.module.css";

export default function ProiectCard({ proiect, onToggle, onDelete }) {
  return (
    <li
      className={proiect.gata ? `${styles.card} ${styles.done}` : styles.card}
      data-testid="item"
      data-id={proiect.id}
    >
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={proiect.gata}
          onChange={() => onToggle(proiect.id)}
          aria-label={`Marchează ${proiect.titlu}`}
          data-testid="item-toggle"
        />
        <div>
          <Link
            to={`/proiecte/${proiect.id}`}
            className={styles.title}
            data-testid="item-link"
          >
            {proiect.titlu}
          </Link>
          <span className={`badge ${CLASE_BADGE[proiect.eticheta] || "badge-private"}`}>
            {ETICHETE_PROIECT[proiect.eticheta] || proiect.eticheta}
          </span>
        </div>
      </div>
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
