import { useEffect, useRef, useState } from "react";
import {
  SNAKE_SIZE,
  CANVAS_SIZE,
  SPEED,
  directions,
  checkCollision,
  generateFood,
} from "./snakeLogic";
import "./snakeStyles.css";

function SnakeGame() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState(generateFood());
  const [direction, setDirection] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);

  // Kreslenie hry
  useEffect(() => {
    const context = canvasRef.current.getContext("2d");

    context.fillStyle = "black";
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Kreslenie hada
    context.fillStyle = "lime";
    snake.forEach((segment) => {
      context.fillRect(segment.x * SNAKE_SIZE, segment.y * SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
    });

    // Kreslenie jedla
    context.fillStyle = "red";
    context.fillRect(food.x * SNAKE_SIZE, food.y * SNAKE_SIZE, SNAKE_SIZE, SNAKE_SIZE);
  }, [snake, food]);

  // Pohyb hada
  useEffect(() => {
    if (!isRunning || !direction) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

        if (checkCollision(head, prevSnake)) {
          setIsRunning(false);
          alert(`Game Over! Your score: ${score}`);
          return prevSnake;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => prev + 1);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, SPEED);
    return () => clearInterval(interval);
  }, [direction, isRunning, food, score]);

  // Prvý pohyb hráča
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (directions[event.key] && !isRunning) {
        setIsRunning(true);
        setDirection(directions[event.key]);
      } else if (directions[event.key]) {
        setDirection(directions[event.key]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning]);

  // Reset hry
  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection(null);
    setIsRunning(false);
    setScore(0);
  };

  return (
    <div className="game-container">
      <h1>Snake Game 🐍</h1>
      <p>Score: {score}</p>
      <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} className="game-canvas"></canvas>
      {!isRunning && (
        <button onClick={restartGame} className="restart-button">
          Restart Game
        </button>
      )}
    </div>
  );
}

export default SnakeGame;