import { useEffect } from "react";
import { createEnemy } from "../spaceLogic";

const useEnemyWaves = (score, setEnemies) => {
  useEffect(() => {
    const waveInterval = setInterval(() => {
      const waveSize = Math.min(3 + Math.floor(score / 100), 10);
      for (let i = 0; i < waveSize; i++) {
        setTimeout(() => {
          setEnemies((prevEnemies) => [...prevEnemies, createEnemy()]);
        }, i * 500);
      }
    }, 8000);

    return () => clearInterval(waveInterval);
  }, [score, setEnemies]);
};

export default useEnemyWaves;