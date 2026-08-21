import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Board from './Board';
import { useGame } from '../hooks/useGame';

const GameStatus = memo(function GameStatus({ winner, gameOver, currentPlayer, gameMode, username, player2Name }) {
  if (gameOver) {
    if (winner) {
      const winnerName = winner === 'X' ? username : (gameMode === 'single' ? 'AI' : player2Name);
      return <h2 className="game-status winner">🎉 Winner: {winnerName}! 🎉</h2>;
    }
    return <h2 className="game-status draw">It's a draw! 🤝</h2>;
  }
  return <h2 className="game-status">Current player: {currentPlayer}'s turn ({currentPlayer === 'AI' ? 'O' : 'X'})</h2>;
});

const Game = memo(function Game({ username, gameMode, onBackToMenu }) {
  // const [player2Name, setPlayer2Name] = useState('');
  // const [isPlayer2Ready, setIsPlayer2Ready] = useState(false);

  const {
    board,
    winner,
    gameOver,
    handleMove,
    resetGame,
    currentPlayer,
    isXNext
  } = useGame({
    username,
    player2Name: 'AI',
    gameMode: 'single',
    onGameEnd: null
  });

  // const handlePlayer2Submit = (e) => {
  //   e.preventDefault();
  //   if (player2Name.trim()) {
  //     setIsPlayer2Ready(true);
  //   }
  // };

  // if (gameMode === 'multiplayer' && !isPlayer2Ready) {
  //   return (
  //     <div className="game-setup">
  //       <h2>Player 2 Setup</h2>
  //       <form onSubmit={handlePlayer2Submit}>
  //         <input
  //           type="text"
  //           placeholder="Enter Player 2 name"
  //           value={player2Name}
  //           onChange={(e) => setPlayer2Name(e.target.value)}
  //           minLength={2}
  //           required
  //         />
  //         <button 
  //           type="submit"
  //           disabled={!player2Name.trim() || player2Name.trim().length < 2}
  //         >
  //           Start Game
  //         </button>
  //       </form>
  //       <p className="game-instructions">
  //         Player 1 ({username}) will play as X<br />
  //         Player 2 will play as O
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <main className="game">
      <div className="game-heading">
        <span className="eyebrow">Solo match</span>
        <h1>Tic-Tac-Toe</h1>
      </div>
      <GameStatus 
        winner={winner}
        gameOver={gameOver}
        currentPlayer={currentPlayer}
        gameMode="single"
        username={username}
        player2Name="AI"
      />
      
      {!gameOver && (
        <p className="game-instructions">
          Click any empty square to make your move. The AI will respond automatically.
        </p>
      )}

      <div className="game-board">
        <Board 
          squares={board} 
          onSquareClick={handleMove}
          isClickable={!gameOver && isXNext}
        />
      </div>

      <div className="game-controls">
        <button onClick={resetGame}>New Game</button>
        <button onClick={onBackToMenu}>Back to Menu</button>
      </div>

      <div className="game-info">
        <p>Playing as:</p>
        <ul>
          <li>{username}: X</li>
          <li>AI: O</li>
        </ul>
      </div>
    </main>
  );
});

Game.propTypes = {
  username: PropTypes.string.isRequired,
  gameMode: PropTypes.oneOf(['single', 'multiplayer']).isRequired,
  onBackToMenu: PropTypes.func.isRequired
};

GameStatus.propTypes = {
  winner: PropTypes.oneOf(['X', 'O', null]),
  gameOver: PropTypes.bool.isRequired,
  currentPlayer: PropTypes.string.isRequired,
  gameMode: PropTypes.oneOf(['single', 'multiplayer']).isRequired,
  username: PropTypes.string.isRequired,
  player2Name: PropTypes.string.isRequired
};

export default Game; 
