export const CANVAS_WIDTH = 400;
export const CANVAS_HEIGHT = 600;
export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 40;
export const BULLET_SPEED = 5;
export const ENEMY_SPEED = 1.5;  
export const ENEMY_SPAWN_RATE = 50;  
export const UPGRADE_COST = 50;
export const PLAYER_LIVES = 3;
export const ENEMY_BULLET_SPEED = 3;
export const WAVE_INTERVAL = 5000;  


export const createEnemy = (waveNumber) => {
    let hp = 1;
    let speed = ENEMY_SPEED + waveNumber * 0.2; 
    let shootChance = 0.02 + waveNumber * 0.005; 
  
    if (waveNumber > 3) {
      hp = 2;
      speed += 0.5;
      shootChance += 0.02;
    }
  
    if (waveNumber > 5) {
      hp = 3;
      speed += 1;
      shootChance += 0.03;
    }
  
    return {
      x: Math.random() * (CANVAS_WIDTH - PLAYER_WIDTH),
      y: 0,
      hp,
      speed,
      shootChance,
    };
  };


export const createBullet = (x, y, direction = -1) => ({
  x,
  y,
  direction,
});


export const checkCollision = (obj1, obj2) => {
  return (
    obj1.x < obj2.x + PLAYER_WIDTH &&
    obj1.x + PLAYER_WIDTH > obj2.x &&
    obj1.y < obj2.y + PLAYER_HEIGHT &&
    obj1.y + PLAYER_HEIGHT > obj2.y
  );
};