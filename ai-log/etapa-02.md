# Stage 2: jurnal AI

## Scop

Am folosit asistența AI pentru a transforma datele statice ale colecției într-o
structură JavaScript și pentru a verifica cerințele etapei fără să schimb
interfața din Etapa 1.

## Decizii implementate

- Datele sunt obiecte cu `id`, `title`, `completed` și `platform`.
- Funcțiile `map`, `filter`, `find` și `reduce` sunt folosite pentru operațiile
  cerute.
- Operațiile care schimbă colecția returnează copii noi folosind spread și
  `map`/`filter`; array-ul inițial nu este modificat.
- Validarea permite doar platformele `pc`, `playstation` și `xbox` și respinge
  titlurile goale sau mai lungi de 100 de caractere.
- Fișierul rămâne independent de DOM și afișează rezultatele numai prin
  `console.log`, conform cerinței Etapei 2.

## Verificare

Am verificat manual în consola browserului operațiile de citire, adăugare,
comutare, ștergere și cele două cazuri de validare. Încărcarea paginii rămâne
vizual neschimbată față de Etapa 1.
