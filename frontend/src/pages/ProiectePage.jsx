import { useEffect, useState } from "react";
import ProiectList from "../components/ProiectList.jsx";
import ProiectForm from "../components/ProiectForm.jsx";
import { createProiect, deleteProiect, fetchProiecte, updateProiect } from "../api.js";
import styles from "./ProiectePage.module.css";

export default function ProiectePage() {
  const [proiecte, setProiecte] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchProiecte();
        if (!ignore) setProiecte(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleAdd(proiect) {
    const creat = await createProiect(proiect);
    setProiecte((prev) => [...prev, creat]);
  }

  async function handleToggle(id) {
    const proiect = proiecte.find((t) => t.id === id);
    if (!proiect) return;
    try {
      const actualizat = await updateProiect(id, { gata: !proiect.gata });
      setProiecte((prev) => prev.map((t) => (t.id === id ? actualizat : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProiect(id);
      setProiecte((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const active = proiecte.filter((t) => !t.gata).length;

  return (
    <div className={styles.grid}>
      <section className="panel">
        <h2>Adaugă proiect</h2>
        <ProiectForm onAdd={handleAdd} />
      </section>

      <section className="panel">
        <h2>Proiectele mele</h2>
        <p className={styles.summary}>
          {proiecte.length} proiecte, dintre care {active} active
        </p>
        {loading && (
          <p className="info" data-testid="loading">
            Se încarcă...
          </p>
        )}
        {error && (
          <p className="error" data-testid="error">
            {error}
          </p>
        )}
        {!loading && (
          <ProiectList
            proiecte={proiecte}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
      </section>
    </div>
  );
}
