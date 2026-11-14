import { useState } from "react";

const ETICHETE = [
    { value: "Formula Student", label: "Formula Student" },
    { value: "Drift", label: "Drift" },
    { value: "Private", label: "Private" },
];

const TITLU_MAX = 100;

// Formular controlat: state-ul React este sursa de adevăr pentru câmpuri
export default function ProiectForm({ onAdd }) {
    const [titlu, setTitlu] = useState("");
    const [eticheta, setEticheta] = useState("Formula Student");
    const [eroare, setEroare] = useState("");
    const [trimite, setTrimite] = useState(false);

    function valideaza() {
        const t = titlu.trim();
        if (t === "") return "Titlul este obligatoriu.";
        if (t.length > TITLU_MAX) return `Titlul are maximum ${TITLU_MAX} de caractere.`;
        if (!ETICHETE.some((item) => item.value === eticheta)) {
            return "Categoria selectată nu este validă.";
        }
        return "";
    }

    async function handleSubmit(e) {
        e.preventDefault(); // oprește reîncărcarea paginii
        const mesaj = valideaza();
        if (mesaj) {
            setEroare(mesaj);
            return;
        }
        setEroare("");
        setTrimite(true);
        try {
            await onAdd({ titlu: titlu.trim(), eticheta, gata: false });
            setTitlu("");
            setEticheta("Formula Student");
        } catch (err) {
            setEroare(err.message);
        } finally {
            setTrimite(false);
        }
    }

    return (
        <form className="task-form" onSubmit={handleSubmit} noValidate data-testid="form">
            <label>
                Titlu proiect
                <input
                    type="text"
                    value={titlu}
                    onChange={(e) => setTitlu(e.target.value)}
                    placeholder="Ex: Formula Student Balkans 2026"
                    maxLength={TITLU_MAX}
                    aria-invalid={Boolean(eroare)}
                    data-testid="form-title"
                />
            </label>
            <label>
                Categorie
                <select
                    value={eticheta}
                    onChange={(e) => setEticheta(e.target.value)}
                    data-testid="form-eticheta"
                >
                    {ETICHETE.map((p) => (
                        <option key={p.value} value={p.value}>
                            {p.label}
                        </option>
                    ))}
                </select>
            </label>
            {eroare && (
                <p className="error" data-testid="form-error">
                    {eroare}
                </p>
            )}
            <button type="submit" disabled={trimite} data-testid="form-submit">
                {trimite ? "Se salvează..." : "Adaugă proiect"}
            </button>
        </form>
    );
}
