import { render, fireEvent } from '@testing-library/react';
import ShipPlacementPanel from '../components/ShipPlacementPanel';

test('renders ShipPlacementPanel component', () => {
  render(
    <ShipPlacementPanel
      shipsToPlace={[
        { length: 5, isVertical: false, placed: false },
        { length: 4, isVertical: false, placed: false },
        { length: 3, isVertical: false, placed: false },
        { length: 3, isVertical: false, placed: false },
      ]}
      selectedShipIndex={null}
      setSelectedShipIndex={() => {}}
      setShipsToPlace={() => {}}
    />,
  );
});

test('handles ship button click', () => {
  const setSelectedShipIndexMock = jest.fn();
  const { getByTestId } = render(
    <ShipPlacementPanel
      shipsToPlace={[
        { length: 5, isVertical: false, placed: false },
        { length: 4, isVertical: false, placed: false },
        { length: 3, isVertical: false, placed: false },
        { length: 3, isVertical: false, placed: false },
      ]}
      selectedShipIndex={null}
      setSelectedShipIndex={setSelectedShipIndexMock}
      setShipsToPlace={() => {}}
    />,
  );

  fireEvent.click(getByTestId('ship-button-0'));
  expect(setSelectedShipIndexMock).toHaveBeenCalledWith(0);
});

test('handles rotate ship button click', () => {
  const setShipsToPlaceMock = jest.fn();
  const { getByTestId } = render(
    <ShipPlacementPanel
      shipsToPlace={[
        { length: 5, isVertical: false, placed: false },
        { length: 4, isVertical: false, placed: false },
        { length: 3, isVertical: false, placed: false },
        { length: 3, isVertical: false, placed: false },
      ]}
      selectedShipIndex={0}
      setSelectedShipIndex={() => {}}
      setShipsToPlace={setShipsToPlaceMock}
    />,
  );

  fireEvent.click(getByTestId('rotate-ship-button'));
  expect(setShipsToPlaceMock).toHaveBeenCalledWith([
    { length: 5, isVertical: true, placed: false },
    { length: 4, isVertical: false, placed: false },
    { length: 3, isVertical: false, placed: false },
    { length: 3, isVertical: false, placed: false },
  ]);
});
