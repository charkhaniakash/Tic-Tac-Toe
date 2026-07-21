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
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export function getAIMove(squares) {
  return minimax(squares, 'O').move;
}

function minimax(squares, player) {
  const winner = checkWinner(squares);
  if (winner) {
    if (winner.winner === 'O') return { score: 10, move: null };
    if (winner.winner === 'X') return { score: -10, move: null };
    return { score: 0, move: null };
  }

  const availableMoves = getAvailableMoves(squares);
  if (availableMoves.length === 0) return { score: 0, move: null };

  if (player === 'O') {
    let bestScore = -Infinity;
    let bestMove = null;
    for (let move of availableMoves) {
      const newSquares = [...squares];
      newSquares[move] = player;
      const { score } = minimax(newSquares, 'X');
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return { score: bestScore, move: bestMove };
  } else {
    let bestScore = Infinity;
    let bestMove = null;
    for (let move of availableMoves) {
      const newSquares = [...squares];
      newSquares[move] = player;
      const { score } = minimax(newSquares, 'O');
      if (score < bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return { score: bestScore, move: bestMove };
  }
}

function getAvailableMoves(squares) {
  return squares.map((square, i) => square === null ? i : null).filter(i => i !== null);
}
