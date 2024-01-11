export type Ship = {
  length: number;
  isVertical: boolean;
  placed: boolean;
};

export interface BoardProps {
  boardData: (string | null)[][];
  boardId: string;
  onCellClick: (row: number, col: number) => void;
  selectedShip?: Ship | null;
}

export interface ShipPlacementPanelProps {
  shipsToPlace: Ship[];
  selectedShipIndex: number | null;
  setSelectedShipIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setShipsToPlace: React.Dispatch<React.SetStateAction<Ship[]>>;
}
