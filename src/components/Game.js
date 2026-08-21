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

const Game = memo(function Game({ username, onBackToMenu }) {

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

  return (
    <div className="game">
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
        <button onClick={resetGame}>New Game</button>,
        <button onClick={onBackToMenu}>Back to Menu</button>
      </div>

      <div className="game-info">
        <p>Playing as:</p>
        <ul>
          <li>{username}: X</li>
          <li>AI: O</li>
        </ul>
      </div>
    </div>
  );
});

Game.propTypes = {
  username: PropTypes.string.isRequired,
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
