# Stage 3: AI log

## Tools
- Gemini
- Vite & React Documentation

## Conversations
- Mutarea paginii statice în folderul `mockup/` și configurarea unui proiect React modern folosind Vite în folderul `frontend/`.
- Adaptarea sintaxei din HTML/CSS în JSX și integrarea stilurilor din Etapa 1 în `App.css`.

## Key requests
### 1. Migrarea datelor și calculul în componenta App
- Asked: Cum pot muta array-ul de obiecte din Etapa 2 în componenta principală `App.jsx` din React și cum afișez dinamic numărul de elemente active în antet?
- Got: Plasarea datelor deasupra componentei `App`, calcularea elementelor active cu `.filter().length` și afișarea lor prin interpolare JSX (`{active}`).
- Changed or rejected: Am păstrat structura de date specifică temei de motorsport (`StudioDNG`) și am folosit tag-ul `<pre>` pentru afișarea temporară a datelor ca JSON, conform cerinței.

### 2. Integrarea stilurilor și curățarea template-ului Vite
- Asked: Care sunt pașii pentru curățarea fișierelor demonstrative generate de Vite și reutilizarea stilurilor CSS existente fără conflicte?
- Got: Eliminarea folderului `assets` și a fișierului `index.css`, mutarea stilurilor din Etapa 1 în `App.css` cu ajustarea grilei la o singură coloană, și actualizarea importului în `main.jsx`.
- Changed or rejected: Am păstrat designul cu tema întunecată și layout-ul existent, asigurându-ne că build-ul rulează fără erori.

## What I learned / what did not work
- Am învățat cum să inițializez și să pornesc un server de dezvoltare local folosind Node.js și Vite (`npm run dev`).
- Am înțeles diferențele de sintaxă dintre HTML pur și JSX (cum ar fi utilizarea `className` în loc de `class` și închiderea obligatorie a etichetelor).
- Am verificat cu succes generarea pachetului de producție prin comanda `npm run build` pentru a mă asigura că aplicația nu are erori de sintaxă sau de import.