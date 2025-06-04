import { useState, useCallback, useEffect } from 'react';
import { checkWinner, getAIMove } from '../utils/gameLogic';
import { useLeaderboardContext } from '../contexts/LeaderboardContext';

export function useGame({ username, player2Name, gameMode, onGameEnd }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const { recordGame } = useLeaderboardContext();

  const handleMove = useCallback((index) => {
    if (board[index] || gameOver) return false;

    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[index] = isXNext ? 'X' : 'O';
      return newBoard;
    });

    setIsXNext(prev => !prev);
    return true;
  }, [board, gameOver, isXNext]);

  useEffect(() => {
    const currentWinner = checkWinner(board);
    const isGameOver = currentWinner || board.every(square => square);

    if (isGameOver) {
      setGameOver(true);
      setWinner(currentWinner);

      if (currentWinner) {
        const isPlayer1Winner = currentWinner === 'X';
        if (isPlayer1Winner) {
          recordGame(username, player2Name);
        } else {
          recordGame(player2Name, username);
        }
      }

      onGameEnd?.(currentWinner);
    }
  }, [board, username, player2Name, recordGame, onGameEnd]);

  useEffect(() => {
    if (!isXNext && gameMode === 'single' && !gameOver) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(board);
        handleMove(aiMove);
      }, 500); // Add slight delay for better UX

      return () => clearTimeout(timer);
    }
  }, [isXNext, gameMode, gameOver, board, handleMove]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameOver(false);
  }, []);

  return {
    board,
    isXNext,
    winner,
    gameOver,
    handleMove,
    resetGame,
    currentPlayer: isXNext ? username : player2Name
  };
} 