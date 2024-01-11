import React, { useState, useEffect } from 'react';
import BoardCell from './BoardCell';
import ShipPlacementPanel from './ShipPlacementPanel';
import { Ship } from '../types';
import {
  initializeBoard,
  checkForWinner,
  canPlaceShip,
} from '../utils/gameLogic';

const Board: React.FC = () => {
  const [playerBoard, setPlayerBoard] = useState(initializeBoard());
  const [computerBoard, setComputerBoard] = useState(initializeBoard(true));
  const [currentTurn, setCurrentTurn] = useState<'player' | 'computer'>(
    'player',
  );
  const [gameOver, setGameOver] = useState(false);
  const [placingShips, setPlacingShips] = useState(true);
  const [shipsToPlace, setShipsToPlace] = useState<Ship[]>([
    { length: 5, isVertical: false, placed: false },
    { length: 4, isVertical: false, placed: false },
    { length: 3, isVertical: false, placed: false },
    { length: 3, isVertical: false, placed: false },
  ]);
  const [selectedShipIndex, setSelectedShipIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (currentTurn === 'computer' && !gameOver) {
      setTimeout(() => {
        computerTurn();
      }, 1000);
    }
  }, [currentTurn, gameOver]);

  const getSelectedShip = () => {
    if (selectedShipIndex !== null) {
      return shipsToPlace[selectedShipIndex];
    }
    return null;
  };

  const handleCellClick = (row: number, col: number) => {
    if (placingShips) {
      const shipToPlace =
        selectedShipIndex !== null ? shipsToPlace[selectedShipIndex] : null;
      if (shipToPlace && !shipToPlace.placed) {
        if (
          canPlaceShip(
            playerBoard,
            row,
            col,
            shipToPlace.length,
            shipToPlace.isVertical,
          )
        ) {
          const newBoard = [...playerBoard];
          for (let i = 0; i < shipToPlace.length; i++) {
            newBoard[shipToPlace.isVertical ? row + i : row][
              shipToPlace.isVertical ? col : col + i
            ] = 'S';
          }
          setPlayerBoard(newBoard);

          const newShipsToPlace = [...shipsToPlace];
          if (selectedShipIndex !== null) {
            newShipsToPlace[selectedShipIndex].placed = true;
            setShipsToPlace(newShipsToPlace);
          }
        } else {
          alert('Cannot place ship here.');
        }
      }
    } else if (currentTurn === 'player' && !gameOver) {
      if (computerBoard[row][col] === 'S') {
        const newBoard = [...computerBoard];
        newBoard[row][col] = 'H';
        setComputerBoard(newBoard);
        if (checkForWinner(newBoard)) {
          setGameOver(true);
          alert('Player wins!');
          return;
        }
      } else if (computerBoard[row][col] === null) {
        const newBoard = [...computerBoard];
        newBoard[row][col] = 'M';
        setComputerBoard(newBoard);
      }
      setCurrentTurn('computer');
    }
  };

  const startGame = () => {
    if (shipsToPlace.every((ship) => ship.placed)) {
      setPlacingShips(false);
      setCurrentTurn('player');
    }
  };

  const computerTurn = () => {
    let hit = false;
    while (!hit && !gameOver) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      if (playerBoard[row][col] === null) {
        playerBoard[row][col] = 'M';
        hit = true;
      } else if (playerBoard[row][col] === 'S') {
        playerBoard[row][col] = 'H';
        hit = true;
        if (checkForWinner(playerBoard)) {
          setGameOver(true);
          alert('Computer wins!');
        }
      }
    }
    setCurrentTurn('player');
  };

  const handleGameStart = () => {
    const allShipsPlaced = shipsToPlace.every((ship) => ship.placed);
    if (allShipsPlaced) {
      startGame();
    } else {
      alert('Firstly, place all your ships.');
    }
  };

  return (
    <div data-testid='board-container'>
      <h1>Battleship Game</h1>
      <div className='d-flex justify-content-around'>
        <div data-testid='player-board-container'>
          <h2>Player Board</h2>
          <BoardCell
            data-testid='player-board'
            boardId='player'
            boardData={playerBoard}
            onCellClick={placingShips ? handleCellClick : () => {}}
            selectedShip={getSelectedShip()}
          />
        </div>
        <div data-testid='computer-board-container'>
          <h2>Computer Board</h2>
          <BoardCell
            boardId='computer'
            data-testid='computer-board'
            boardData={computerBoard}
            onCellClick={placingShips ? () => {} : handleCellClick}
          />
        </div>
      </div>
      {placingShips && (
        <ShipPlacementPanel
          data-testid='ship-placement-panel'
          shipsToPlace={shipsToPlace}
          selectedShipIndex={selectedShipIndex}
          setSelectedShipIndex={setSelectedShipIndex}
          setShipsToPlace={setShipsToPlace}
        />
      )}
      {placingShips && (
        <button className='btn btn-dark' onClick={handleGameStart}>
          Start Game
        </button>
      )}
    </div>
  );
};

export default Board;
