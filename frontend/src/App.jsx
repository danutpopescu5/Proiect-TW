import ProiectList from "./components/ProiectList.jsx";

const proiecte = [
    { id: 1, titlu: "Formula Student Balkans 2026", gata: false, eticheta: "Formula Student" },
    { id: 2, titlu: "Timișoara Drift Grand Prix Final", gata: true, eticheta: "Drift" },
    { id: 3, titlu: "Night Session / Garaj & Setup", gata: false, eticheta: "Private" }
];

export default function App() {
    const active = proiecte.filter((t) => !t.gata).length;

    return (
        <>
            <header className="app-header">
                <h1>StudioDNG</h1>
                <p>Gestionarea ședințelor foto și a proiectelor media din motorsport.</p>
                <p className="app-count">
                    {proiecte.length} elemente, dintre care {active} active
                </p>
            </header>

            <main className="container">
                <section className="panel">
                    <h2>Proiectele mele</h2>
                    <ProiectList proiecte={proiecte} />
                </section>
            </main>

            <footer className="app-footer">
                Proiect Tehnologii Web - StudioDNG
            </footer>
        </>
    );
}