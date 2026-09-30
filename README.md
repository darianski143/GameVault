# GameVault

A minimalist web dashboard to manage and organize your personal video game backlog and collection.
Track gaming platforms, playthrough statuses, and gaming genres in one clean interface.

## Data model

| Field | Type | Notes |
| :--- | :--- | :--- |
| title | text | required, max 100 chars (e.g., game title) |
| completed | boolean | toggled from the list, default false (De jucat / Terminat) |
| platform | fixed values | PC, PlayStation, Xbox |
| genre | relation | RPG, Survival Horror, Simulation/Racing (from week 10) |
| user | relation | the owner of the collection (from week 11) |

Sample data used across all stages:
1. Elden Ring, active, PC
2. Resident Evil Requiem, done, Xbox
3. Assetto Corsa Competizione, active, PC

## How to run
Open `index.html` in a browser. No build step, no server.

## AI usage

| Tool | Used for |
| :--- | :--- |
| Gemini | Assistance with semantic HTML structure, CSS Grid/Flexbox layouts, and color variables |

Details per stage: see the `ai-log/` folder.

## Status
- [x] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript