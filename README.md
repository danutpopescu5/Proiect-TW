# StudioDNG
O aplicație web pentru gestionarea și organizarea ședințelor foto și a proiectelor media din motorsport (drift și Formula Student).

## Data model
| Field | Type | Notes |
| :--- | :--- | :--- |
| <name> | text | required, max 100 chars |
| <done flag> | boolean | toggled from the list, default false |
| <fixed tag> | fixed values | Portraits, Motorsport, Street Photography |
| <category> | relation | Evenimente, Competiții, Garaj |
| <user> | relation | the owner of the item (from week 11) |

Sample data used across all stages:
1. Formula Student Testing - UNSTPB, active, Formula Student
2. 
3. 

## AI usage
| Tool | Used for |
| :--- | :--- |
| Gemini / ChatGPT | Structurarea codului HTML/CSS și configurarea layout-ului |

Details per stage:
- see the ai-log/ folder.

## How to run
Open index.html in a browser. No build step, no server.

## Status
[x] Stage 1: static mockup
- Stage 2: data logic in JavaScript
- Stage 3: React project initialization
- Stage 4: Components built from data