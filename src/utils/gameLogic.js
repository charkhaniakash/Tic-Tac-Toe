export function checkWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
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
  // Check for winning move
  const winningMove = findWinningMove(squares, 'O');
  if (winningMove !== -1) return winningMove;

  // Block player's winning move
  const blockingMove = findWinningMove(squares, 'X');
  if (blockingMove !== -1) return blockingMove;

  // Take center if available
  if (!squares[4]) return 4;

  // Take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => !squares[i]);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any available space
  const availableSpaces = squares.map((square, i) => !square ? i : null).filter(i => i !== null);
  return availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
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
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    const squares2 = squares.slice();
    if (squares2[a] === player && squares2[b] === player && !squares2[c]) return c;
    if (squares2[a] === player && !squares2[b] && squares2[c] === player) return b;
    if (!squares2[a] && squares2[b] === player && squares2[c] === player) return a;
  }
  return -1;
} 