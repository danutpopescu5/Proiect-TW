# Stage 5: AI log

## Tools
- Gemini / ChatGPT

## Conversations
- Implementarea state-ului local cu `useState` în componenta părinte `App` și actualizarea imutabilă a listei prin funcțiile de comutare (`handleToggle`) și ștergere (`handleDelete`).
- Adăugarea unui buton în antet pentru comutarea dinamică a temei (Light/Dark mode) prin manipularea atributului `data-theme` pe elementul `<html>`.

## Key requests
### 1. Gestionarea state-ului și funcțiile imutabile
- Asked: Cum mut lista de proiecte în `useState` și cum asigur actualizarea imutabilă a elementelor fără a modifica array-ul direct?
- Got: Folosirea metodei `.map()` cu operatorul spread (`{ ...t, gata: !t.gata }`) pentru comutare și `.filter()` pentru ștergere, primind întotdeauna cel mai recent state prin forma cu funcție `setProiecte((prev) => ...)`.
- Changed or rejected: Am adaptat structura pentru proiectele foto de motorsport din StudioDNG.

### 2. Comutarea temei (Light/Dark mode)
- Asked: Cum pot implementa un buton în antet care să schimbe tema culorilor interfeței la nivel global?
- Got: Crearea unui state pentru temă, scriere directă pe `document.documentElement.dataset.theme` și utilizarea variabilelor CSS adaptate după `:root[data-theme="dark"]`.
- Changed or rejected: S-a integrat perfect peste designul existent cu temă întunecată.

## What I learned / what did not work
- Am înțeles diferența dintre o valoare păstrată în state și o valoare derivată (cum este contorul de proiecte active calculat din listă la fiecare randare).
- Am învățat să construiesc un formular/checkbox controlat corect, evitând avertismentele din consola browserului legate de lipsa lui `onChange`.
- Am testat interactivitatea bifei și a ștergerii, verificând că toate modificările se reflectă instantaneu în interfață.