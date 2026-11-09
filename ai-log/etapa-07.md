# Jurnal AI - Etapa 7: Formular și validare

## Obiective atinse
- Extinderea `src/api.js` cu funcția comună `request` (antet JSON, verificarea `res.ok`, tratarea răspunsului 204) și cu funcțiile `fetchJocuri`, `createJoc` (POST), `updateJoc` (PATCH) și `deleteJoc` (DELETE).
- Crearea componentei `GameForm.jsx`: formular controlat cu câmpul `titlu` și lista derulantă `platforma` (PC, PlayStation, Xbox), cu `e.preventDefault()`, `noValidate` și `aria-invalid` pe câmpul greșit.
- Validări: titlul este obligatoriu și are maximum 100 de caractere (validarea suplimentară a temei); platforma trebuie să fie una dintre valorile permise.
- Butonul „Adaugă jocul” este dezactivat și afișează „Se salvează...” în timpul trimiterii; câmpurile se golesc doar după o salvare reușită.
- În `App.jsx`: `handleAdd` (fără `try`, eroarea ajunge în formular), `handleToggleCompleted` cu PATCH `{ completed }` și `handleDelete` cu DELETE; state-ul se actualizează cu obiectul întors de server.
- Lista rămâne afișată și când apare o eroare la bifare sau ștergere (condiția `!loading`), cu mesajul deasupra listei.
- Layout pe două coloane (`1fr 2fr`), stiluri pentru butonul dezactivat și pentru câmpul invalid.
- Fișierul `tw.json` în rădăcina repository-ului (`jocuri`, `titlu`, `completed`, `sample: { "platforma": "xbox" }`) și atributele `data-testid` din tabelul 7.3 pe `GameForm`, `GameCard`, `GameList` și `App`.

## Asistență AI utilizată
- Adaptarea pașilor din ghidul Etapei 7 (exemplul TaskFlow) la denumirile GameVault: `jocuri`, `completed`, `platforma`, `GameForm`, `form-platforma`.
- Reutilizarea clasei existente `.item-form` din mockup în locul clasei `task-form` din ghid, ca formularul să păstreze stilurile din Etapa 1.
- Mesaje de eroare mai explicite („Nu am putut salva / actualiza / șterge jocul: ...”).
- Verificarea cu ESLint și testarea rutelor POST, PATCH și DELETE pe o copie a `db.json`.

## Verificare manuală
- Trimiterea cu titlul gol afișează „Titlul jocului este obligatoriu.”, câmpul are bordură roșie, iar în fila Network nu apare nicio cerere.
- Un joc adăugat apare la finalul listei, cu id-ul dat de json-server, și rămâne după reîncărcarea paginii; `db.json` se modifică pe disc.
- Bifarea și ștergerea rămân după reîncărcare.
- Cu `npm run api` oprit, apare eroarea „Failed to fetch” lângă formular, iar textul scris rămâne în câmp.
- Cu `--delay 3000`, butonul afișează „Se salvează...” și nu poate fi apăsat.
- În consolă, `document.querySelectorAll('[data-testid="item"]').length` este egal cu numărul jocurilor din listă.
