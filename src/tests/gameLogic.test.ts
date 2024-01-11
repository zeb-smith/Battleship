import {
  canPlaceShip,
  initializeBoard,
  checkForWinner,
} from '../utils/gameLogic';

test('canPlaceShip function works correctly', () => {
  const board = [
    ['S', null],
    [null, null],
  ];
  expect(canPlaceShip(board, 0, 1, 2, false)).toBe(true);
  expect(canPlaceShip(board, 0, 0, 2, false)).toBe(false);
});

test('initializeBoard function initializes board correctly', () => {
  const board = initializeBoard();
  expect(board.length).toBe(10);
  expect(board[0].length).toBe(10);
});

test('checkForWinner function works correctly', () => {
  const boardWithShips = [
    ['H', 'S'],
    ['S', 'S'],
  ];
  const boardWithoutShips = [
    ['H', 'M'],
    ['M', 'M'],
  ];
  expect(checkForWinner(boardWithShips)).toBe(false);
  expect(checkForWinner(boardWithoutShips)).toBe(true);
});
