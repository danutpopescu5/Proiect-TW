import { useEffect, useState } from "react";
import ProiectList from "./components/ProiectList.jsx";
import ProiectForm from "./components/ProiectForm.jsx";
import {
    createProiect,
    deleteProiect,
    fetchProiecte,
    updateProiect,
} from "./api.js";

function temaInitiala() {
    document.documentElement.dataset.theme = "dark";
    return "dark";
}

export default function App() {
    const [proiecte, setProiecte] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tema, setTema] = useState(temaInitiala);

    // Rulează o singură dată, după prima randare
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

    // Întâi serverul, apoi state-ul: pe ecran ajunge doar ce s-a salvat
    async function handleAdd(proiect) {
        const creat = await createProiect(proiect); // serverul întoarce elementul cu id
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

    function handleTema() {
        const noua = tema === "dark" ? "light" : "dark";
        setTema(noua);
        document.documentElement.dataset.theme = noua;
    }

    const active = proiecte.filter((t) => !t.gata).length;

    return (
        <>
            <header className="app-header">
                <button
                    className="theme-toggle"
                    onClick={handleTema}
                    aria-pressed={tema === "dark"}
                >
                    {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
                </button>
                <img src="/logo.png" alt="StudioDNG Logo" className="app-logo" />
                <p>Gestionarea ședințelor foto și a proiectelor media din motorsport.</p>
                <p className="app-count">
                    {proiecte.length} elemente, dintre care {active} active
                </p>
            </header>

            <main className="container">
                <section className="panel">
                    <h2>Adaugă proiect</h2>
                    <ProiectForm onAdd={handleAdd} />
                </section>

                <section className="panel">
                    <h2>Proiectele mele</h2>
                    {loading && (
                        <p className="info" data-testid="loading">
                            Se încarcă proiectele...
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
            </main>

            <footer className="app-footer">
                Proiect Tehnologii Web - StudioDNG
            </footer>
        </>
    );
}
