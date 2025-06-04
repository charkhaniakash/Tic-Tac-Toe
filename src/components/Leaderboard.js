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
      <td>{player.winsBreakdown}</td>
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
        <p className="no-games">No games played yet. Be the first to play!</p>
        <div className="points-info">
          <h3>Points System:</h3>
          <ul>
            <li>Win vs Player: +2 points</li>
            <li>Win vs AI: +1 point</li>
            <li>3 wins streak: +5 bonus points</li>
            <li>5 wins streak: +10 bonus points</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="points-info">
        <h3>Points System:</h3>
        <ul>
          <li>Win vs Player: +2 points</li>
          <li>Win vs AI: +1 point</li>
          <li>3 wins streak: +5 bonus points</li>
          <li>5 wins streak: +10 bonus points</li>
        </ul>
      </div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Points</th>
            <th>Current Streak</th>
            <th>Win Rate</th>
            <th>Wins</th>
            <th>Games</th>
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