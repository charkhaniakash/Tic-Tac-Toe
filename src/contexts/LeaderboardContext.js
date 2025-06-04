import React, { createContext, useContext } from 'react';
import { useLeaderboard } from '../hooks/useLeaderboard';

const LeaderboardContext = createContext(null);

export function LeaderboardProvider({ children }) {
  const leaderboardState = useLeaderboard();

  return (
    <LeaderboardContext.Provider value={leaderboardState}>
      {children}
    </LeaderboardContext.Provider>
  );
}

export function useLeaderboardContext() {
  const context = useContext(LeaderboardContext);
  if (!context) {
    throw new Error('useLeaderboardContext must be used within a LeaderboardProvider');
  }
  return context;
} 