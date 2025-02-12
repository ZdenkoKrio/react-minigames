import { useEffect, useRef, useState } from "react";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  BIRD_SIZE,
  GRAVITY,
  JUMP_FORCE,
  PIPE_WIDTH,
  PIPE_SPEED,
  createPipes,
  checkCollision,
} from "./flappyLogic";
import "./flappyStyles.css";

function FlappyBird() {
  const canvasRef = useRef(null);
  const [birdY, setBirdY] = useState(CANVAS_HEIGHT / 2);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState([createPipes()]);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");

    const drawGame = () => {
      context.fillStyle = "#87CEEB";
      context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // bird
      context.fillStyle = "yellow";
      context.fillRect(50, birdY, BIRD_SIZE, BIRD_SIZE);

      // obstacles
      context.fillStyle = "green";
      pipes.forEach((pipe) => {
        context.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        context.fillRect(pipe.x, CANVAS_HEIGHT - pipe.bottomHeight, PIPE_WIDTH, pipe.bottomHeight);
      });

      // Score
      context.fillStyle = "white";
      context.font = "24px Arial";
      context.fillText(`Score: ${score}`, 20, 40);
    };

    drawGame();
  }, [birdY, pipes, score]);

  useEffect(() => {
    if (!isRunning) return;

    const gameLoop = setInterval(() => {
      setBirdY((prevY) => prevY + velocity);
      setVelocity((prevVel) => prevVel + GRAVITY);

      setPipes((prevPipes) => {
        const newPipes = prevPipes.map((pipe) => ({ ...pipe, x: pipe.x - PIPE_SPEED })).filter((pipe) => pipe.x > -PIPE_WIDTH);

        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < CANVAS_WIDTH - 200) {
          newPipes.push(createPipes());
        }

        return newPipes;
      });

      if (checkCollision(birdY, pipes) || birdY > CANVAS_HEIGHT) {
        setIsRunning(false);
        alert(`Game Over! Score: ${score}`);
      }

      setScore((prev) => prev + 1);
    }, 30);

    return () => clearInterval(gameLoop);
  }, [isRunning, birdY, pipes, score]);

  const handleJump = () => {
    if (!isRunning) setIsRunning(true);
    setVelocity(JUMP_FORCE);
  };

  const restartGame = () => {
    setBirdY(CANVAS_HEIGHT / 2);
    setVelocity(0);
    setPipes([createPipes()]);
    setScore(0);
    setIsRunning(false);
  };

  return (
    <div className="game-container">
      <h1>Flappy Bird 🐦</h1>
      <p>Score: {score}</p>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="game-canvas"></canvas>
      <button onClick={handleJump} className="jump-button">Jump</button>
      {!isRunning && <button onClick={restartGame} className="restart-button">Restart</button>}
    </div>
  );
}

export default FlappyBird;