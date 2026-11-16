import { Link } from "react-router-dom";

// Prinde orice adresă care nu se potrivește cu rutele din App.jsx
export default function NotFoundPage() {
  return (
    <section className="panel" data-testid="not-found">
      <h2>Pagina nu există</h2>
      <p className="info">Adresa cerută nu duce nicăieri.</p>
      <Link to="/">Înapoi la colecție</Link>
    </section>
  );
}
