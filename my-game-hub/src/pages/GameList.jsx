import { Link } from "react-router-dom";
import "../styles/styles.css";

const games = [
  { name: "Snake", image: "https://via.placeholder.com/200", link: "/games/snake" },
  { name: "Tetris", image: "https://via.placeholder.com/200", link: "/games/tetris" },
  { name: "Flappy Bird", image: "https://via.placeholder.com/200", link: "/games/flappybird" },
];

function GameList() {
  return (
    <div className="game-list">
      {games.map((game, index) => (
        <div key={index} className="game-card">
          <img src={game.image} alt={game.name} />
          <h2>{game.name}</h2>
          <Link to={game.link} className="game-button">Play Now</Link>
        </div>
      ))}
    </div>
  );
}

export default GameList;