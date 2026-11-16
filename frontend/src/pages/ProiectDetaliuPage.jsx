import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProiect } from "../api.js";
import { CLASE_BADGE, ETICHETE_PROIECT } from "../constants.js";
import styles from "./ProiectDetaliuPage.module.css";

export default function ProiectDetaliuPage() {
  const { id } = useParams();
  const [proiect, setProiect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetchProiect(id)
      .then((data) => {
        if (!ignore) {
          setProiect(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se încarcă...
      </p>
    );
  }

  if (error) {
    return (
      <section className="panel">
        <p className="error" data-testid="error">
          Proiectul nu a putut fi încărcat: {error}
        </p>
        <Link to="/">Înapoi la listă</Link>
      </section>
    );
  }

  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>
        ← Înapoi la listă
      </Link>
      <h2 className={proiect.gata ? styles.done : undefined} data-testid="detail-title">
        {proiect.titlu}
      </h2>
      <dl className={styles.fields}>
        <dt>Categorie</dt>
        <dd>
          <span className={`badge ${CLASE_BADGE[proiect.eticheta] || "badge-private"}`}>
            {ETICHETE_PROIECT[proiect.eticheta] || proiect.eticheta}
          </span>
        </dd>
        <dt>Status</dt>
        <dd>{proiect.gata ? "Gata" : "Activ"}</dd>
        <dt>ID</dt>
        <dd>{proiect.id}</dd>
        {proiect.descriere && (
          <>
            <dt>Descriere</dt>
            <dd>{proiect.descriere}</dd>
          </>
        )}
        {proiect.locatie && (
          <>
            <dt>Locație</dt>
            <dd>{proiect.locatie}</dd>
          </>
        )}
        {proiect.data && (
          <>
            <dt>Data</dt>
            <dd>{proiect.data}</dd>
          </>
        )}
      </dl>
    </section>
  );
}
