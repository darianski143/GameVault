import { useState } from "react";
import GameList from "./components/GameList.jsx";

// Datele temei, aceleași ca în README (doar valoarea inițială)
const JOCURI_INITIALE = [
  { id: 1, titlu: "Elden Ring", platforma: "pc", completed: false },
  { id: 2, titlu: "Resident Evil Requiem", platforma: "xbox", completed: true },
  { id: 3, titlu: "Assetto Corsa Competizione", platforma: "pc", completed: false },
];

// Tema de pornire: cea a sistemului de operare
function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [jocuri, setJocuri] = useState(JOCURI_INITIALE);
  const [tema, setTema] = useState(temaInitiala);

  // Actualizare imutabilă: listă nouă, obiect nou pentru jocul schimbat
  function handleToggleCompleted(id) {
    setJocuri((prev) =>
      prev.map((j) => (j.id === id ? { ...j, completed: !j.completed } : j))
    );
  }

  function handleDelete(id) {
    setJocuri((prev) => prev.filter((j) => j.id !== id));
  }

  // Comutarea temei: state-ul pentru buton, atributul data-theme pentru CSS
  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  // Valoare derivată: se recalculează la fiecare randare
  const deJucat = jocuri.filter((j) => !j.completed).length;

  return (
    <>
      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={handleTema}
          aria-pressed={tema === "dark"}
        >
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
        <h1>GameVault</h1>
        <p>Organizează și urmărește colecția ta de jocuri video.</p>
        <p className="app-count">
          {jocuri.length} jocuri în colecție, dintre care {deJucat} de jucat
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Jocurile mele</h2>
          <GameList
            jocuri={jocuri}
            onToggle={handleToggleCompleted}
            onDelete={handleDelete}
          />
        </section>
      </main>

      <footer className="app-footer">Proiect Tehnologii Web</footer>
    </>
  );
}
