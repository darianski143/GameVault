# Jurnal AI - Etapa 6: Date de la un API (useEffect)

## Obiective atinse
- Mutarea datelor din `App.jsx` în `frontend/db.json`, sub cheia `jocuri`, cu 6 jocuri variate ca platformă (PC, PlayStation, Xbox) și stare (de jucat / terminat).
- Adăugarea scriptului `"api": "json-server --watch db.json --port 3001"` în `package.json` și instalarea `json-server@0.17.4` (versiune fixată, nu 1.x).
- Crearea fișierului `src/api.js`, singurul loc din aplicație cu `fetch`: funcția `fetchJocuri` cere `/jocuri`, verifică `res.ok` și aruncă `Eroare server: <status>` altfel.
- Citirea adresei API-ului din `import.meta.env.VITE_API_URL`, cu `http://localhost:3001` ca valoare implicită, documentată în `.env.example`.
- Încărcarea datelor în `App` cu `useEffect(..., [])`: state inițial `[]`, state-urile `loading` și `error`, blocul `try / catch / finally` și curățarea efectului cu variabila `ignore`.
- Afișarea celor trei stări: „Se încarcă colecția...”, lista de jocuri sau un mesaj de eroare care spune și ce trebuie făcut (`npm run api`), cu `role="alert"`.
- Adăugarea stilurilor `.info` și `.error` în `App.css` și a variabilelor `--error-bg` / `--error-border` în tema luminoasă, în blocul `prefers-color-scheme: dark` și în `[data-theme="dark"]`; culoarea textului folosește variabila existentă `--danger`.

## Asistență AI utilizată
- Adaptarea pașilor din ghidul Etapei 6 (exemplul TaskFlow) la denumirile GameVault: `jocuri`, `/jocuri`, `fetchJocuri`, „Se încarcă colecția...”.
- Adăugarea variabilelor de eroare în toate cele trei blocuri de temă, ca butonul de temă din Etapa 5 să funcționeze și pentru mesajul de eroare.
- Testarea celor trei stări într-un browser automatizat și generarea secțiunii din README.

## Verificare manuală
- `http://localhost:3001/jocuri` afișează JSON-ul cu cele 6 jocuri.
- Cu API-ul pornit, lista apare, iar antetul arată „6 jocuri în colecție, dintre care 3 de jucat”.
- Cu `npm run api` oprit, apare mesajul de eroare, nu o pagină goală; în fila Network cererile sunt roșii.
- Cu `--delay 4000`, mesajul „Se încarcă colecția...” rămâne vizibil aproximativ 4 secunde.
- În fila Network apar două cereri către `/jocuri` (dubla montare din modul de dezvoltare), iar consola nu conține avertismente.
