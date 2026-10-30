# Stage 4: AI log

## Tools
- Gemini / ChatGPT

## Conversations
- Împărțirea interfeței React în componente modulare (`ProiectCard` și `ProiectList`) și transmiterea datelor prin props.

## Key requests
### 1. Trimiterea datelor prin props și randarea listei cu map
- Asked: Cum pot structura componentele React pentru a prelua un array de obiecte din App și a randa cardurile folosind metoda .map() și atributul key?
- Got: Crearea componentei copil care primește un singur obiect prin props și a componentei părinte de listă care parcurge array-ul și atribuie un `key={id}` unic.
- Changed or rejected: Am adaptat numele props-urilor și etichetele conform specificului aplicației de fotografie motorsport StudioDNG.

### 2. Randarea condiționată pentru lista goală
- Asked: Cum implementez afișarea unui mesaj dedicat în cazul în care lista de elemente este goală?
- Got: Verificarea `proiecte.length === 0` la începutul componentei de listă pentru a returna un paragraf cu un mesaj specific.
- Changed or rejected: Am folosit abordarea de tip "early return" pentru o claritate sporită a codului.

## What I learned / what did not work
- Am înțeles cum se transmit datele în sens descendent folosind props și de ce este esențial ca fiecare element dintr-o listă să aibă un atribut `key` unic bazat pe ID.
- Am învățat să separ logica de randare a unui singur card de cea a întregii liste pentru o mai bună reutilizare a codului.
- Am verificat absența oricăror erori sau avertismente în consola browserului.