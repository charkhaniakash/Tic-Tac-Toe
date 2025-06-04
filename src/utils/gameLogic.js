export function checkWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function getAIMove(squares) {
  const move = findWinningMove(squares, 'O');
  if (move !== -1) return move;

  const blockMove = findWinningMove(squares, 'X');
  if (blockMove !== -1) return blockMove;

  if (squares[4] === null) return 4;

  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => squares[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  const sides = [1, 3, 5, 7];
  const availableSides = sides.filter(i => squares[i] === null);
  if (availableSides.length > 0) {
    return availableSides[Math.floor(Math.random() * availableSides.length)];
  }

  const availableSquares = squares.map((square, i) => square === null ? i : null).filter(i => i !== null);
  return availableSquares[Math.floor(Math.random() * availableSquares.length)];
}

function findWinningMove(squares, player) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    const squaresCopy = [...squares];
    if (squares[a] === null && squares[b] === player && squares[c] === player) return a;
    if (squares[a] === player && squares[b] === null && squares[c] === player) return b;
    if (squares[a] === player && squares[b] === player && squares[c] === null) return c;
  }
  return -1;
} 