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

## Stage 6: data from a mock API
The list is served by json-server from `db.json`. The app fetches it on load and shows a loading state and an error state.

```bash
npm run api # terminal 1, http://localhost:3001
npm run dev # terminal 2, http://localhost:5173
```

## Stage 7: form and validation
Tasks can be added from the page. The form is controlled and validated, and every change (add, toggle, delete) goes to the API before it shows up in the list.

## Stage 8: routing and detail page
Three pages behind React Router: the list, a detail page at `/proiecte/:id`, and an about page, plus a 404 page. Component styles moved to CSS Modules.

## How to run

```bash
cd frontend
npm install
npm run api # terminal 1, http://localhost:3001
npm run dev # terminal 2, http://localhost:5173
```

Then open the address printed in the terminal (`http://localhost:5173`).

## Status
- [x] Stage 1: static HTML and CSS mockup
- [x] Stage 2: data and immutable operations in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [x] Stage 6: data from a mock API
- [x] Stage 7: form and validation
- [x] Stage 8: routing and detail page
- [ ] Stage 9: own backend with Express

### Checklist Etapa 6

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S6-R1 | npm run api starts, route shows JSON | `frontend/package.json#L11`, `frontend/db.json` | open http://localhost:3001/proiecte |
| S6-R2 | data no longer in React code | `frontend/src/App.jsx#L11` (`useState([])`) | read |
| S6-R3 | loading message while waiting | `frontend/src/App.jsx#L76` | `--delay 4000` |
| S6-R4 | error message when API is down | `frontend/src/App.jsx#L77-L81` | stop npm run api, refresh |
| S6-R5 | fetch only in api.js, URL from env | `frontend/src/api.js#L1-L11`, `frontend/.env.example` | search for fetch |
| S6-R6 | README Stage 6 section + AI log | `README.md`, `ai-log/etapa-06.md` | read |
| S6-R7 | commit "Stage 6" pushed | link to the commit | commit history |

### Checklist Etapa 7

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S7-R1 | controlled form: value + onChange on every field | [`frontend/src/components/ProiectForm.jsx#L50-L75`](https://github.com/danutpopescu5/Proiect-TW/blob/ad3192936247de7472ed5783d51a6fdeec9962ca/frontend/src/components/ProiectForm.jsx#L50-L75) | read |
| S7-R2 | empty title shows an error, nothing is sent | [`frontend/src/components/ProiectForm.jsx#L18-L26`](https://github.com/danutpopescu5/Proiect-TW/blob/ad3192936247de7472ed5783d51a6fdeec9962ca/frontend/src/components/ProiectForm.jsx#L18-L26) | submit empty, watch Network |
| S7-R3 | added item shows in the list and survives refresh | [`frontend/src/App.jsx#L44-L47`](https://github.com/danutpopescu5/Proiect-TW/blob/ad3192936247de7472ed5783d51a6fdeec9962ca/frontend/src/App.jsx#L44-L47), [`frontend/src/api.js#L18-L25`](https://github.com/danutpopescu5/Proiect-TW/blob/ad3192936247de7472ed5783d51a6fdeec9962ca/frontend/src/api.js#L18-L25) | add, refresh |
| S7-R4 | toggle and delete survive refresh | [`frontend/src/App.jsx#L49-L67`](https://github.com/danutpopescu5/Proiect-TW/blob/ad3192936247de7472ed5783d51a6fdeec9962ca/frontend/src/App.jsx#L49-L67) | toggle/delete, refresh |
| S7-R5 | button disabled while sending, form cleared only on success | [`frontend/src/components/ProiectForm.jsx#L28-L46`](https://github.com/danutpopescu5/Proiect-TW/blob/ad3192936247de7472ed5783d51a6fdeec9962ca/frontend/src/components/ProiectForm.jsx#L28-L46) | –delay 3000; stop API and submit |
| S7-R6 | tw.json and the data-testid attributes from table 7.3 | [`tw.json`](https://github.com/danutpopescu5/Proiect-TW/blob/ad3192936247de7472ed5783d51a6fdeec9962ca/tw.json), [`frontend/src/components/ProiectCard.jsx#L15-L42`](https://github.com/danutpopescu5/Proiect-TW/blob/ad3192936247de7472ed5783d51a6fdeec9962ca/frontend/src/components/ProiectCard.jsx#L15-L42) | querySelectorAll in the console |
| S7-R7 | README Stage 7 section + AI log | [`README.md`](https://github.com/danutpopescu5/Proiect-TW/blob/ad3192936247de7472ed5783d51a6fdeec9962ca/README.md), [`ai-log/etapa-07.md`](https://github.com/danutpopescu5/Proiect-TW/blob/ad3192936247de7472ed5783d51a6fdeec9962ca/ai-log/etapa-07.md) | read |
| S7-R8 | commit "Stage 7" pushed | [`commit ad31929`](https://github.com/danutpopescu5/Proiect-TW/commit/ad3192936247de7472ed5783d51a6fdeec9962ca) | commit history |

### Checklist Etapa 8

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S8-R1 | header navigation changes page without reload | [`frontend/src/App.jsx#L9-L20`](https://github.com/danutpopescu5/Proiect-TW/blob/83c6be9f614036556a278287ac73b9d94f116862/frontend/src/App.jsx#L9-L20), [`frontend/src/components/Layout.jsx#L31-L38`](https://github.com/danutpopescu5/Proiect-TW/blob/83c6be9f614036556a278287ac73b9d94f116862/frontend/src/components/Layout.jsx#L31-L38) | click links, watch Network |
| S8-R2 | click on an item opens its detail page | [`frontend/src/components/ProiectCard.jsx#L21-L27`](https://github.com/danutpopescu5/Proiect-TW/blob/83c6be9f614036556a278287ac73b9d94f116862/frontend/src/components/ProiectCard.jsx#L21-L27), [`frontend/src/pages/ProiectDetaliuPage.jsx#L54-L92`](https://github.com/danutpopescu5/Proiect-TW/blob/83c6be9f614036556a278287ac73b9d94f116862/frontend/src/pages/ProiectDetaliuPage.jsx#L54-L92) | click a title |
| S8-R3 | refresh on the detail URL works; missing id shows an error | [`frontend/src/pages/ProiectDetaliuPage.jsx#L13-L51`](https://github.com/danutpopescu5/Proiect-TW/blob/83c6be9f614036556a278287ac73b9d94f116862/frontend/src/pages/ProiectDetaliuPage.jsx#L13-L51) | refresh /proiecte/1, open /proiecte/999 |
| S8-R4 | unknown URL shows the app 404 page | [`frontend/src/App.jsx#L17`](https://github.com/danutpopescu5/Proiect-TW/blob/83c6be9f614036556a278287ac73b9d94f116862/frontend/src/App.jsx#L17), [`frontend/src/pages/NotFoundPage.jsx#L3-L12`](https://github.com/danutpopescu5/Proiect-TW/blob/83c6be9f614036556a278287ac73b9d94f116862/frontend/src/pages/NotFoundPage.jsx#L3-L12) | open /ceva |
| S8-R5 | each component has its .module.css; index.css only shared styles | [`frontend/src/components/`](https://github.com/danutpopescu5/Proiect-TW/tree/83c6be9f614036556a278287ac73b9d94f116862/frontend/src/components), [`frontend/src/pages/`](https://github.com/danutpopescu5/Proiect-TW/tree/83c6be9f614036556a278287ac73b9d94f116862/frontend/src/pages), [`frontend/src/index.css`](https://github.com/danutpopescu5/Proiect-TW/blob/83c6be9f614036556a278287ac73b9d94f116862/frontend/src/index.css) | read |
| S8-R6 | data-testid attributes from tables 7.3 and 8.2; detail route /<resource>/:id | [`frontend/src/components/Layout.jsx#L31`](https://github.com/danutpopescu5/Proiect-TW/blob/83c6be9f614036556a278287ac73b9d94f116862/frontend/src/components/Layout.jsx#L31), [`frontend/src/components/ProiectCard.jsx#L7-L41`](https://github.com/danutpopescu5/Proiect-TW/blob/83c6be9f614036556a278287ac73b9d94f116862/frontend/src/components/ProiectCard.jsx#L7-L41), [`frontend/src/pages/ProiectDetaliuPage.jsx#L54-L60`](https://github.com/danutpopescu5/Proiect-TW/blob/83c6be9f614036556a278287ac73b9d94f116862/frontend/src/pages/ProiectDetaliuPage.jsx#L54-L60), [`frontend/src/pages/NotFoundPage.jsx#L5`](https://github.com/danutpopescu5/Proiect-TW/blob/83c6be9f614036556a278287ac73b9d94f116862/frontend/src/pages/NotFoundPage.jsx#L5) | querySelector in the console |
| S8-R7 | README Stage 8 section + AI log | [`README.md`](https://github.com/danutpopescu5/Proiect-TW/blob/83c6be9f614036556a278287ac73b9d94f116862/README.md), [`ai-log/etapa-08.md`](https://github.com/danutpopescu5/Proiect-TW/blob/83c6be9f614036556a278287ac73b9d94f116862/ai-log/etapa-08.md) | read |
| S8-R8 | commit "Stage 8" pushed | [`commit 83c6be9`](https://github.com/danutpopescu5/Proiect-TW/commit/83c6be9f614036556a278287ac73b9d94f116862) | commit history |

## AI usage
În dezvoltarea acestui proiect s-au utilizat instrumente AI (Gemini / ChatGPT) pentru asistență la structurarea codului React, depanarea erorilor CSS/JSX și formatarea documentației. Jurnalele detaliate pentru fiecare etapă se găsesc în folderul `ai-log/`:
- [Stage 1 AI Log](ai-log/etapa-01.md)
- [Stage 2 AI Log](ai-log/etapa-02.md)
- [Stage 3 AI Log](ai-log/etapa-03.md)
- [Stage 4 AI Log](ai-log/etapa-04.md)
- [Stage 5 AI Log](ai-log/etapa-05.md)
- [Stage 6 AI Log](ai-log/etapa-06.md)
- [Stage 7 AI Log](ai-log/etapa-07.md)
- [Stage 8 AI Log](ai-log/etapa-08.md)
