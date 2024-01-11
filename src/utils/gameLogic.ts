const placeShip = (
  board: string[][],
  shipLength: number,
  isVertical: boolean,
) => {
  let placed = false;
  while (!placed) {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    if (canPlaceShip(board, row, col, shipLength, isVertical)) {
      for (let i = 0; i < shipLength; i++) {
        board[isVertical ? row + i : row][isVertical ? col : col + i] = 'S';
      }
      placed = true;
    }
  }
  return board;
};

export const canPlaceShip = (
  board: (string | null)[][],
  row: number,
  col: number,
  length: number,
  isVertical: boolean,
) => {
  for (let i = 0; i < length; i++) {
    if (isVertical) {
      if (row + i >= 10 || board[row + i][col] === 'S') return false;
    } else {
      if (col + i >= 10 || board[row][col + i] === 'S') return false;
    }
  }
  return true;
};

export const initializeBoard = (withShips = false) => {
  let board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  if (withShips) {
    const shipLengths = [5, 4, 3, 3];
    shipLengths.forEach((length) => {
      board = placeShip(board, length, Math.random() < 0.5);
    });
  }
  return board;
};

export const checkForWinner = (board: string[][]) => {
  return board.every((row) => row.every((cell) => cell !== 'S'));
};
