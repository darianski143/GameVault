# Jurnal AI - Etapa 8: Navigare și stilizare pe componente

## Obiective atinse
- Instalarea `react-router-dom` și înfășurarea aplicației în `BrowserRouter` (`main.jsx`); importul global de stiluri trece pe `index.css`.
- `App.jsx` conține doar harta rutelor: `/` (JocuriPage), `/jocuri/:id` (JocDetaliuPage), `/despre` (DesprePage) și `*` (NotFoundPage), toate în ruta fără `path` cu `Layout`.
- Componenta `Layout.jsx`: antet cu logo, navigație cu `NavLink` (`end` pe linkul către `/`), butonul de temă mutat aici din `App`, `<Outlet />` pentru pagină și subsol.
- `pages/JocuriPage.jsx` preia neschimbat state-ul, efectul și funcțiile din `App.jsx` de la Etapa 7; contorul a trecut din antet în panoul listei.
- Titlul din `GameCard` a devenit `Link` către `/jocuri/<id>`; `<label>` din jurul lui a fost înlocuit cu un `div`, iar căsuța a primit `aria-label`.
- `api.js` are funcția nouă `fetchJoc(id)`; pagina de detaliu citește id-ul cu `useParams`, are efectul pe `[id]` și tratează elementul inexistent (mesaj + drum înapoi).
- În `db.json` am adăugat câmpurile `dezvoltator` și `an`, afișate doar în pagina de detaliu.
- `App.css` a devenit `index.css` (doar variabile, teme și clase comune); fiecare componentă și pagină are fișierul ei `.module.css`. Butonul formularului folosește clasa globală `btn`.
- Lista de platforme și etichetele lor au trecut în `src/constants.js`.
- Atributele `data-testid` din Etapa 7 au rămas; s-au adăugat `nav`, `item-link` (în locul lui `item-title`), `detail`, `detail-title` și `not-found`.

## Asistență AI utilizată
- Adaptarea ghidului (exemplul TaskFlow) la GameVault: `/tasks/:id` → `/jocuri/:id` (cheia `resource` din `tw.json`), `TaskuriPage` → `JocuriPage`, `TaskDetaliuPage` → `JocDetaliuPage`, linkurile „Colecția” și „Despre”.
- Păstrarea culorilor GameVault și a temei luminoase / întunecate (cu `data-theme`) în `index.css`, în locul variabilelor din anexa ghidului.
- Mutarea butonului de temă în `Layout`, ca să fie disponibil pe toate paginile.
- Alegerea câmpurilor suplimentare pentru detaliu (dezvoltator, an) fără a atinge câmpul „gen”, rezervat relației din Etapa 10.
- Omiterea apelurilor `setLoading(true)` / `setError(null)` la începutul efectului, conform observației despre regula `react-hooks/set-state-in-effect`.
- Verificarea cu ESLint și a faptului că fiecare clasă `styles.x` există în modulul importat.

## Verificare manuală
- Click pe titlul unui joc deschide `/jocuri/<id>`, fără reîncărcare (în fila Network apar doar cereri fetch).
- Butonul Înapoi al browserului revine la colecție; reîncărcarea pe `/jocuri/1` afișează tot pagina de detaliu.
- `/jocuri/999` afișează „Jocul nu a putut fi încărcat: Eroare server: 404” și linkul înapoi.
- `/ceva` afișează pagina „Pagina nu există”.
- Pe `/despre`, doar linkul „Despre” este marcat ca activ.
- În consolă: `document.querySelectorAll("[data-testid=nav] a").length` întoarce 2, iar pe pagina de detaliu `document.querySelector("[data-testid=detail-title]").textContent` întoarce titlul jocului.
- Adăugarea, bifarea și ștergerea funcționează ca în Etapa 7.
