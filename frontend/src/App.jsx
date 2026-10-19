import GameList from "./components/GameList.jsx";

const jocuri = [
  { id: 1, titlu: "Elden Ring", platforma: "pc", completed: false },
  { id: 2, titlu: "Resident Evil Requiem", platforma: "xbox", completed: true },
  { id: 3, titlu: "Assetto Corsa Competizione", platforma: "pc", completed: false },
];

export default function App() {
  const deJucat = jocuri.filter((j) => !j.completed).length;

  return (
    <>
      <header className="app-header">
        <h1>GameVault</h1>
        <p>Organizează și urmărește colecția ta de jocuri video.</p>
        <p className="app-count">
          {jocuri.length} jocuri în colecție, dintre care {deJucat} de jucat
        </p>
      </header>

      <main className="container">
        <section className="panel">
          <h2>Jocurile mele</h2>
          <GameList jocuri={jocuri} />
        </section>
      </main>

      <footer className="app-footer">Proiect Tehnologii Web</footer>
    </>
  );
}