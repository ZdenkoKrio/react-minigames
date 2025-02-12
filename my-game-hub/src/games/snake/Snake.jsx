import { useState, useEffect } from "react";

function SnakeGame() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log("Game started!");
    // Tu pridáš logiku hry...
  }, []);

  return (
    <div>
      <h2>Snake Game</h2>
      <p>Score: {score}</p>
      <canvas id="snakeCanvas"></canvas>
    </div>
  );
}

export default SnakeGame;