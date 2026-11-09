import { useEffect, useState } from "react";
import GameList from "./components/GameList.jsx";
import GameForm from "./components/GameForm.jsx";
import { createJoc, deleteJoc, fetchJocuri, updateJoc } from "./api.js";

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
        if (!ignore) {
          setError(`Nu am putut încărca jocurile: ${err.message}. Rulează npm run api?`);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Întâi serverul, apoi state-ul: pe ecran ajunge doar ce s-a salvat.
  // Fără try: eroarea ajunge înapoi în formular, care o afișează.
  async function handleAdd(joc) {
    const creat = await createJoc(joc); // serverul întoarce jocul cu id
    setJocuri((prev) => [...prev, creat]);
  }

  async function handleToggleCompleted(id) {
    const joc = jocuri.find((j) => j.id === id);
    try {
      const actualizat = await updateJoc(id, { completed: !joc.completed });
      setError(null);
      setJocuri((prev) => prev.map((j) => (j.id === id ? actualizat : j)));
    } catch (err) {
      setError(`Nu am putut actualiza jocul: ${err.message}`);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteJoc(id);
      setError(null);
      setJocuri((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      setError(`Nu am putut șterge jocul: ${err.message}`);
    }
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
          <h2>Adaugă un joc</h2>
          <GameForm onAdd={handleAdd} />
        </section>

        <section className="panel">
          <h2>Jocurile mele</h2>

          {loading && (
            <p className="info" data-testid="loading">
              Se încarcă colecția...
            </p>
          )}
          {error && (
            <p className="error" role="alert" data-testid="error">
              {error}
            </p>
          )}
          {!loading && (
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
