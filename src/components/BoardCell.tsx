import React, { useState } from 'react';
import { BoardProps } from '../types';
import { canPlaceShip } from '../utils/gameLogic';
import '../assets/board-cell.css';

const BoardCell: React.FC<BoardProps> = ({
  boardData,
  boardId,
  onCellClick,
  selectedShip,
}) => {
  const boardCell = boardId === 'player' ? 'player-cell' : 'computer-cell';
  const [previewPlacement, setPreviewPlacement] = useState({
    row: -1,
    col: -1,
    length: 0,
    isVertical: false,
  });

  const handleMouseEnter = (row: number, col: number) => {
    if (selectedShip && !selectedShip.placed) {
      setPreviewPlacement({
        row,
        col,
        length: selectedShip.length,
        isVertical: selectedShip.isVertical,
      });
    }
  };

  const handleMouseLeave = () => {
    setPreviewPlacement({ row: -1, col: -1, length: 0, isVertical: false });
  };

  const getCellColor = (
    cell: string | null,
    rowIndex: number,
    colIndex: number,
    boardCell: string,
  ) => {
    const { row, col, length, isVertical } = previewPlacement;
    const inPreview =
      rowIndex >= row &&
      colIndex >= col &&
      ((isVertical && rowIndex < row + length && colIndex === col) ||
        (!isVertical && colIndex < col + length && rowIndex === row));
    if (
      inPreview &&
      selectedShip &&
      canPlaceShip(
        boardData,
        row,
        col,
        selectedShip.length,
        selectedShip.isVertical,
      )
    ) {
      return 'yellow';
    }

    if (boardCell === 'player-cell' && cell === 'S') {
      return 'gray';
    }

    switch (cell) {
      case 'H':
        return 'red';
      case 'M':
        return 'blue';
      default:
        return 'lightgray';
    }
  };

  return (
    <div data-testid='board-cell-container' className='cell-container'>
      {boardData.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            data-testid={`${boardCell}-${rowIndex}-${colIndex}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
            onMouseLeave={handleMouseLeave}
            style={{
              backgroundColor: getCellColor(
                cell,
                rowIndex,
                colIndex,
                boardCell,
              ),
            }}
          />
        )),
      )}
    </div>
  );
};

export default BoardCell;
