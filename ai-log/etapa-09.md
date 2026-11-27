# Stage 9: AI log

## Tools
- Antigravity / Gemini

## Conversations
- Inițializarea proiectului backend Node.js în folderul `backend/` cu `"type": "module"`, Express 5 (`express`) și `cors`, scripturi `start` (`node src/server.js`) și `dev` (`node --watch src/server.js`), plus fișierele `.env.example` și `.gitignore`.
- Separarea configurației aplicației Express (`backend/src/app.js`) de pornirea efectivă a serverului HTTP (`backend/src/server.js`) și adăugarea rutei de verificare `GET /health`.
- Implementarea celor 5 rute REST în `backend/src/routes/proiecte.js` (`GET /proiecte`, `GET /proiecte/:id`, `POST /proiecte`, `PATCH /proiecte/:id`, `DELETE /proiecte/:id`), folosind în memorie cele 5 proiecte motorsport ale aplicației StudioDNG și funcția helper `gasesteIndex` pentru codurile `400` (`Id invalid`) și `404` (`Proiectul nu există`).
- Implementarea validării pe server în `backend/src/validation.js` (`valideazaProiect`, `parseId`) cu listă albă de câmpuri (`titlu`, `eticheta`, `gata`, plus câmpurile opționale `descriere`, `locatie`, `data`), suport pentru validare parțială la `PATCH` și alinierea valorilor `ETICHETE` (`"Formula Student"`, `"Drift"`, `"Private"`) cu `frontend/src/constants.js`.
- Configurarea middleware-urilor în ordinea corectă în `app.js`: `cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" })`, `express.json()`, rutele `/health` și `/proiecte`, ruta catch-all `404` și middleware-ul de tratare centralizată a erorilor cu 4 parametri (`(err, req, res, next)`).
- Actualizarea funcției `request()` din `frontend/src/api.js` pentru a citi mesajul de eroare din JSON-ul `{ error: "..." }` returnat de server, și eliminarea completă a `json-server` (`frontend/db.json`, scriptul `api` și dependența din `frontend/package.json`).

## Key requests
### 1. Structura backend-ului Express 5 și separarea `app.js` / `server.js`
- Asked: Cum organizez proiectul backend cu ES Modules, Express 5, CORS pentru portul frontendului și separarea instanței Express de `app.listen`?
- Got: Fișierul `backend/package.json` cu `"type": "module"` și `"dev": "node --watch src/server.js"`, `app.js` cu middleware-urile și rutele, respectiv `server.js` care importă `app` și pornește ascultarea pe portul `3001` (sau `process.env.PORT`).
- Changed or rejected: Adaptat prefixul rutei din `/tasks` în `/proiecte` conform `tw.json` și `frontend/src/api.js`.

### 2. Rutele REST și validarea pe server cu listă albă
- Asked: Cum implementez cele 5 rute CRUD pe tablou în memorie și validarea datelor pe server atât pentru `POST`, cât și parțial pentru `PATCH`?
- Got: `backend/src/routes/proiecte.js` cu `gasesteIndex` și `backend/src/validation.js` cu `valideazaProiect(body, { partial })` și `parseId(value)`.
- Changed or rejected: Sincronizate valorile `ETICHETE` cu `frontend/src/constants.js` și păstrate în lista albă câmpurile opționale `descriere`, `locatie`, `data` folosite de pagina de detaliu `ProiectDetaliuPage.jsx`.

### 3. Conectarea frontendului și eliminarea `json-server`
- Asked: Ce modificări trebuie făcute în frontend după înlocuirea `json-server` cu serverul propriu Express?
- Got: Citirea câmpului `body.error` în `request()` din `frontend/src/api.js` la răspunsuri `!res.ok`, ștergerea `frontend/db.json`, eliminarea scriptului `api` și a pachetului `json-server` din `frontend/package.json`, urmată de `npm install` pentru actualizarea `package-lock.json`.
- Changed or rejected: Păstrate neschimbate componentele React, deoarece toate cererile HTTP treceau deja prin `frontend/src/api.js`.

## What I learned / what did not work
- Am înțeles de ce browserul blochează cererile între `localhost:5173` și `localhost:3001` (origini diferite din cauza porturilor diferite) și cum rezolvă serverul această problemă trimițând antetul `Access-Control-Allow-Origin` prin middleware-ul `cors()`.
- Am văzut importanța ordinii middleware-urilor în Express: `cors()` și `express.json()` trebuie montate înaintea rutelor, iar handler-ul de `404` și funcția de erori cu 4 parametri trebuie puse la final.
- Am înțeles de ce validarea din frontend nu este suficientă: cererile directe prin `curl` sau alți clienți pot trimite date arbitrare, deci serverul trebuie să valideze tipurile, limitele și să folosească o listă albă de câmpuri.
- Am verificat că eliminarea unei dependențe din `package.json` necesită rularea `npm install` pentru actualizarea `package-lock.json`, altfel `npm ci` va eșua ulterior.
