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

## Verification checklist

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S1-R1 | README: description, fields, sample data, how to run | [README.md#data-model](https://github.com/darianski143/GameVault/blob/58ba2c5f25dfad048db80cd1d35f75010808cc51/README.md#data-model) | read |
| S1-R2 | AI usage section | [README.md#ai-usage](https://github.com/darianski143/GameVault/blob/58ba2c5f25dfad048db80cd1d35f75010808cc51/README.md#ai-usage) | read |
| S1-R3 | AI log for stage 1 | [ai-log/etapa-01.md](https://github.com/darianski143/GameVault/blob/58ba2c5f25dfad048db80cd1d35f75010808cc51/ai-log/etapa-01.md) | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [index.html#L11-L68](https://github.com/darianski143/GameVault/blob/58ba2c5f25dfad048db80cd1d35f75010808cc51/index.html#L9-L67) | open the page |
| S1-R5 | finished card looks different | [style.css#L161-L164](https://github.com/darianski143/GameVault/blob/58ba2c5f25dfad048db80cd1d35f75010808cc51/style.css#L168-L171) | look at the card (.done) |
| S1-R6 | 2 columns on desktop, 1 under 700px | [style.css#L180-L184](https://github.com/darianski143/GameVault/blob/58ba2c5f25dfad048db80cd1d35f75010808cc51/style.css#L192-L196) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [style.css#L174-L203](https://github.com/darianski143/GameVault/blob/58ba2c5f25dfad048db80cd1d35f75010808cc51/style.css#L187-L213) | Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed | [Commit Link](https://github.com/darianski143/GameVault/commit/58ba2c5f25dfad048db80cd1d35f75010808cc51) | commit history |