import { Link } from "react-router-dom";
import { ETICHETE_PLATFORMA } from "../constants.js";
import styles from "./GameCard.module.css";

export default function GameCard({ game, onToggle, onDelete }) {
  return (
    <li
      className={game.completed ? `${styles.card} ${styles.done}` : styles.card}
      data-testid="item"
      data-id={game.id}
    >
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={game.completed}
          onChange={() => onToggle(game.id)}
          aria-label={`Marchează ${game.titlu} ca terminat`}
          data-testid="item-toggle"
        />
        <div>
          <Link to={`/jocuri/${game.id}`} className={styles.title} data-testid="item-link">
            {game.titlu}
          </Link>
          <span className={`badge badge-${game.platforma}`}>
            {ETICHETE_PLATFORMA[game.platforma] || game.platforma}
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        <span className={styles.status}>{game.completed ? "Terminat" : "De jucat"}</span>
        <button
          className="btn-danger"
          onClick={() => onDelete(game.id)}
          aria-label={`Șterge ${game.titlu}`}
          data-testid="item-delete"
        >
          Șterge
        </button>
      </div>
    </li>
  );
}
