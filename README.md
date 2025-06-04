# React Tic-Tac-Toe Game

A modern implementation of the classic Tic-Tac-Toe game with React, featuring single-player and multiplayer modes, leaderboard system, and win streak rewards.

## Features

- 🎮 Two game modes:
  - Single-player against AI
  - Two-player local multiplayer
- 🤖 Smart AI opponent that:
  - Takes winning moves when available
  - Blocks opponent's winning moves
  - Makes strategic moves
- 🏆 Point-based leaderboard system:
  - +2 points for winning against another player
  - +1 point for winning against AI
- ⭐ Win streak rewards:
  - +5 bonus points for 3 consecutive wins
  - +10 bonus points for 5 consecutive wins
- 📊 Statistics tracking:
  - Win rate
  - Total games played
  - Current streak
  - Overall points

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tic-tac-toe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to play the game.

## How to Play

1. Enter your username when prompted
2. Choose a game mode:
   - Single Player: Play against the AI
   - Multiplayer: Play against another person
3. In multiplayer mode, Player 2 will need to enter their name
4. Click on any empty square to make your move
5. The game will automatically detect wins, losses, and draws
6. View the leaderboard to track your progress and compete with others

## Code Structure

The project follows a modular architecture with clean separation of concerns:

- `src/components/`: React components for UI elements
- `src/hooks/`: Custom hooks for game and leaderboard logic
- `src/contexts/`: React context for global state management
- `src/utils/`: Utility functions for game logic

## Technologies Used

- React 18
- JavaScript
- CSS3
- Context API for state management
- Custom Hooks for logic separation 