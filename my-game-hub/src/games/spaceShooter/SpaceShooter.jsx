import { useEffect, useRef, useState } from "react";
import {
  PLAYER_LIVES,
  createBullet,
  checkCollision,
} from "./spaceLogic";
import GameCanvas from "./components/GameCanvas";
import usePlayerControls from "./components/usePlayerControls";
import useShooting from "./components/useShooting";
import useEnemyWaves from "./components/useEnemyWaves";
import "./spaceStyles.css";

function SpaceShooter() {
  const canvasRef = useRef(null);
  const [playerX, setPlayerX] = useState(180);
  const [bullets, setBullets] = useState([]);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [weaponLevel, setWeaponLevel] = useState(1);
  const [lives, setLives] = useState(PLAYER_LIVES);

  usePlayerControls(playerX, setPlayerX);
  useShooting(playerX, weaponLevel, setBullets);
  useEnemyWaves(score, setEnemies);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setBullets((prevBullets) =>
        prevBullets
          .map((bullet) => ({ ...bullet, y: bullet.y - 5 }))
          .filter((bullet) => bullet.y > 0)
      );

      setEnemyBullets((prevBullets) =>
        prevBullets
          .map((bullet) => ({ ...bullet, y: bullet.y + 3 }))
          .filter((bullet) => bullet.y < 600)
      );

      setEnemies((prevEnemies) =>
        prevEnemies.map((enemy) => ({ ...enemy, y: enemy.y + 1.5 })).filter((enemy) => enemy.y < 600)
      );

      setBullets((prevBullets) =>
        prevBullets.filter((bullet) => {
          let hit = false;
          setEnemies((prevEnemies) =>
            prevEnemies.filter((enemy) => {
              if (checkCollision(bullet, enemy)) {
                hit = true;
                setScore((prev) => prev + 10);
                return false;
              }
              return true;
            })
          );
          return !hit;
        })
      );

      setEnemyBullets((prevBullets) =>
        prevBullets.filter((bullet) => {
          if (checkCollision(bullet, { x: playerX, y: 560 })) {
            setLives((prev) => Math.max(0, prev - 1)); 
            return false;
          }
          return true;
        })
      );

    }, 30);

    return () => clearInterval(gameLoop);
  }, [score, playerX, lives]);

  const upgradeWeapon = () => {
    if (score >= 50) { 
      setScore((prev) => prev - 50);
      setWeaponLevel((prev) => prev + 1);
    }
  };

  return (
    <div className="game-container">
      <h1>Space Shooter 🚀</h1>
      <GameCanvas
        canvasRef={canvasRef}
        playerX={playerX}
        bullets={bullets}
        enemyBullets={enemyBullets}
        enemies={enemies}
        score={score}
        lives={lives}
      />
      <button onClick={upgradeWeapon} className="upgrade-button">
        Upgrade Weapon (Cost: 50)
      </button>
    </div>
  );
}

export default SpaceShooter;