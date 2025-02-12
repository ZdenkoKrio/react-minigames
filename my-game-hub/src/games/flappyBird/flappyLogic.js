export const CANVAS_WIDTH = 400;
export const CANVAS_HEIGHT = 600;
export const BIRD_SIZE = 30;
export const GRAVITY = 0.5;
export const JUMP_FORCE = -8;
export const PIPE_WIDTH = 50;
export const PIPE_GAP = 120;
export const PIPE_SPEED = 3;


export const createPipes = () => {
  const topHeight = Math.floor(Math.random() * (CANVAS_HEIGHT / 2)) + 50;
  return {
    x: CANVAS_WIDTH,
    topHeight: topHeight,
    bottomHeight: CANVAS_HEIGHT - topHeight - PIPE_GAP,
  };
};


export const checkCollision = (birdY, pipes) => {
  return pipes.some((pipe) => {
    if (pipe.x < 50 + BIRD_SIZE && pipe.x + PIPE_WIDTH > 50) {
      if (birdY < pipe.topHeight || birdY + BIRD_SIZE > CANVAS_HEIGHT - pipe.bottomHeight) {
        return true;
      }
    }
    return false;
  });
};