import { useEffect, useRef, useState } from "react";
import {
  ROWS,
  COLS,
  BLOCK_SIZE,
  getRandomTetromino,
  checkCollision,
  clearFullRows,
  rotateTetromino,
} from "./tetrisLogic";
import "./tetrisStyles.css";

function Tetris() {
  const canvasRef = useRef(null);
  const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
  const [tetromino, setTetromino] = useState(getRandomTetromino());
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const gameLoop = setInterval(() => {
      setTetromino(prevTetromino => {
        const newTetromino = { ...prevTetromino, y: prevTetromino.y + 1 };

        if (checkCollision(board, newTetromino, 0, 0)) {
          setBoard(prevBoard => {
            if (!Array.isArray(prevBoard)) return prevBoard; 

            const newBoard = prevBoard.map(row => [...row]);
            prevTetromino.shape.forEach((row, y) => row.forEach((cell, x) => {
              if (cell) newBoard[prevTetromino.y + y][prevTetromino.x + x] = 1;
            }));

            return clearFullRows(newBoard);
          });

          setScore(score + 10);
          return getRandomTetromino();
        }

        return newTetromino;
      });
    }, 500);

    return () => clearInterval(gameLoop);
  }, [isRunning, board, score]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault(); 
      }

      setTetromino(prevTetromino => {
        let newTetromino = { ...prevTetromino };

        if (event.key === "ArrowLeft" && !checkCollision(board, newTetromino, -1, 0)) {
          newTetromino.x -= 1;
        } else if (event.key === "ArrowRight" && !checkCollision(board, newTetromino, 1, 0)) {
          newTetromino.x += 1;
        } else if (event.key === "ArrowDown" && !checkCollision(board, newTetromino, 0, 1)) {
          newTetromino.y += 1;
        } else if (event.key === "ArrowUp") {
          newTetromino = rotateTetromino(newTetromino);
        }

        return newTetromino;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board]);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);

    board.forEach((row, y) => row.forEach((cell, x) => {
      if (cell) {
        context.fillStyle = "blue";
        context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }));

    tetromino.shape.forEach((row, y) => row.forEach((cell, x) => {
      if (cell) {
        context.fillStyle = "red";
        context.fillRect((tetromino.x + x) * BLOCK_SIZE, (tetromino.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }));
  }, [board, tetromino]);

  return (
    <div className="game-container">
      <h1>Tetris 🎮</h1>
      <p>Score: {score}</p>
      <canvas ref={canvasRef} width={COLS * BLOCK_SIZE} height={ROWS * BLOCK_SIZE} className="game-canvas"></canvas>
      <button onClick={() => setIsRunning(true)} className="start-button">Start</button>
    </div>
  );
}

export default Tetris;