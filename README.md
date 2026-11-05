# StudioDNG - Motorsport Photography & Media

Aplicație web pentru gestionarea ședințelor foto și a proiectelor media din motorsport (Formula Student, Drift, sesiuni private).

## Fields (Câmpurile entității)

| Field | Type | Description | Allowed values / examples |
| :--- | :--- | :--- | :--- |
| `id` | Number | Identificator unic al proiectului | `1`, `2`, `3` |
| `titlu` | String | Numele evenimentului sau ședinței foto | `"Formula Student Balkans 2026"` |
| `gata` | Boolean | Starea proiectului (finalizat sau activ) | `true` (Gata), `false` (Activ) |
| `eticheta` | String | Categoria proiectului foto | `"Formula Student"`, `"Drift"`, `"Private"` |

## Sample data (Elemente de test)

1. `{ id: 1, titlu: "Formula Student Balkans 2026", gata: false, eticheta: "Formula Student" }`
2. `{ id: 2, titlu: "Autofest Drift", gata: true, eticheta: "Drift" }`
3. `{ id: 3, titlu: "Private Session", gata: false, eticheta: "Private" }`

```json
[
  { "id": 1, "titlu": "Formula Student Balkans 2026", "gata": false, "eticheta": "Formula Student" },
  { "id": 2, "titlu": "Autofest Drift", "gata": true, "eticheta": "Drift" },
  { "id": 3, "titlu": "Private Session", "gata": false, "eticheta": "Private" }
]
```

## Stage 1: Static mockup
Pagina statică (HTML și CSS) cu antet personalizat, variabilă de temă întunecată și lista de proiecte foto se află în folderul `mockup/`.

## Stage 2: JavaScript data logic
Operațiile imutabile pe array-ul de obiecte (citire, filtrare, adăugare, comutare stare, ștergere și validare) sunt implementate în `mockup/proiecte.js`.

## Stage 3: Vite and React project
The app now lives in `frontend/`, built with Vite. The data from stage 2 moved into the main component; the list is still printed raw.

## Stage 4: components
The list is rendered from the data, through two components:
- `ProiectList` receives the whole array and renders one card per item
- `ProiectCard` receives a single item through props and displays it

## Stage 5: local state and events
The list lives in React state (`useState`). Checking and deleting work from the page, and the counters in the header follow automatically. A button in the header switches between light and dark mode. Changes are lost on refresh, which is what stage 6 and stage 10 fix.

## How to run

```bash
cd frontend
npm install
npm run dev
```

Then open the address printed in the terminal (`http://localhost:5173`).

## Status
- [x] Stage 1: static HTML and CSS mockup
- [x] Stage 2: data and immutable operations in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [ ] Stage 6: loading data from a mock API

## AI usage
În dezvoltarea acestui proiect s-au utilizat instrumente AI (Gemini / ChatGPT) pentru asistență la structurarea codului React, depanarea erorilor CSS/JSX și formatarea documentației. Jurnalele detaliate pentru fiecare etapă se găsesc în folderul `ai-log/`:
- [Stage 1 AI Log](ai-log/etapa-01.md)
- [Stage 2 AI Log](ai-log/etapa-02.md)
- [Stage 3 AI Log](ai-log/etapa-03.md)
- [Stage 4 AI Log](ai-log/etapa-04.md)
- [Stage 5 AI Log](ai-log/etapa-05.md)