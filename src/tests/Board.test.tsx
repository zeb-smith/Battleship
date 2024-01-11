import { render, fireEvent, waitFor } from '@testing-library/react';
import Board from '../components/Board';

const mockAlert = jest.fn();
window.alert = mockAlert;

test('renders Board component', () => {
  render(<Board />);
});

test('handles ship placement on cell click', () => {
  const { getByTestId } = render(<Board />);
  const emptyCell = getByTestId('player-cell-0-0');

  fireEvent.click(emptyCell);

  expect(emptyCell).toHaveStyle('background-color: lightgray');
});

test('handles player turn and marks hits/misses on computer board', async () => {
  const { getByTestId } = render(<Board />);
  const emptyCell = getByTestId('computer-cell-0-0');

  fireEvent.click(emptyCell);
  await waitFor(() => {
    fireEvent.click(getByTestId('computer-cell-1-0'));
  });

  expect(getByTestId('computer-cell-0-0')).toHaveStyle(
    'background-color: lightgray',
  );
  expect(getByTestId('computer-cell-1-0')).toHaveStyle(
    'background-color: lightgray',
  );
});

test('handles computer turn and marks hits/misses on player board', async () => {
  const { getByTestId } = render(<Board />);
  const emptyCell = getByTestId('player-cell-0-0');

  await waitFor(() => {
    fireEvent.click(emptyCell);
  });

  expect(getByTestId('player-cell-0-0')).toHaveStyle(
    'background-color: lightgray',
  );
});
