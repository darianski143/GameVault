# Jurnal AI - Etapa 5: State local și evenimente

## Obiective atinse
- Mutarea listei de jocuri în state-ul componentei `App`: array-ul a fost redenumit `JOCURI_INITIALE` și este folosit doar ca valoare de pornire pentru `useState`.
- Implementarea funcțiilor imutabile `handleToggleCompleted` (`map` + obiect nou cu `completed` inversat) și `handleDelete` (`filter`), ambele cu forma cu funcție `setJocuri((prev) => ...)`.
- Transmiterea funcțiilor prin props pe lanțul `App` → `GameList` → `GameCard` (`onToggle`, `onDelete`).
- Adăugarea în `GameCard` a unui checkbox controlat (`checked` + `onChange`) încadrat într-un `<label className="task-main">` și a unui buton de ștergere accesibil, cu `aria-label` care include titlul jocului.
- Păstrarea contorului „de jucat” din antet ca valoare derivată, recalculată la fiecare randare.
- Implementarea comutării temei: state-ul `tema` (inițializat cu `temaInitiala`, după tema sistemului), funcția `handleTema` care scrie `data-theme` pe `<html>` și butonul `.theme-toggle` din antet, cu `aria-pressed`.
- Modificarea CSS-ului: blocul `@media (prefers-color-scheme: dark)` folosește acum `:root:not([data-theme="light"])`, iar regula `:root[data-theme="dark"]` repetă valorile întunecate, astfel încât butonul funcționează în ambele sensuri, indiferent de tema sistemului.
- Adăugarea variabilei `--danger` (în ambele teme) pentru butonul de ștergere, în locul culorilor scrise direct.

## Asistență AI utilizată
- Adaptarea pașilor din ghidul Etapei 5 (exemplul TaskFlow) la denumirile GameVault: `jocuri`, `completed`, `handleToggleCompleted`, `GameList`, `GameCard`.
- Rescrierea blocului de temă întunecată din `App.css` pentru a respecta alegerea explicită din buton.
- Verificarea codului cu ESLint și generarea secțiunii din README și a tabelului de verificare.

## Verificare manuală
- Bifarea unui joc taie titlul și scade contorul „de jucat”.
- Ștergerea tuturor jocurilor afișează mesajul pentru lista goală și contorul 0.
- Butonul de temă comută luminos ↔ întunecat, cu sistemul setat atât pe luminos, cât și pe întunecat.
- Consola nu conține avertismente.
