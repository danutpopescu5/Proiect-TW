import { Router } from "express";
import { parseId, valideazaProiect } from "../validation.js";

const router = Router();

// Etapa 9: datele stau în memorie și se pierd la repornire (Etapa 10 le mută în MariaDB)
let proiecte = [
  {
    id: 1,
    titlu: "Formula Student Balkans 2026",
    gata: false,
    eticheta: "Formula Student",
    descriere:
      "Sesiune foto completă pe circuit: probe dinamice (accelerare, skidpad, autocross) și foto oficială de echipă la boxe.",
    locatie: "Circuit Târgu Mureș",
    data: "15-18 Iulie 2026",
  },
  {
    id: 2,
    titlu: "Autofest Drift",
    gata: true,
    eticheta: "Drift",
    descriere:
      "Fotografii de acțiune în virajele de inițiere și cadre slow-motion din runda a 3-a a campionatului de drift.",
    locatie: "Arena Drift Track",
    data: "10 August 2026",
  },
  {
    id: 3,
    titlu: "Private Session",
    gata: false,
    eticheta: "Private",
    descriere:
      "Ședință foto privată pentru portofoliu client - Porsche 911 GT3 RS în lumină de apus pe serpentine.",
    locatie: "Transfăgărășan",
    data: "5 Septembrie 2026",
  },
  {
    id: 4,
    titlu: "Formula Student Czech Republic",
    gata: false,
    eticheta: "Formula Student",
    descriere:
      "Acoperire media completă pentru monopostul electric pe Autodrom Most.",
    locatie: "Autodrom Most, Cehia",
    data: "2-6 August 2026",
  },
  {
    id: 5,
    titlu: "Transilvania Motor Ring Trackday",
    gata: true,
    eticheta: "Drift",
    descriere:
      "Cadre dinamice de mare viteză și panning pe virajele rapide din sectorul 2.",
    locatie: "Transilvania Motor Ring",
    data: "22 Septembrie 2026",
  },
];
let nextId = 6;

// Validează :id și găsește elementul, sau răspunde cu 400 / 404
function gasesteIndex(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Id invalid" });
    return -1;
  }
  const index = proiecte.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Proiectul nu există" });
  }
  return index;
}

// GET /proiecte
router.get("/", (req, res) => {
  res.json(proiecte);
});

// GET /proiecte/:id
router.get("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  res.json(proiecte[index]);
});

// POST /proiecte
router.post("/", (req, res) => {
  const { erori, date } = valideazaProiect(req.body ?? {});
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  const proiect = { id: nextId++, ...date };
  proiecte.push(proiect);
  res.status(201).json(proiect);
});

// PATCH /proiecte/:id (modificare parțială)
router.patch("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  const { erori, date } = valideazaProiect(req.body ?? {}, { partial: true });
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  proiecte[index] = { ...proiecte[index], ...date };
  res.json(proiecte[index]);
});

// DELETE /proiecte/:id
router.delete("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  proiecte.splice(index, 1);
  res.status(204).end();
});

export default router;
