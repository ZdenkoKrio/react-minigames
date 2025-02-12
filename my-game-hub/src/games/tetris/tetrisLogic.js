export const ROWS = 20;
export const COLS = 10;
export const BLOCK_SIZE = 30;


export const TETROMINOES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
  [[1, 0, 0], [1, 1, 1]], // J
  [[0, 0, 1], [1, 1, 1]] // L
];


export const getRandomTetromino = () => {
  const index = Math.floor(Math.random() * TETROMINOES.length);
  return { shape: TETROMINOES[index], x: 3, y: 0 };
};


export const checkCollision = (board, tetromino, moveX, moveY) => {
  return tetromino.shape.some((row, y) =>
    row.some((cell, x) => {
      if (cell) {
        let newX = tetromino.x + x + moveX;
        let newY = tetromino.y + y + moveY;
        return newX < 0 || newX >= COLS || newY >= ROWS || (board[newY] && board[newY][newX]);
      }
      return false;
    })
  );
};

// small bug with last tetromino
export const clearFullRows = (board) => {
  const newBoard = board.filter(row => row.some(cell => !cell)); 
  const missingRows = ROWS - newBoard.length;
  const emptyRows = Array.from({ length: missingRows }, () => Array(COLS).fill(0)); 
  return [...emptyRows, ...newBoard];
};

export const rotateTetromino = (tetromino) => {
  const rotatedShape = tetromino.shape[0].map((_, index) =>
    tetromino.shape.map(row => row[index]).reverse()
  );
  return { ...tetromino, shape: rotatedShape };
};