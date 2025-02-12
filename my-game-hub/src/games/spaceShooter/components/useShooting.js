import { useEffect } from "react";
import { createBullet } from "../spaceLogic";

const useShooting = (playerX, weaponLevel, setBullets) => {
  useEffect(() => {
    const shootInterval = setInterval(() => {
      const newBullets = [];
      for (let i = 0; i < weaponLevel; i++) {
        newBullets.push(createBullet(playerX + 20 + (i * 10 - weaponLevel * 5), 560));
      }
      setBullets((prevBullets) => [...prevBullets, ...newBullets]);
    }, 500);

    return () => clearInterval(shootInterval);
  }, [playerX, weaponLevel, setBullets]);

  return null; 
};

export default useShooting;