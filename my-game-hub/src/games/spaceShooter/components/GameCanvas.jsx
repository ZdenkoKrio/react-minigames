import { useEffect } from "react";

const GameCanvas = ({ canvasRef, playerX, bullets, enemyBullets, enemies, score, lives }) => {
  useEffect(() => {
    const context = canvasRef.current.getContext("2d");

    context.fillStyle = "black";
    context.fillRect(0, 0, 400, 600);

    context.fillStyle = "white";
    context.fillRect(playerX, 560, 40, 40);

    context.fillStyle = "yellow";
    bullets.forEach((bullet) => context.fillRect(bullet.x, bullet.y, 5, 10));

    context.fillStyle = "red";
    enemyBullets.forEach((bullet) => context.fillRect(bullet.x, bullet.y, 5, 10));

    context.fillStyle = "red";
    enemies.forEach((enemy) => context.fillRect(enemy.x, enemy.y, 40, 40));

    context.fillStyle = "white";
    context.font = "24px Arial";
    context.fillText(`Score: ${score}`, 20, 40);
    context.fillText(`Lives: ${lives}`, 300, 40);
  }, [playerX, bullets, enemyBullets, enemies, score, lives]);

  return <canvas ref={canvasRef} width={400} height={600} className="game-canvas"></canvas>;
};

export default GameCanvas;