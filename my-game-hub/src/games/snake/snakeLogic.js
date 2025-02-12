export const SNAKE_SIZE = 20;
export const CANVAS_SIZE = 400;
export const SPEED = 200;

export const directions = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

// Kontrola kolízie so stenou alebo hadom samým
export const checkCollision = (head, snake) => {
  return (
    head.x < 0 ||
    head.x >= CANVAS_SIZE / SNAKE_SIZE ||
    head.y < 0 ||
    head.y >= CANVAS_SIZE / SNAKE_SIZE ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  );
};

// Generovanie náhodného jedla
export const generateFood = () => ({
  x: Math.floor(Math.random() * (CANVAS_SIZE / SNAKE_SIZE)),
  y: Math.floor(Math.random() * (CANVAS_SIZE / SNAKE_SIZE)),
});