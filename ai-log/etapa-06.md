# Stage 6: AI log

## Tools
- Gemini / ChatGPT

## Conversations
- Mutarea datelor inițiale ale proiectelor foto din codul React într-un server REST simulat cu `json-server@0.17.4`, stocate în `frontend/db.json` pe resursa `/proiecte`.
- Izolarea apelurilor de rețea într-un modul dedicat (`frontend/src/api.js`) folosind `fetch`, `async`/`await` și citind adresa API-ului din variabila de mediu `VITE_API_URL` (cu valoare de rezervă `http://localhost:3001` și fișier `.env.example`).
- Încărcarea asincronă a datelor la montarea componentei principale `App` cu hook-ul `useEffect`, gestionarea funcției de curățare (`ignore`) pentru prevenirea efectelor duplicate în modul de dezvoltare React (Strict Mode).
- Implementarea și randarea celor trei stări ale cererii HTTP: încărcare (`loading`), succes (afișarea listei `ProiectList`) și eroare (`error`), cu stiluri dedicate pentru mesaje de info și alertă fără a altera styling-ul existent al aplicației.

## Key requests
### 1. Configurarea serverului mock cu json-server
- Asked: Cum configurez un API REST simulat pe portul 3001 folosind `json-server` versiunea 0.17.4 și fișierul `db.json` adaptat temei StudioDNG?
- Got: Instalarea `json-server@0.17.4` ca devDependency, definirea resursei `"proiecte"` în `frontend/db.json` cu cel puțin 5 elemente variate ca stare și etichetă foto (Formula Student, Drift, Private), și adăugarea scriptului `"api": "json-server --watch db.json --port 3001"` în `package.json`.
- Changed or rejected: S-au folosit date conforme temei foto motorsport StudioDNG și s-a fixat strict versiunea 0.17.4 conform cerințelor etapei.

### 2. Modulul de API și variabilele de mediu
- Asked: Cum izolez cererea `fetch` într-un fișier separat `src/api.js` și cum citesc adresa dintr-o variabilă de mediu?
- Got: Exportul funcției asincrone `fetchProiecte()`, verificarea explicită a lui `res.ok`, aruncarea erorilor HTTP și utilizarea `import.meta.env.VITE_API_URL ?? "http://localhost:3001"`, alături de fișierul `.env.example`.
- Changed or rejected: Respectat întocmai cerința de a nu apela `fetch` direct din componente.

### 3. Integrarea useEffect și tratarea celor 3 stări (loading, success, error)
- Asked: Cum încarc datele în `App.jsx` la montarea componentei și cum gestionez stările de loading, succes și eroare, menținând stilul neschimbat?
- Got: Definirea state-urilor `proiecte` (inițial `[]`), `loading` (inițial `true`) și `error` (inițial `null`), apelarea `fetchProiecte()` într-o funcție `load()` asincronă definită în interiorul lui `useEffect` cu variabilă de curățare `let ignore = false`, și randare condiționată a mesajelor `.info` și `.error` alături de adăugarea claselor și variabilelor CSS în `App.css`.
- Changed or rejected: Păstrat întocmai layout-ul și funcționalitățile existente (comutator temă, ștergere/bifare locală).

## What I learned / what did not work
- Am înțeles că `fetch` nu aruncă excepții pentru codurile de stare HTTP de tip 404 sau 500, motiv pentru care este necesară verificarea proprietății `res.ok` înainte de parsarea JSON.
- Am învățat de ce funcția transmisă către `useEffect` nu poate fi `async` și cum se definește o funcție asincronă internă (`load()`) apelată imediat.
- Am descoperit rolul variabilei `ignore` din funcția de cleanup a lui `useEffect` pentru evitarea actualizărilor de stare pe componente demontate și gestionarea montării duble din React 19 în mod dezvoltare.
- Am testat comportamentul aplicației la oprirea serverului (afișarea mesajului explicit de eroare) și la simularea unei latențe cu parametrul `--delay 4000` (afișarea stării de încărcare).
