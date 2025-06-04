import { useState, useCallback, useMemo } from 'react';

const STREAK_REWARDS = {
  3: 5,  
  5: 10  
};

const POINTS = {
  MULTIPLAYER_WIN: 2,  
  AI_WIN: 1          
};

export function useLeaderboard() {
  const [players, setPlayers] = useState(new Map());

  const updatePlayerScore = useCallback((username, points) => {
    setPlayers(prevPlayers => {
      const newPlayers = new Map(prevPlayers);
      const playerData = newPlayers.get(username) || {
        username,
        points: 0,
        currentStreak: 0,
        totalGames: 0,
        wins: 0
      };

      playerData.points += points;
      playerData.currentStreak += 1;
      playerData.totalGames += 1;
      playerData.wins += 1;

      if (STREAK_REWARDS[playerData.currentStreak]) {
        const bonus = STREAK_REWARDS[playerData.currentStreak];
        playerData.points += bonus;
        alert(`🎉 Congratulations ${username}! You've won ${playerData.currentStreak} games in a row and earned ${bonus} bonus points!`);
      }

      newPlayers.set(username, playerData);
      return newPlayers;
    });
  }, []);

  const recordGame = useCallback((winner, loser, gameMode) => {
    setPlayers(prevPlayers => {
      const newPlayers = new Map(prevPlayers);
      
      const winnerData = newPlayers.get(winner) || {
        username: winner,
        points: 0,
        currentStreak: 0,
        totalGames: 0,
        wins: 0,
        winsVsAI: 0,
        winsVsPlayers: 0
      };

      const pointsEarned = gameMode === 'single' ? POINTS.AI_WIN : POINTS.MULTIPLAYER_WIN;
      winnerData.points += pointsEarned;
      
      winnerData.currentStreak += 1;
      winnerData.totalGames += 1;
      winnerData.wins += 1;
      if (gameMode === 'single') {
        winnerData.winsVsAI += 1;
      } else {
        winnerData.winsVsPlayers += 1;
      }

      if (STREAK_REWARDS[winnerData.currentStreak]) {
        const bonus = STREAK_REWARDS[winnerData.currentStreak];
        winnerData.points += bonus;
        alert(`🎉 Congratulations ${winner}! You've won ${winnerData.currentStreak} games in a row and earned ${bonus} bonus points!\n\nPoints breakdown:\n- ${pointsEarned} points for winning${gameMode === 'single' ? ' against AI' : ''}\n- ${bonus} bonus points for ${winnerData.currentStreak} wins streak`);
      } else {
        alert(`🎮 ${winner} wins! +${pointsEarned} points${gameMode === 'single' ? ' for beating AI' : ' for beating another player'}!`);
      }

      if (loser !== 'AI') {
        const loserData = newPlayers.get(loser) || {
          username: loser,
          points: 0,
          currentStreak: 0,
          totalGames: 0,
          wins: 0,
          winsVsAI: 0,
          winsVsPlayers: 0
        };
        loserData.currentStreak = 0;
        loserData.totalGames += 1;
        newPlayers.set(loser, loserData);
      }

      newPlayers.set(winner, winnerData);
      return newPlayers;
    });
  }, []);

  const leaderboardData = useMemo(() => {
    return Array.from(players.values())
      .sort((a, b) => b.points - a.points)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
        winRate: player.totalGames ? ((player.wins / player.totalGames) * 100).toFixed(1) : '0.0',
        winsBreakdown: `vs Players: ${player.winsVsPlayers} | vs AI: ${player.winsVsAI}`
      }));
  }, [players]);

  return {
    leaderboardData,
    updatePlayerScore,
    recordGame
  };
} 