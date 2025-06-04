import React, { memo } from 'react';
import { useLeaderboardContext } from '../contexts/LeaderboardContext';

const LeaderboardRow = memo(function LeaderboardRow({ player }) {
  return (
    <tr>
      <td>{player.rank}</td>
      <td>{player.username}</td>
      <td>{player.points}</td>
      <td>{player.currentStreak}</td>
      <td>{player.winRate}%</td>
      <td>{player.totalGames}</td>
    </tr>
  );
});

const Leaderboard = memo(function Leaderboard() {
  const { leaderboardData } = useLeaderboardContext();

  if (leaderboardData.length === 0) {
    return (
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <p>No games played yet. Be the first to play!</p>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Points</th>
            <th>Current Streak</th>
            <th>Win Rate</th>
            <th>Games Played</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player) => (
            <LeaderboardRow key={player.username} player={player} />
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Leaderboard; 