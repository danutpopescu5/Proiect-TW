import { useState } from "react";
import ProiectList from "./components/ProiectList.jsx";

const PROIECTE_INITIALE = [
    { id: 1, titlu: "Formula Student Balkans 2026", gata: false, eticheta: "Formula Student" },
    { id: 2, titlu: "Autofest Drift", gata: true, eticheta: "Drift" },
    { id: 3, titlu: "Private Session", gata: false, eticheta: "Private" }
];

function temaInitiala() {
    document.documentElement.dataset.theme = "dark";
    return "dark";
}

export default function App() {
    const [proiecte, setProiecte] = useState(PROIECTE_INITIALE);
    const [tema, setTema] = useState(temaInitiala);

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
                    <ProiectList
                        proiecte={proiecte}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                </section>
            </main>

            <footer className="app-footer">
                Proiect Tehnologii Web - StudioDNG
            </footer>
        </>
    );
}