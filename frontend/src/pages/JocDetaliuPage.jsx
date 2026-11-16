import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchJoc } from "../api.js";
import { ETICHETE_PLATFORMA } from "../constants.js";
import styles from "./JocDetaliuPage.module.css";

export default function JocDetaliuPage() {
  const { id } = useParams(); // text din URL, de exemplu "3"
  const [joc, setJoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Se reîncarcă dacă se schimbă id-ul din adresă
  useEffect(() => {
    let ignore = false;

    fetchJoc(id)
      .then((data) => {
        if (!ignore) {
          setJoc(data);
          setError(null); // o eroare de la un id anterior nu mai este valabilă
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se încarcă jocul...
      </p>
    );
  }

  if (error) {
    return (
      <section className="panel">
        <p className="error" role="alert" data-testid="error">
          Jocul nu a putut fi încărcat: {error}
        </p>
        <Link to="/">Înapoi la colecție</Link>
      </section>
    );
  }

  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>
        Înapoi la colecție
      </Link>
      <h2 className={joc.completed ? styles.done : undefined} data-testid="detail-title">
        {joc.titlu}
      </h2>
      <dl className={styles.fields}>
        <dt>Platformă</dt>
        <dd>
          <span className={`badge badge-${joc.platforma}`}>
            {ETICHETE_PLATFORMA[joc.platforma] || joc.platforma}
          </span>
        </dd>
        <dt>Status</dt>
        <dd>{joc.completed ? "Terminat" : "De jucat"}</dd>
        <dt>Dezvoltator</dt>
        <dd>{joc.dezvoltator || "—"}</dd>
        <dt>An apariție</dt>
        <dd>{joc.an || "—"}</dd>
        <dt>ID</dt>
        <dd>{joc.id}</dd>
      </dl>
    </section>
  );
}
