const jocuri = [
    { id: 1, title: "Elden Ring", completed: false, platform: "pc" },
    { id: 2, title: "Resident Evil Requiem", completed: true, platform: "xbox" },
    { id: 3, title: "Assetto Corsa Competizione", completed: false, platform: "pc" }
];

export default function App() {
  const deJucat = jocuri.filter((j) => !j.terminat).length;

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
          {/* Temporar: date brute; componentele apar in Etapa 4 */}
          <pre>{JSON.stringify(jocuri, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}