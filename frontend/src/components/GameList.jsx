import GameCard from "./GameCard.jsx";

// Primește lista și funcțiile și le transmite fiecărui card.
export default function GameList({ jocuri, onToggle, onDelete }) {
  if (!jocuri || jocuri.length === 0) {
    return <p className="empty">Nu există niciun joc în colecție.</p>;
  }

  return (
    <ul className="item-list">
      {jocuri.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
