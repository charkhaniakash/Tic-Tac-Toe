import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LeaderboardProvider } from './contexts/LeaderboardContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LeaderboardProvider>
      <App />
    </LeaderboardProvider>
  </React.StrictMode>
); 