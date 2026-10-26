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
See the Stage 3 section: `cd frontend`, `npm install`, `npm run dev`.
The static mockup from stage 1 is in `mockup/` and opens directly in a browser.

## AI usage

| Tool | Used for |
| :--- | :--- |
| Gemini | Assistance with semantic HTML structure, CSS Grid/Flexbox layouts, and color variables |
| Claude | Stage 5: adapting the guide to GameVault (state, events, theme toggle) and documentation |

Details per stage: see the `ai-log/` folder.

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [ ] Stage 6: loading data from a mock API

## Stage 2: data logic

The [colectie.js](./colectie.js) file contains the collection data and the
functions for listing, counting, searching, adding, toggling the status, and
deleting games. The functions do not modify the input array: operations that
change the collection return a new array. Validation rejects empty titles,
titles longer than 100 characters, and platforms outside the allowed list.

The file does not use the DOM or events; demonstration results are displayed
in the browser console (F12).

### Stage 2 verification

| ID | Requirement | Where | How to check |
| :--- | :--- | :--- | :--- |
| S2-R1 | JavaScript file linked and console messages | [index.html](./index.html), [colectie.js](./colectie.js) | open the page and console (F12) |
| S2-R2 | At least 3 objects with id, title, status, and platform | [colectie.js](./colectie.js) | read the `jocuri` array |
| S2-R3 | Listing, counting, searching, adding, toggling, and deleting | [colectie.js](./colectie.js) | check the grouped console output |
| S2-R4 | Validation for an empty title and invalid platform | [colectie.js](./colectie.js) | check the last two console messages |
| S2-R5 | Original array remains unchanged after adding a game | [colectie.js](./colectie.js) | verify that the original array still contains 3 games |
| S2-R6 | README and AI log updated | [ai-log/etapa-02.md](./ai-log/etapa-02.md) | read the documentation |

## Stage 3: Vite and React project

The app now lives in `frontend/`, built with Vite. The data from stage 2 moved into the main component; the list is still printed raw.

## How to run

Navigate to the frontend folder, install dependencies, and start the development server:

`cd frontend`
`npm install`
`npm run dev`

Then open the address printed in the terminal (http://localhost:5173).

## Stage 4: components

The list is rendered from the data, through two components:
- `GameList` receives the whole array and renders one card per item
- `GameCard` receives a single item through props and displays it

### Stage 4 Verification Table

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S4-R1 | 2+ components in src/components/ | [frontend/src/components/](frontend/src/components/) | open folder |
| S4-R2 | card receives data through props | [frontend/src/components/GameCard.jsx](frontend/src/components/GameCard.jsx) | read |
| S4-R3 | map + key={id}, no console warnings | [frontend/src/components/GameList.jsx](frontend/src/components/GameList.jsx) | F12, Console |
| S4-R4 | message for empty list | [frontend/src/components/GameList.jsx](frontend/src/components/GameList.jsx) | set array to [] |
| S4-R5 | state changes the card look | [frontend/src/components/GameCard.jsx](frontend/src/components/GameCard.jsx) | toggle completed flag |
| S4-R6 | README Stage 4 section + AI log | [README.md](README.md), [ai-log/etapa-04.md](ai-log/etapa-04.md) | read |
| S4-R7 | commit "Stage 4" pushed | [commit](https://github.com/darianski143/GameVault/commit/96327b17ee2523718c705ddd0ce7841a70d634b1) | commit history |

## Stage 5: local state and events

The list lives in React state. Checking and deleting games works from the page,
and the counter in the header follows automatically. A button in the header
switches between light and dark mode. Changes are lost on refresh, which is
what stage 6 and stage 10 fix.

- `App` owns the `jocuri` state and the only functions that change it:
  `handleToggleCompleted` (`map` + `{ ...j, completed: !j.completed }`) and
  `handleDelete` (`filter`), both with the `setJocuri((prev) => ...)` form
- `GameList` only passes `onToggle` and `onDelete` down to each card
- `GameCard` has a controlled checkbox and a delete button with `aria-label`
- the "de jucat" counter is derived from the list on every render, not stored in state
- the theme is kept in state and written as `data-theme` on `<html>`; the CSS
  redefines only the color variables

### Stage 5 Verification Table

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S5-R1 | list kept in useState, in App | [App.jsx#L17](https://github.com/darianski143/GameVault/blob/f3c3b0ef70dc8f698fa76d7fa202edabd432df0b/frontend/src/App.jsx#L17) | read |
| S5-R2 | toggling changes state and card look | [App.jsx#L21-L25](https://github.com/darianski143/GameVault/blob/f3c3b0ef70dc8f698fa76d7fa202edabd432df0b/frontend/src/App.jsx#L21-L25), [GameCard.jsx#L9-L15](https://github.com/darianski143/GameVault/blob/f3c3b0ef70dc8f698fa76d7fa202edabd432df0b/frontend/src/components/GameCard.jsx#L9-L15) | click a checkbox |
| S5-R3 | delete removes the item | [App.jsx#L27-L29](https://github.com/darianski143/GameVault/blob/f3c3b0ef70dc8f698fa76d7fa202edabd432df0b/frontend/src/App.jsx#L27-L29), [GameCard.jsx#L25-L31](https://github.com/darianski143/GameVault/blob/f3c3b0ef70dc8f698fa76d7fa202edabd432df0b/frontend/src/components/GameCard.jsx#L25-L31) | click Șterge |
| S5-R4 | header counter derived, not in state | [App.jsx#L39](https://github.com/darianski143/GameVault/blob/f3c3b0ef70dc8f698fa76d7fa202edabd432df0b/frontend/src/App.jsx#L39) | toggle, watch header |
| S5-R5 | immutable updates (no push, splice, assignment) | [App.jsx#L21-L29](https://github.com/darianski143/GameVault/blob/f3c3b0ef70dc8f698fa76d7fa202edabd432df0b/frontend/src/App.jsx#L21-L29) | read |
| S5-R6 | light / dark toggle: state + data-theme on html | [App.jsx#L32-L36](https://github.com/darianski143/GameVault/blob/f3c3b0ef70dc8f698fa76d7fa202edabd432df0b/frontend/src/App.jsx#L32-L36), [App.css#L199-L234](https://github.com/darianski143/GameVault/blob/f3c3b0ef70dc8f698fa76d7fa202edabd432df0b/frontend/src/App.css#L199-L234) | click the button, both system themes |
| S5-R7 | no console warnings; README + AI log | [README.md](https://github.com/darianski143/GameVault/blob/f3c3b0ef70dc8f698fa76d7fa202edabd432df0b/README.md), [ai-log/etapa-05.md](https://github.com/darianski143/GameVault/blob/f3c3b0ef70dc8f698fa76d7fa202edabd432df0b/ai-log/etapa-05.md) | F12, Console |
| S5-R8 | commit "Stage 5" pushed | [f3c3b0e](https://github.com/darianski143/GameVault/commit/f3c3b0ef70dc8f698fa76d7fa202edabd432df0b) | commit history |

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

### Stage 3 Verification Table

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S3-R1 | npm run dev starts without errors | [frontend/package.json](https://github.com/darianski143/GameVault/blob/8b3dc61f9261db12e661bc6abe8250440f29acd0/frontend/package.json) | `npm install`, `npm run dev` |
| S3-R2 | app name and counter computed from data | [frontend/src/App.jsx#L27-L38](https://github.com/darianski143/GameVault/blob/8b3dc61f9261db12e661bc6abe8250440f29acd0/frontend/src/App.jsx#L27-L38) | edit data, save |
| S3-R3 | data from README, not from the example | [frontend/src/App.jsx#L1-L24](https://github.com/darianski143/GameVault/blob/8b3dc61f9261db12e661bc6abe8250440f29acd0/frontend/src/App.jsx#L1-L24) | compare with README |
| S3-R4 | stage 1 styles reused | [frontend/src/App.css](https://github.com/darianski143/GameVault/blob/8b3dc61f9261db12e661bc6abe8250440f29acd0/frontend/src/App.css) | look at the page |
| S3-R5 | node_modules ignored, build passes | [frontend/.gitignore](https://github.com/darianski143/GameVault/blob/8b3dc61f9261db12e661bc6abe8250440f29acd0/frontend/.gitignore) | `npm run build` |
| S3-R6 | README Stage 3 section + AI log | [ai-log/etapa-03.md](https://github.com/darianski143/GameVault/blob/8b3dc61f9261db12e661bc6abe8250440f29acd0/ai-log/etapa-03.md) | read |
| S3-R7 | commit "Stage 3" pushed | [8b3dc61](https://github.com/darianski143/GameVault/commit/8b3dc61f9261db12e661bc6abe8250440f29acd0) | commit history |