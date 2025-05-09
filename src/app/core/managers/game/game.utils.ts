import {Actions, AppState, Cell, CellPicture, CellState} from '../../models';
import {KeyActions} from '../keyboard/keyboard.manager';

export const movements: KeyActions = {
  [Actions.Up]: (playerPosition: [number, number]) => [playerPosition[0] - 1, playerPosition[1]] as [number, number],
  [Actions.Down]: (playerPosition: [number, number]) => [playerPosition[0] + 1, playerPosition[1]] as [number, number],
  [Actions.Left]: (playerPosition: [number, number]) => [playerPosition[0], playerPosition[1] - 1] as [number, number],
  [Actions.Right]: (playerPosition: [number, number]) => [playerPosition[0], playerPosition[1] + 1] as [number, number]
};

export function createBoard(cells: number = 10, numberOfPits: number = 2): Partial<AppState> {
  const playerPosition = [cells - 1,0] as [number, number];
  const baseBoard = Array.from({length: cells}).map((_, x) =>
      Array.from({length: cells}).map((_, y) => placeBaseElement(x, y, cells)));

  const wumpuPosition = createRandomCell(cells, [playerPosition]);
  const goldPosition = createRandomCell(cells, [playerPosition, wumpuPosition]);
  const pitsPositions = Array.from({length: numberOfPits}).map(() =>
    createRandomCell(cells, [playerPosition, wumpuPosition, goldPosition]));

  baseBoard[wumpuPosition[0]][wumpuPosition[1]] = { ...baseBoard[wumpuPosition[0]][wumpuPosition[1]], state: CellState.Invisible, elements: [CellPicture.Wumpu] }
  baseBoard[goldPosition[0]][goldPosition[1]] = { ...baseBoard[goldPosition[0]][goldPosition[1]], state: CellState.Invisible, elements: [CellPicture.Gold] }

  pitsPositions.forEach((pit) => {
    baseBoard[pit[0]][pit[1]] = {...baseBoard[pit[0]][pit[1]], state: CellState.Invisible, elements: [CellPicture.Pit]};
    createAdjacentElements(pit).forEach(breeze => setElementInBoard(breeze, baseBoard, CellPicture.Breeze));
  });
  createAdjacentElements(wumpuPosition).forEach(stench => setElementInBoard(stench, baseBoard, CellPicture.Stench));

  return {
    playerPosition,
    board: baseBoard,
    wumpuPosition,
    goldPosition,
    pitsPositions
  };
}

const placeBaseElement = (x: number, y: number, cells: number): Cell =>
  (x === (cells - 1) && y === 0) ? createCell([CellPicture.Player], `${x}0${y}`): createCell([CellPicture.Empty], `${x}0${y}`);

const createCell = (elements: CellPicture[], id: string): Cell  => ({
    id,
    elements,
    state: elements.includes(CellPicture.Player) ? CellState.Visible : CellState.Invisible
});

function createRandomCell(cells: number = 10, prohibitedPositions: [number, number][]): [number, number] {
  const position = [Math.floor(Math.random() * cells), Math.floor(Math.random() * cells)];
  const coincidences = prohibitedPositions.filter(element => `${element}` === `${position}`);

  return coincidences.length ? createRandomCell(cells, prohibitedPositions) : position as [number, number];
}

function createAdjacentElements(element: [number, number]): [number, number][] {
  return [
    [element[0] + 1, element[1]],
    [element[0] - 1, element[1]],
    [element[0], element[1] + 1],
    [element[0], element[1] - 1]
  ];
}

function setElementInBoard(stench: [number, number], board: Cell[][], picture: CellPicture): void {
  if (validMovement(stench[0], stench[1], board.length)) {
    board[stench[0]][stench[1]] = {
      ...board[stench[0]][stench[1]],
      state: CellState.Invisible,
      elements : !board[stench[0]][stench[1]].elements.includes(CellPicture.Empty) ?
        [...board[stench[0]][stench[1]].elements, picture] : [picture]
  }
  }
}

export function updateBoard(playerPosition: [number, number], board: Cell[][], oldPosition: [number, number]): Cell[][] {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  const [oldRow, oldCol] = oldPosition;
  const [newRow, newCol] = playerPosition;

  newBoard[oldRow][oldCol] = {
    ...newBoard[oldRow][oldCol],
    elements: newBoard[oldRow][oldCol].elements.filter(element => element !== CellPicture.Player),
    state: CellState.Visible
  };
  newBoard[newRow][newCol] = {
    ...newBoard[newRow][newCol],
    elements: [...newBoard[newRow][newCol].elements.filter(element => element !== CellPicture.Empty), CellPicture.Player],
    state: CellState.Visible
  };

  return newBoard;
}

export function validMovement(row: number, column: number, length: number): boolean {
  return row >= 0 && column >= 0 && column < length && row < length;
}

export function samePosition(playerPosition: [number, number], element: [number, number]): boolean {
  return playerPosition.toString() === element.toString();
}

export function arrowImpactInWumpu(direction: Actions, playerPosition: [number, number], board: Cell[][]): boolean {
  const positions = arrowsAcrossTheBoard(direction, playerPosition, board.length);
  return !!positions.filter(([row, col]) => board[row][col].elements.includes(CellPicture.Wumpu)).length;
}

function arrowsAcrossTheBoard(direction: Actions, playerPosition: [number, number], length: number): [number, number][] {
  const positions: [number, number][] = [];
  let [row, col] = movements[direction](playerPosition);
  let [deltaRow, deltaCol] = movements[direction]([0,0]);

  while (validMovement(row, col, length)) {
    positions.push([row, col]);
    row += deltaRow;
    col += deltaCol;
  }
  return positions;
}


