import { useState, useCallback, useMemo } from 'react';

const STREAK_REWARDS = {
  3: 5,  // 3 wins = 5 bonus points
  5: 10  // 5 wins = 10 bonus points
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

      // Check for streak rewards
      if (STREAK_REWARDS[playerData.currentStreak]) {
        const bonus = STREAK_REWARDS[playerData.currentStreak];
        playerData.points += bonus;
        alert(`🎉 Congratulations ${username}! You've won ${playerData.currentStreak} games in a row and earned ${bonus} bonus points!`);
      }

      newPlayers.set(username, playerData);
      return newPlayers;
    });
  }, []);

  const recordGame = useCallback((winner, loser) => {
    setPlayers(prevPlayers => {
      const newPlayers = new Map(prevPlayers);
      
      // Update winner's data
      const winnerData = newPlayers.get(winner) || {
        username: winner,
        points: 0,
        currentStreak: 0,
        totalGames: 0,
        wins: 0
      };
      winnerData.currentStreak += 1;
      winnerData.totalGames += 1;
      winnerData.wins += 1;
      winnerData.points += 1; // Base point for winning

      // Check for streak rewards
      if (STREAK_REWARDS[winnerData.currentStreak]) {
        const bonus = STREAK_REWARDS[winnerData.currentStreak];
        winnerData.points += bonus;
        alert(`🎉 Congratulations ${winner}! You've won ${winnerData.currentStreak} games in a row and earned ${bonus} bonus points!`);
      }

      // Update loser's data
      const loserData = newPlayers.get(loser) || {
        username: loser,
        points: 0,
        currentStreak: 0,
        totalGames: 0,
        wins: 0
      };
      loserData.currentStreak = 0;
      loserData.totalGames += 1;

      newPlayers.set(winner, winnerData);
      newPlayers.set(loser, loserData);
      return newPlayers;
    });
  }, []);

  const leaderboardData = useMemo(() => {
    return Array.from(players.values())
      .sort((a, b) => b.points - a.points)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
        winRate: player.totalGames ? ((player.wins / player.totalGames) * 100).toFixed(1) : '0.0'
      }));
  }, [players]);

  return {
    leaderboardData,
    updatePlayerScore,
    recordGame
  };
} 