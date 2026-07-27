`import React, { useState, memo } from 'react';
import Game from './Game';
import Leaderboard from './Leaderboard';

const LoginSection = memo(function LoginSection({ username, onUsernameChange, onGameStart }) {
  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="login-section">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
        />
      </div>
      <div className="menu-buttons">
        <button onClick={() => onGameStart('single')}>Single Player</button>
        <button onClick={onShowLeaderboard}>View Leaderboard</button>
      </div>
    </div>
  );
});

const GameContainer = memo(function GameContainer() {
  const [username, setUsername] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState(null);

  const handleStartGame = (mode) => {
    if (!username.trim()) {
      alert('Please enter your username first!');
      return;
    }
    setGameMode(mode);
    setGameStarted(true);
  };

  const handleBackToMenu = () => {
    setGameStarted(false);
    setGameMode(null);
  };

  return (
    <>
      {!gameStarted ? (
        <LoginSection
          username={username}
          onUsernameChange={setUsername}
          onGameStart={handleStartGame}
        />
      ) : (
        <div className="app">
          <Game
            username={username}
            gameMode={gameMode}
            onBackToMenu={handleBackToMenu}
          />
        </div>
      )}
    </>
  );
});

export default GameContainer;
