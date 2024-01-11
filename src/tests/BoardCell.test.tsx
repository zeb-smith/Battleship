import { render } from '@testing-library/react';
import BoardCell from '../components/BoardCell';

test('renders BoardCell component', () => {
  render(<BoardCell boardData={[]} boardId='player' onCellClick={() => {}} />);
});

test('displays ship color when there is a ship on the cell', () => {
  const { container } = render(
    <BoardCell boardData={[['S']]} boardId='player' onCellClick={() => {}} />,
  );
  const button = container.querySelector('button');

  expect(button).toHaveStyle('background-color: gray');
});

test('displays hit color when there is a hit on the cell', () => {
  const { container } = render(
    <BoardCell boardData={[['H']]} boardId='player' onCellClick={() => {}} />,
  );
  const button = container.querySelector('button');

  expect(button).toHaveStyle('background-color: red');
});

test('displays miss color when there is a miss on the cell', () => {
  const { container } = render(
    <BoardCell boardData={[['M']]} boardId='player' onCellClick={() => {}} />,
  );
  const button = container.querySelector('button');

  expect(button).toHaveStyle('background-color: blue');
});
