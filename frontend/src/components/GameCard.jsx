const ETICHETE_PLATFORMA = {
  pc: "PC",
  playstation: "PlayStation",
  xbox: "Xbox",
};

export default function GameCard({ game }) {
  return (
    <li className={game.completed ? "item-card done" : "item-card"}>
      <div>
        <h3>{game.titlu}</h3>
        <span className={`badge badge-${game.platforma}`}>
          {ETICHETE_PLATFORMA[game.platforma] || game.platforma}
        </span>
      </div>
      <span className="status">{game.completed ? "Terminat" : "De jucat"}</span>
    </li>
  );
}