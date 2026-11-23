# GameVault

A minimalist web dashboard to manage and organize your personal video game backlog and collection.
Track gaming platforms, playthrough statuses, and gaming genres in one clean interface.

## Data model

| Field | Type | Notes |
| :--- | :--- | :--- |
| title | text | required, max 100 chars (e.g., game title) |
| completed | boolean | toggled from the list, default false (De jucat / Terminat) |
| platform | fixed values | PC, PlayStation, Xbox |
| developer | text | optional, shown only on the detail page (from stage 8) |
| year | number | optional, release year, shown only on the detail page (from stage 8) |
| genre | relation | RPG, Survival Horror, Simulation/Racing (from week 10) |
| user | relation | the owner of the collection (from week 11) |

Sample data used across all stages:
1. Elden Ring, active, PC
2. Resident Evil Requiem, done, Xbox
3. Assetto Corsa Competizione, active, PC

## How to run
    cd backend && npm install && npm run dev      # terminal 1, port 3001
    cd frontend && npm install && npm run dev     # terminal 2, port 5173

The API address is read from `VITE_API_URL` (see `frontend/.env.example`); the backend
reads `PORT` and `CORS_ORIGIN` (see `backend/.env.example`), both with working defaults.
The static mockup from stage 1 is in `mockup/` and opens directly in a browser.

## AI usage

| Tool | Used for |
| :--- | :--- |
| Gemini | Assistance with semantic HTML structure, CSS Grid/Flexbox layouts, and color variables |
| Claude | Stage 5: adapting the guide to GameVault (state, events, theme toggle) and documentation |
| Claude | Stage 6: adapting the guide to GameVault (json-server, api.js, useEffect, loading/error states) and documentation |
| Claude | Stage 7: adapting the guide to GameVault (GameForm, CRUD requests, tw.json, data-testid) and documentation |
| Claude | Stage 8: adapting the guide to GameVault (React Router, Layout, detail page, CSS Modules) and documentation |
| Claude | Stage 9: adapting the guide to GameVault (Express backend, `/jocuri` routes, server validation, CORS) and documentation |

Details per stage: see the `ai-log/` folder.

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [x] Stage 6: data from a mock API
- [x] Stage 7: form and validation
- [x] Stage 8: routing and detail page
- [x] Stage 9: own backend with Express
- [ ] Stage 10: MariaDB and full CRUD

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

## Stage 6: data from a mock API

The list is served by json-server from `frontend/db.json` (key `jocuri`, route `/jocuri`).
The app fetches it on load and shows a loading state and an error state.

    cd frontend
    npm run api    # terminal 1, http://localhost:3001/jocuri
    npm run dev    # terminal 2, http://localhost:5173

- `db.json` holds 6 games, mixed platforms (PC, PlayStation, Xbox) and statuses
- `src/api.js` is the only file that calls `fetch`; `fetchJocuri` checks `res.ok`
  and throws `Eroare server: <status>` otherwise
- the API address comes from `VITE_API_URL` (documented in `.env.example`),
  with `http://localhost:3001` as the fallback
- `App` starts with `useState([])` and loads the list in a `useEffect(..., [])`,
  with `loading` / `error` states and an `ignore` cleanup flag
- three states on screen: "Se încarcă colecția...", the list, or an error box
  that also says what to do (`npm run api`)
- toggling and deleting are still local and are lost on refresh; stage 7 saves them on the server

To see the loading state, start the API with a delay:
`npx json-server --watch db.json --port 3001 --delay 4000`.

## Stage 7: form and validation

Games can be added from the page. The form is controlled and validated,
and every change (add, toggle, delete) goes to the API before it shows up
in the list, so everything survives a page refresh.

- `src/api.js` has one shared `request` function (JSON header, `res.ok` check,
  204 handling) and `fetchJocuri`, `createJoc` (POST), `updateJoc` (PATCH),
  `deleteJoc` (DELETE) on top of it; it is still the only file with `fetch`
- `GameForm` is a controlled form (title + platform select): `value` + `onChange`
  on every field, `noValidate`, errors shown next to the form, never with `alert`
- validation: the title is required and has at most 100 characters; the platform
  must be one of PC / PlayStation / Xbox
- the button is disabled and shows "Se salvează..." while sending; the form is
  cleared only after a successful save, so the text is kept if the API is down
- `App` updates the list with the object returned by the server (the id comes
  from json-server), never with what was sent
- `tw.json` (repo root) and the `data-testid` attributes mark the form, the cards
  and the messages for the automatic check
- the layout is back to two columns (form left, list right), one column under 700px

To see the disabled button, start the API with a delay:
`npx json-server --watch db.json --port 3001 --delay 3000`.

## Stage 8: routing and detail page

Three pages behind React Router: the collection, a detail page at `/jocuri/:id`,
and an about page, plus a 404 page. Component styles moved to CSS Modules.

- `main.jsx` wraps the app in `BrowserRouter`; `App.jsx` now holds only the route map
  (`/`, `/jocuri/:id`, `/despre`, `*`), all nested in a `Layout` route
- `Layout` is the shared header (logo, `NavLink`s „Colecția” / „Despre”, theme toggle),
  the `<Outlet />` for the current page and the footer; `NavLink` marks the active page,
  with `end` on the `/` link
- `pages/JocuriPage.jsx` holds everything `App.jsx` had in stage 7 (state, effect,
  add / toggle / delete); the counter moved from the header into the list panel
- the title in `GameCard` is a `Link` to `/jocuri/<id>` (`data-testid="item-link"`),
  the checkbox and the delete button still work from the card
- `pages/JocDetaliuPage.jsx` reads the id with `useParams`, loads exactly that game with
  `fetchJoc(id)` (effect on `[id]`) and shows fields that do not fit on the card:
  developer and release year (added to `db.json`); `/jocuri/999` shows an error and a way back
- `pages/NotFoundPage.jsx` catches any unknown address (`data-testid="not-found"`)
- `App.css` became `index.css`, with only the color variables, the themes and shared
  classes (`.panel`, `.btn`, `.btn-danger`, `.error`, `.info`, `.empty`, badges);
  every component and page has its own `.module.css`
- the platform list and labels live in `src/constants.js`, shared by the form, the card
  and the detail page

    cd frontend
    npm install
    npm run api    # terminal 1
    npm run dev    # terminal 2, then open http://localhost:5173/jocuri/1

## Stage 9: own backend

json-server is gone. The API is an Express server in `backend/`, with REST
routes, server side validation and CORS. Data is still kept in memory and
resets on restart.

- `backend/src/server.js` only starts the server (`PORT`, default 3001); `app.js` builds the
  app: `cors()` (origin from `CORS_ORIGIN`, default `http://localhost:5173`), `express.json()`,
  `GET /health`, the `/jocuri` router, a JSON 404 for unknown routes and a central error handler
- `backend/src/routes/jocuri.js`: `GET /jocuri`, `GET /jocuri/:id`, `POST /jocuri` (201),
  `PATCH /jocuri/:id`, `DELETE /jocuri/:id` (204); `gasesteIndex` answers 400 for a bad id and
  404 `{ "error": "Jocul nu există" }` for a missing game; the 7 games from the old `db.json`
  are the starting data
- `backend/src/validation.js` (`valideazaJoc`, `parseId`): `titlu` required, max 100 chars;
  `platforma` one of `pc` / `playstation` / `xbox` (same values as `frontend/src/constants.js`,
  default `pc`); `completed` boolean (default `false`); optional `dezvoltator` (text, max 100)
  and `an` (integer 1950–2100). Only these fields are kept, so `id` sent by a client is ignored.
  PATCH checks only the fields that were sent. Every error is `{ "error": "..." }` with status 400
- frontend: the only change is in `request` from `src/api.js`, which now shows the server's
  `error` message (e.g. `/jocuri/999` shows „Jocul nu există” instead of „Eroare server: 404”)
- removed: `frontend/db.json`, the `api` script and the `json-server` dev dependency
  (`package-lock.json` updated with `npm install`)

Testing without the interface (second terminal, backend running):

    curl -s -w ' -> %{http_code}\n' http://localhost:3001/jocuri
    curl -s -w ' -> %{http_code}\n' -X POST http://localhost:3001/jocuri \
      -H "Content-Type: application/json" -d '{"titlu":"Din curl","platforma":"xbox"}'
    curl -s -w ' -> %{http_code}\n' -X POST http://localhost:3001/jocuri \
      -H "Content-Type: application/json" -d '{"titlu":""}'
    curl -s -w ' -> %{http_code}\n' http://localhost:3001/jocuri/999
    curl -s -w ' -> %{http_code}\n' -X DELETE http://localhost:3001/jocuri/8

Expected codes: 200, 201, 400, 404, 204. Opening the app at `http://127.0.0.1:5173`
instead of `localhost` shows a CORS error in the console: a different origin than the allowed one.

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