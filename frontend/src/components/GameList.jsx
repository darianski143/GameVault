import GameCard from "./GameCard.jsx";

export default function GameList({ jocuri }) {
  if (!jocuri || jocuri.length === 0) {
    return <p className="empty">Nu există niciun joc în colecție.</p>;
  }

  return (
    <ul className="item-list">
      {jocuri.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </ul>
  );
}