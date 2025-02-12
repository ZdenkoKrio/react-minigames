import "../styles/styles.css";

const games = [
  { name: "Snake", image: "https://via.placeholder.com/200", link: "#" },
  { name: "Tetris", image: "https://via.placeholder.com/200", link: "#" },
  { name: "Flappy Bird", image: "https://via.placeholder.com/200", link: "#" },
];

function GameList() {
  return (
    <div className="game-list">
      {games.map((game, index) => (
        <div key={index} className="game-card">
          <img src={game.image} alt={game.name} />
          <h2>{game.name}</h2>
          <a href={game.link} className="game-button">Play Now</a>
        </div>
      ))}
    </div>
  );
}

export default GameList;