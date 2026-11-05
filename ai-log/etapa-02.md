# Stage 2: AI log

## Tools
- Gemini

## Conversations
- Structurarea funcțiilor imutabile în JavaScript pentru listarea, numărarea, căutarea, adăugarea cu validare, comutarea stării și ștergerea elementelor dintr-un array de obiecte.

## Key requests
### 1. Funcții imutabile și operatorul spread
- Asked: Cum pot scrie funcții precum comutarea stării sau adăugarea unui element respectând principiul imutabilității (fără a modifica array-ul original)?
- Got: Folosirea metodei `.map()` combinată cu operatorul spread (`{ ...t, gata: !t.gata }`) pentru comutare și crearea unui nou array (`[...lista, nou]`) pentru adăugare.
- Changed or rejected: Am aplicat direct aceste metode pentru a asigura compatibilitatea totală cu viitoarea etapă în React.

### 2. Calculul ID-ului unic prin reduce
- Asked: Cum se calculează corect următorul ID dintr-o listă folosind metoda reduce, evitând folosirea lungimii array-ului?
- Got: Utilizarea lui `reduce` pentru a afla maximul existent și incrementarea lui cu 1.
- Changed or rejected: Am implementat funcția `nextId` conform modelului din ghid pentru a preveni ID-urile duplicate după ștergere.

## What I learned / what did not work
- Am înțeles importanța imutabilității în JavaScript și cum funcționează metodele de array (`map`, `filter`, `find`, `reduce`).
- Am învățat să validez datele de intrare (cum ar fi verificarea unui titlu gol sau a unei etichete permise) înainte de a modifica starea listei.
- Am testat cu succes funcționalitatea direct în consola browserului folosind mesaje grupate pe secțiuni.