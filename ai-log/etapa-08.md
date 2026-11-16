# Stage 8: AI log

## Tools
- Gemini / ChatGPT

## Conversations
- Instalarea pachetului `react-router-dom` în folderul `frontend/` și configurarea `BrowserRouter` în `src/main.jsx` pentru a permite navigarea de tip SPA (Single Page Application) fără reîncărcarea paginii.
- Crearea layout-ului comun `src/components/Layout.jsx` care înglobează antetul cu navigare (`NavLink`), conținutul dinamic redat prin componenta `<Outlet />` și subsolul comun al aplicației StudioDNG. Legăturile din navigare sunt marcate automat cu clasa `active` prin funcția `navClass` la potrivirea rutei, iar atributul `end` pe ruta `/` previne starea activă permanentă.
- Configurarea hărții rutelor în `src/App.jsx` folosind componentele `<Routes>` și `<Route>`: ruta principală `/` pentru lista de proiecte (`ProiectePage`), ruta dinamică `/proiecte/:id` (și aliasul `/tasks/:id`) pentru detaliile fiecărui proiect (`ProiectDetaliuPage`), ruta `/despre` pentru pagina de prezentare (`DesprePage`) și ruta catch-all `*` pentru gestionarea adreselor inexistente (`NotFoundPage`).
- Reorganizarea stilurilor din fișierul unic `App.css` în fișiere modulare specifice fiecărei componente (`*.module.css`) și păstrarea exclusivă a variabilelor globale, reset-urilor de bază și claselor comune (`.panel`, `.btn`, `.btn-danger`, `.error`, `.info`, `.empty`, badge-uri) în `src/index.css`.
- Transformarea titlului fiecărui card din listă într-un link (`<Link to={`/proiecte/${proiect.id}`}>`) cu atributul `data-testid="item-link"`, permițând accesarea directă a paginii de detaliu fără a declanșa bifa de finalizare (înlocuirea elementului `<label>` părinte cu un `<div>`).
- Extinderea modulului `src/api.js` cu funcția `fetchProiect(id)` (cu aliasul `fetchTask`) pentru interogarea individuală a serverului mock pe ruta `GET /proiecte/:id`.
- Implementarea paginii de detaliu `ProiectDetaliuPage.jsx`: extragerea parametrului dinamic din URL cu hook-ul `useParams()`, încărcarea asincronă a datelor în `useEffect([id])` cu curățare (`ignore = true`), afișarea stării de încărcare (`data-testid="loading"`) și tratarea explicită a elementelor inexistente sau erorilor 404 de la server (`data-testid="error"`) cu posibilitate de întoarcere la listă. Afișarea detaliilor extinse ale ședințelor foto (descriere, locație, data, status, categorie cu badge tematic, ID) în cadrul unei liste de definiții stilizate (`<dl>`).
- Centralizarea constantelor și categoriilor în `src/constants.js` (`ETICHETE`, `ETICHETE_PROIECT`, `CLASE_BADGE`) și utilizarea lor coerentă în formular, carduri și pagina de detaliu.
- Adăugarea tuturor atributelor cerute de verificarea automată: `nav`, `item-link`, `detail`, `detail-title`, `loading`, `error`, `not-found`, alături de conservarea tuturor atributelor din Etapa 7 (`item`, `data-id`, `item-toggle`, `item-delete`, `form`, `form-title`, `form-eticheta`, `form-submit`, `form-error`, `empty`).

## Key requests
### 1. Configurarea rutării cu React Router și layout comun
- Asked: Cum împart aplicația în pagini multiple cu React Router fără reîncărcare, având un antet comun cu link-uri active automat și o zonă de conținut variabil?
- Got: Încapsularea aplicației în `BrowserRouter`, folosirea `Routes` cu o rută părinte fără path ce randează `Layout` cu `<Outlet />`, și utilizarea `NavLink` cu proprietatea `className={({ isActive }) => ...}` și atributul `end` pentru prima rută.
- Changed or rejected: Adaptat la specificul StudioDNG, păstrând comutatorul de temă luminoasă/întunecată în bara de navigare și aplicând atributul `data-testid="nav"`.

### 2. Migrarea stilurilor pe componente folosind CSS Modules
- Asked: Cum mut stilurile din fișierul global `App.css` în fișiere CSS Modules fără conflicte de nume de clase între componente?
- Got: Redenumirea `App.css` în `index.css`, izolarea claselor specifice fiecărei componente și pagini în fișiere `[Nume].module.css` importate ca obiect `styles`, și referențierea claselor în JSX ca `styles.clasa`. Păstrarea claselor globale precum `.panel`, `.btn`, `.btn-danger`, `.badge` în `index.css`.
- Changed or rejected: Păstrat paleta completă de variabile CSS (culori de accent, temă dark/light, borduri, umbre) și creat aliasuri `.module.css` pentru componentele generice `Task*`.

### 3. Pagina de detaliu și tratarea id-urilor inexistente
- Asked: Cum accesez parametrul din URL și cum încarc datele unui singur proiect, gestionând corect schimbarea adresei și cazul în care id-ul nu există pe server (404)?
- Got: Folosirea `useParams()`, declararea funcției `fetchProiect(id)` în `api.js` și apelarea ei în `useEffect` cu dependența `[id]`. Tratarea stării de eroare (`error && <p className="error" data-testid="error">...`) atunci când serverul răspunde cu 404, oferind utilizatorului un link de revenire la lista de proiecte.
- Changed or rejected: Afișate câmpuri detaliate specifice proiectelor media din motorsport (locație, dată desfășurare, descriere sesiune foto) care nu sunt vizibile în cardul sumar din listă.

### 4. Paginile secundare (Despre și 404) și reperele automate
- Asked: Cum configurez pagina 404 și pagina Despre pentru a satisface cerințele verificării automate?
- Got: Componenta `NotFoundPage` marcată cu `data-testid="not-found"` asociată rutei `path="*"`, și componenta `DesprePage` pe ruta `/despre`.
- Changed or rejected: Completat textul paginii Despre cu informații relevante despre proiectul StudioDNG și tehnologiile utilizate în cadrul stivei.

## What I learned / what did not work
- Am înțeles diferența fundamentală dintre un link tradițional `<a>` (care inițiază o nouă cerere HTTP pentru documentul HTML) și componentele `<Link>` / `<NavLink>` din React Router (care interceptează navigarea în istoric și actualizează doar arborele DOM React).
- Am învățat rolul componentei `<Outlet />` în implementarea rutelor imbricate (nested routes) și construirea de layout-uri reutilizabile.
- Am aprofundat mecanismul CSS Modules prin care compilatorul generează identificatori unici de clasă (ex. `_title_1vaab_29`), prevenind scurgerile de stiluri și coliziunile globale.
- Am observat că regula de lint `react-hooks/set-state-in-effect` atenționează apelurile directe `setLoading(true)` la începutul unui efect sincron; pornirea stării cu `loading = true` din inițializare rezolvă elegant problema fără a genera avertismente de compilare.
- Am validat tratarea răspunsului HTTP 404 la cererea unui id inexistent (ex. `/proiecte/999`), asigurând o experiență stabilă prin afișarea unui mesaj clar și a unui buton de navigare înapoi.
