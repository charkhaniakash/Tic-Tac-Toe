export function checkWinner(board) {
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
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export function getAIMove(board) {
  const aiPlayer = 'O';
  const humanPlayer = 'X';

  // Helper function to find a winning or blocking move
  const findStrategicMove = (player) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = player;
        if (checkWinner(newBoard) === player) {
          return i;
        }
      }
    }
    return -1;
  };

  // 1. Check for AI winning move
  const winningMove = findStrategicMove(aiPlayer);
  if (winningMove !== -1) {
    return winningMove;
  }

  // 2. Check for player blocking move
  const blockingMove = findStrategicMove(humanPlayer);
  if (blockingMove !== -1) {
    return blockingMove;
  }

  // 3. Prioritize strategic moves: center, corners, then sides
  const strategicPositions = [
    4, // Center
    0, 2, 6, 8, // Corners
    1, 3, 5, 7, // Sides
  ];

  for (const pos of strategicPositions) {
    if (board[pos] === null) {
      return pos;
    }
  }

  // Fallback: If no strategic moves are available, pick the first available empty spot
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      return i;
    }
  }

  return -1; // Should ideally not happen in a full game
}
