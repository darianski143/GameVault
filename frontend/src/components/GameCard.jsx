const ETICHETE_PLATFORMA = {
  pc: "PC",
  playstation: "PlayStation",
  xbox: "Xbox",
};

export default function GameCard({ game, onToggle, onDelete }) {
  return (
    <li className={game.completed ? "item-card done" : "item-card"}>
      <label className="task-main">
        <input
          type="checkbox"
          checked={game.completed}
          onChange={() => onToggle(game.id)}
        />
        <div>
          <h3>{game.titlu}</h3>
          <span className={`badge badge-${game.platforma}`}>
            {ETICHETE_PLATFORMA[game.platforma] || game.platforma}
          </span>
        </div>
      </label>
      <div className="card-actions">
        <span className="status">{game.completed ? "Terminat" : "De jucat"}</span>
        <button
          className="btn-danger"
          onClick={() => onDelete(game.id)}
          aria-label={`Șterge ${game.titlu}`}
        >
          Șterge
        </button>
      </div>
    </li>
  );
}
