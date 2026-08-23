import React from 'react';
import GameContainer from './components/GameContainer';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <GameContainer />
      </div>
    </ThemeProvider>
  );
}

export default App; 
