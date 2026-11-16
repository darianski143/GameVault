import { useState } from "react";
import { PLATFORME } from "../constants.js";
import styles from "./GameForm.module.css";

const TITLU_MAX = 100;
const PLATFORMA_IMPLICITA = "pc";

// Formular controlat: state-ul React este sursa de adevăr pentru câmpuri
export default function GameForm({ onAdd }) {
  const [titlu, setTitlu] = useState("");
  const [platforma, setPlatforma] = useState(PLATFORMA_IMPLICITA);
  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  function valideaza() {
    const t = titlu.trim();
    if (t === "") return "Titlul jocului este obligatoriu.";
    if (t.length > TITLU_MAX) return `Titlul are maximum ${TITLU_MAX} de caractere.`;
    if (!PLATFORME.some((p) => p.value === platforma)) return "Alege o platformă din listă.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault(); // oprește reîncărcarea paginii
    const mesaj = valideaza();
    if (mesaj) {
      setEroare(mesaj);
      return;
    }
    setEroare("");
    setTrimite(true);
    try {
      await onAdd({ titlu: titlu.trim(), platforma, completed: false });
      // golirea doar după o salvare reușită
      setTitlu("");
      setPlatforma(PLATFORMA_IMPLICITA);
    } catch (err) {
      setEroare(`Nu am putut salva jocul: ${err.message}`);
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
        Titlu
        <input
          type="text"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          placeholder="Ex: Hollow Knight: Silksong"
          maxLength={TITLU_MAX}
          aria-invalid={Boolean(eroare)}
          data-testid="form-title"
        />
      </label>
      <label>
        Platformă
        <select
          value={platforma}
          onChange={(e) => setPlatforma(e.target.value)}
          data-testid="form-platforma"
        >
          {PLATFORME.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </label>
      {eroare && (
        <p className="error" data-testid="form-error">
          {eroare}
        </p>
      )}
      <button type="submit" className="btn" disabled={trimite} data-testid="form-submit">
        {trimite ? "Se salvează..." : "Adaugă jocul"}
      </button>
    </form>
  );
}
