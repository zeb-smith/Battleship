import React from 'react';
import { ShipPlacementPanelProps } from '../types';

const ShipPlacementPanel: React.FC<ShipPlacementPanelProps> = ({
  shipsToPlace,
  selectedShipIndex,
  setSelectedShipIndex,
  setShipsToPlace,
}) => {
  const handleRotateShipButtonClicked = (shipIndex: number) => {
    const newShipsToPlace = [...shipsToPlace];
    newShipsToPlace[shipIndex].isVertical =
      !newShipsToPlace[shipIndex].isVertical;
    setShipsToPlace(newShipsToPlace);
  };
  return (
    <div data-testid='ship-placement-panel-container'>
      <h2>Place Your Ships</h2>
      {shipsToPlace.map((ship, index) => (
        <button
          key={index}
          data-testid={`ship-button-${index}`}
          disabled={ship.placed}
          onClick={() => setSelectedShipIndex(index)}
          style={{ marginRight: '10px', marginBottom: '10px' }}
        >
          Ship {ship.length} Boxes {ship.placed ? '(Placed)' : ''}
        </button>
      ))}
      {selectedShipIndex !== null && (
        <>
          <button
            data-testid='rotate-ship-button'
            onClick={() => handleRotateShipButtonClicked(selectedShipIndex)}
          >
            Rotate Ship Axis
          </button>
        </>
      )}
    </div>
  );
};

export default ShipPlacementPanel;
