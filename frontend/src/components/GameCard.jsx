const ETICHETE_PLATFORMA = {
  pc: "PC",
  playstation: "PlayStation",
  xbox: "Xbox",
};

export default function GameCard({ game, onToggle, onDelete }) {
  return (
    <li
      className={game.completed ? "item-card done" : "item-card"}
      data-testid="item"
      data-id={game.id}
    >
      <label className="task-main">
        <input
          type="checkbox"
          checked={game.completed}
          onChange={() => onToggle(game.id)}
          data-testid="item-toggle"
        />
        <div>
          <h3 data-testid="item-title">{game.titlu}</h3>
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
          data-testid="item-delete"
        >
          Șterge
        </button>
      </div>
    </li>
  );
}
