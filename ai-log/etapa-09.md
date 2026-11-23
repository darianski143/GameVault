# Jurnal AI - Etapa 9: Backend propriu (Node.js și Express)

## Obiective atinse
- Proiectul `backend/` lângă `frontend/`: `package.json` cu `"type": "module"`, scripturile `start` și `dev` (`node --watch`), dependențele `express` (v5) și `cors`; `.gitignore` cu `node_modules` și `.env`; `.env.example` cu `PORT=3001` și `CORS_ORIGIN=http://localhost:5173`.
- Structura din ghid: `src/server.js` (doar pornește serverul), `src/app.js` (middleware, rute, 404, tratarea erorilor), `src/validation.js`, `src/routes/jocuri.js`.
- Rutele REST pe prefixul `/jocuri` (cheia `resource` din `tw.json`): GET listă (200), GET după id (200), POST (201), PATCH (200), DELETE (204); funcția `gasesteIndex` răspunde cu 400 pentru id invalid și cu 404 `{ "error": "Jocul nu există" }`.
- Datele inițiale în memorie sunt cele 7 jocuri din vechiul `db.json`, cu `dezvoltator` și `an`, ca pagina de detaliu să arate la fel ca în Etapa 8.
- Validarea pe server (`valideazaJoc`): `titlu` obligatoriu, maximum 100 de caractere; `platforma` din `PLATFORME` (`pc`, `playstation`, `xbox`, identice cu `constants.js`), implicit `pc`; `completed` boolean, implicit `false`; `dezvoltator` (text, maximum 100) și `an` (întreg între 1950 și 2100) opționale. Lista albă de câmpuri ignoră `id` sau alte câmpuri trimise de client; la PATCH se verifică doar câmpurile trimise.
- `app.js`: `cors()`, `express.json()`, `GET /health`, ruta de 404 `{ "error": "Ruta nu există" }` și funcția cu patru parametri pentru erori (JSON invalid → 400 cu mesaj, restul → 500 „Eroare internă”).
- Frontend: singura modificare este în `request` din `api.js`, care afișează mesajul `error` trimis de server.
- Eliminarea json-server: `frontend/db.json`, scriptul `api` și dependența `json-server` din `package.json`; `package-lock.json` actualizat cu `npm install`.
- README: secțiunea Stage 9, modul de rulare cu două terminale și statusul actualizat.

## Asistență AI utilizată
- Adaptarea ghidului (exemplul TaskFlow) la GameVault: `routes/tasks.js` → `routes/jocuri.js`, `/tasks` → `/jocuri`, `PRIORITATI` → `PLATFORME`, `gata` → `completed`, mesajul „Jocul nu există”.
- Extinderea validării cu câmpurile proprii temei (`dezvoltator`, `an`) și verificarea că obiectul primit este un obiect JSON.
- Testarea API-ului cu curl înainte de conectarea frontendului, pe cerințele S9-R2 și S9-R3.
- Actualizarea README-ului și a acestui jurnal.

## Verificare manuală
- `GET /health` → `{"status":"ok"}`, 200.
- Secvența S9-R2 cu `{"titlu":"Test S9","completed":false,"platforma":"xbox"}`: GET listă 200, POST 201 (id 8 primit de la server), GET 200, PATCH `{"completed":true}` 200, DELETE 204, GET pe același id 404.
- S9-R3: POST cu `{}`, cu `{"titlu":""}` și fără corp → 400 `{"error":"titlu este obligatoriu"}`.
- POST cu `platforma: "wii"` și `an: "2020"` → 400 cu ambele erori; PATCH cu `completed: "da"` → 400; `/jocuri/abc` → 400 „Id invalid”; `/nimic` → 404 „Ruta nu există”; JSON invalid → 400.
- Răspunsul are antetul `Access-Control-Allow-Origin: http://localhost:5173`.
- `npx eslint .` în `frontend/` trece fără erori.
