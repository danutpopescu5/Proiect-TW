# Stage 7: AI log

## Tools
- Gemini / ChatGPT

## Conversations
- Crearea formularului controlat `ProiectForm.jsx` pentru adăugarea de noi proiecte foto motorsport în aplicație, conectat la state-ul React prin proprietățile `value` și `onChange` pentru fiecare câmp (`titlu` ca text input, `eticheta` ca select dropdown).
- Implementarea validării pe client fără utilizarea ferestrelor modale `alert`: verificare câmp obligatoriu (`titlu`), lungime maximă (100 de caractere) și opțiune validă de categorie. Afișarea erorii inline sub formular (`data-testid="form-error"`), marcarea vizuală a câmpului invalid prin `aria-invalid="true"` și bordură roșie (`var(--mare)`).
- Prevenirea trimiterilor duplicate și a stărilor inconsistente prin dezactivarea butonului de submit (`disabled={trimite}`) și schimbarea textului în `"Se salvează..."` pe durata operației asincrone; golirea câmpurilor doar după confirmarea salvării pe server (`await onAdd`), păstrând datele introduse în cazul în care cererea eșuează.
- Extinderea modulului `frontend/src/api.js` cu funcția comună `request()` ce atașează antetul `Content-Type: application/json`, verifică codurile HTTP 2xx, tratează răspunsurile 204 No Content și expune funcțiile CRUD: `createProiect` (POST), `updateProiect` (PATCH) și `deleteProiect` (DELETE).
- Mutarea operațiilor de bifare și ștergere pe server (`PATCH /proiecte/:id`, `DELETE /proiecte/:id`) în `App.jsx`, asigurând persistența modificărilor la reîncărcarea paginii (`refresh`).
- Organizarea aspectului paginii pe două coloane (`grid-template-columns: 1fr 2fr`) cu formularul în stânga și lista în dreapta, plus regulă responsive pe ecrane înguste sub 700px (`@media (max-width: 700px)`).
- Configurarea reperelor de testare automată: crearea fișierului `tw.json` în rădăcina proiectului și adăugarea tuturor atributelor `data-testid` cerute pe carduri, butoane, formular și mesaje de stare.

## Key requests
### 1. Formular controlat și validare pe frontend
- Asked: Cum realizez un formular controlat în React pentru entitatea `proiecte` cu validare pe titlu (obligatoriu, max 100 caractere), categorie (`eticheta`), prevenire dublu-click și afișare mesaje de eroare inline?
- Got: Componenta `ProiectForm.jsx` cu state local (`titlu`, `eticheta`, `eroare`, `trimite`), funcție `valideaza()`, tratare `handleSubmit` cu `e.preventDefault()`, blocare buton pe timpul trimiterii și atribute `aria-invalid` / `data-testid`.
- Changed or rejected: Adaptat la specificul temei foto motorsport (categorii: Formula Student, Drift, Private).

### 2. Extinderea fișierului api.js cu operații CRUD și tratarea stării 204
- Asked: Cum abstractizez cererile HTTP către `json-server` într-o funcție comună reutilizabilă care să suporte POST, PATCH, DELETE și răspunsuri fără corp (204)?
- Got: Funcția `request(path, options)` cu concatenare headers, verificare `res.ok` și expresie ternară `res.status === 204 ? null : res.json()`, urmată de funcțiile dedicate entității.
- Changed or rejected: Păstrat principiul izolării stricte a apelurilor `fetch` exclusiv în `api.js`.

### 3. Integrarea operațiilor în App.jsx și sincronizarea cu serverul mock
- Asked: Cum conectez operațiile de adăugare, comutare stare și ștergere la API-ul backend astfel încât modificările să se reflecte pe server și să reziste la refresh?
- Got: Funcțiile asincrone `handleAdd`, `handleToggle` și `handleDelete` apelate înainte de actualizarea state-ului local React. `handleAdd` nu prinde eroarea cu `try...catch`, permițându-i să ajungă înapoi în formular pentru a fi afișată utilizatorului.
- Changed or rejected: Menținută logica existentă a temei întunecate / luminoase și structura header-ului cu imagine de fundal.

### 4. Reperele pentru verificarea automată (tw.json și data-testid)
- Asked: Cum configurez repository-ul pentru suita de teste automate a coordonatorilor?
- Got: Crearea fișierului `tw.json` în rădăcina proiectului (`resource: "proiecte"`, `title: "titlu"`, `done: "gata"`, `sample: { "eticheta": "Drift" }`) și marcarea elementelor cheie din DOM cu atributele `data-testid` corespunzătoare.
- Changed or rejected: Asigurate atributele exacte din specificație: `form`, `form-title`, `form-eticheta`, `form-submit`, `form-error`, `item`, `item-toggle`, `item-title`, `item-delete`, `empty`, `loading`, `error`.

## What I learned / what did not work
- Am înțeles mecanismul componentelor controlate în React, unde valoarea fiecărui câmp este controlată de starea React (`value`) și actualizată prin callback-ul `onChange`.
- Am învățat cum se previne comportamentul nativ de submit al browserului (`e.preventDefault()`) pentru a evita reîncărcarea paginii într-o aplicație SPA.
- Am descoperit că lăsând `handleAdd` fără bloc `try...catch`, eroarea ajunge în formular unde poate fi captată și afișată, permițând păstrarea textului introdus de utilizator când serverul este offline.
- Am învățat că răspunsurile HTTP 204 (No Content) produc eroare la apelarea `res.json()`, necesitând verificarea explicită a codului de stare înainte de parsare.
- Am validat persistența datelor la refresh prin scrierea directă pe disc în `frontend/db.json` realizată de `json-server` la metodele POST, PATCH și DELETE.
