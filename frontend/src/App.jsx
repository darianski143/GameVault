import { useEffect, useState } from "react";
import GameList from "./components/GameList.jsx";
import { fetchJocuri } from "./api.js";

// Tema de pornire: cea a sistemului de operare
function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  // Datele vin de la server (db.json prin json-server), deci lista pornește goală
  const [jocuri, setJocuri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tema, setTema] = useState(temaInitiala);

  // Rulează o singură dată, după prima randare
  useEffect(() => {
    let ignore = false; // nu se setează state dacă componenta a dispărut între timp

    async function load() {
      try {
        const data = await fetchJocuri();
        if (!ignore) setJocuri(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // În Etapa 6 modificările rămân locale: se pierd la refresh (rezolvat în Etapa 7)
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

          {loading && <p className="info">Se încarcă colecția...</p>}
          {error && (
            <p className="error" role="alert">
              Nu am putut încărca jocurile: {error}. Rulează <code>npm run api</code>?
            </p>
          )}
          {!loading && !error && (
            <GameList
              jocuri={jocuri}
              onToggle={handleToggleCompleted}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>

      <footer className="app-footer">Proiect Tehnologii Web</footer>
    </>
  );
}
