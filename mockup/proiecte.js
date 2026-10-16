const proiecte = [
    { id: 1, titlu: "Formula Student Balkans 2026", gata: false, eticheta: "Formula Student" },
    { id: 2, titlu: "Autofest Drift", gata: true, eticheta: "Drift" },
    { id: 3, titlu: "Private Session", gata: false, eticheta: "Private" }
];

const ETICHETE = ["Formula Student", "Drift", "Private"];

function listeazaTitluri(lista) {
    return lista.map((t) => t.titlu);
}

function numaraActive(lista) {
    return lista.filter((t) => !t.gata).length;
}

function cautaDupaTitlu(lista, text) {
    return lista.filter((t) => t.titlu.toLowerCase().includes(text.toLowerCase()));
}

function nextId(lista) {
    return lista.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}

function adaugaProiect(lista, titlu, eticheta = "Formula Student") {
    const titluCurat = titlu.trim();
    if (!titluCurat) {
        console.log("Eroare: Titlul nu poate fi gol.");
        return lista;
    }
    if (!ETICHETE.includes(eticheta)) {
        console.log("Eroare: Etichetă invalidă:", eticheta);
        return lista;
    }
    const nou = { id: nextId(lista), titlu: titluCurat, gata: false, eticheta };
    return [...lista, nou];
}

function comutaStare(lista, id) {
    return lista.map((t) => (t.id === id ? { ...t, gata: !t.gata } : t));
}

function stergeProiect(lista, id) {
    return lista.filter((t) => t.id !== id);
}

console.log("--- Citire ---");
console.log("Titluri:", listeazaTitluri(proiecte).join(", "));
console.log("Active:", numaraActive(proiecte));
console.log("Căutare 'balkans':", listeazaTitluri(cautaDupaTitlu(proiecte, "balkans")).join(", "));

console.log("--- Adăugare ---");
let listaNoua = adaugaProiect(proiecte, "Etapă nouă foto", "Drift");
console.log("Lista nouă:", listaNoua.length, "proiecte");
console.log("Originalul a rămas cu:", proiecte.length, "proiecte");

console.log("--- Modificare și ștergere ---");
listaNoua = comutaStare(listaNoua, 1);
console.log("După bifarea id 1, active:", numaraActive(listaNoua));
listaNoua = stergeProiect(listaNoua, 3);
console.log("După ștergerea id 3:", listeazaTitluri(listaNoua).join(", "));

console.log("--- Validare ---");
adaugaProiect(proiecte, "");
adaugaProiect(proiecte, "Test", "Inexistent");