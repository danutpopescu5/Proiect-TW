import { useEffect, useState } from "react";
import ProiectList from "./components/ProiectList.jsx";
import { fetchProiecte } from "./api.js";

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

    // În Etapa 6 modificările rămân locale: se pierd la refresh (rezolvat în Etapa 7)
    function handleToggle(id) {
        setProiecte((prev) =>
            prev.map((t) => (t.id === id ? { ...t, gata: !t.gata } : t))
        );
    }

    function handleDelete(id) {
        setProiecte((prev) => prev.filter((t) => t.id !== id));
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
                    <h2>Proiectele mele</h2>
                    {loading && <p className="info">Se încarcă proiectele...</p>}
                    {error && (
                        <p className="error">
                            Nu am putut încărca datele: {error}. Rulează <code>npm run api</code>?
                        </p>
                    )}
                    {!loading && !error && (
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
