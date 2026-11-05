# Stage 1: AI log

## Tools
- Gemini / ChatGPT
- Visual Studio Code AI features

## Conversations
- Structurarea layout-ului Grid și Flexbox pentru pagina web de motorsport: (utilizat pentru realizarea designului responsive de la desktop la mobil)

## Key requests
### 1. Header background custom image
- Asked: Cum pot înlocui fundalul simplu al antetului cu o imagine de motorsport la aspect 2:1 și un filtru întunecat pentru text?
- Got: Soluția folosind proprietățile CSS `background` cu `linear-gradient` și `url('header-bg.jpg')`, împreună cu `aspect-ratio: 2/1`.
- Changed or rejected: Am păstrat soluția direct în CSS pentru a asigura compatibilitatea și aspectul curat.

### 2. Galerie foto pe echipe
- Asked: Cum pot structura galeria de imagini pe echipe în funcție de folderele existente (ARTTU Cluj Napoca, BlueStreamLine etc.) și să pot da click pe ele?
- Got: Organizarea în secțiuni `.panel` cu grile flexibile și tag-uri `<a>` cu `target="_blank"` pentru vizualizarea imaginii individuale.
- Changed or rejected: Am adaptat căile folderelor exact după structura locală a fișierelor `.jpg`.

## What I learned / what did not work
- Am învățat cum să folosesc corect proprietățile CSS Grid și Flexbox pentru a aranja panourile și cardurile în pagină.
- Am înțeles cum se utilizează media query-urile pentru adaptarea automată a designului pe ecrane înguste sub 700px.
- Gestionarea căilor către fișiere și imagini în subfoldere necesită atenție sporită pentru a nu genera erori de tip 404 în browser.