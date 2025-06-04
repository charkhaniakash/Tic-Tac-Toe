📋 Project Requirement Specification: Terminal-Based Tic-Tac-Toe Game

Tech stasks :- React , javascript

✅ Phase 1: Core Game Implementation

🎮 Game Modes
- Two-Player Mode:
  - Support gameplay between two users on two separate terminals (simulate local multiplayer).
- Single-Player Mode:
  - Support gameplay between one user and an AI opponent.

🧩 Game Features
- Display the Tic-Tac-Toe board after each move.
- Validate user input to ensure:
  - The move is within bounds (0–2 for row and column).
  - The selected cell is not already occupied.
- Detect and announce game-ending conditions:
  - Win
  - Loss
  - Draw

🤖 AI Behavior
- Implement a basic AI opponent:
  - Blocks the player’s winning move when applicable.
  - Takes a winning move if available.
  - Makes reasonable moves otherwise.

🖥️ User Interface
- Clear prompts:
  - Ask which mode to play (single/multiplayer).
  - Ask for cell coordinates during a turn.
- Maintain a simple, user-friendly terminal output with clear instructions and visuals.

🧱 Code Structure
- Code must be:
  - Modular (divided logically into functions or classes).
  - Clean and readable.
  - Separate concerns (e.g., input handling, game logic, display).


🏆 Phase 2: Leaderboard Integration

🧩 Game Features
- Introduce a point-based leaderboard system:
  - +2 points for every win against another user.
  - +1 point for every win against the bot.
  - No points deducted for a loss.
- Keep leaderboard data in-memory only (no external DB or file storage).

🖥️ User Interface
- Prompt the user to enter a username on connecting from a new terminal.
- Add an option in the main menu (lobby) to view the current leaderboard.
- Ensure leaderboard is displayed in a clear, readable format.

🧱 Code Structure
- Store leaderboard logic in a separate module to ensure it's decoupled from the core game logic.


🔥 Phase 3: Win Streak Rewards

🧩 Game Features
- Track user win streaks:
  - If a player wins 3 consecutive games, reward +5 bonus points.
  - If a player wins 5 consecutive games, reward +10 bonus points.
- Bonus points are added on top of the regular win points.

🖥️ User Interface
- Immediately notify the user if they receive a streak reward after a game ends.
- Make the notification distinct and celebratory to highlight achievement.

🧱 Code Structure
- Implement the streak logic in a separate module, keeping it loosely coupled with both game and leaderboard logic.


📊 Evaluation Criteria

✔️ Functionality:  
- Does the game meet all the specified functional requirements?

✔️ Code Quality:  
- Is the code modular, well-structured, and easy to read?  
- Is it free from significant bugs or repeated logic?

✔️ AI Implementation:  
- How effectively does the AI play the game?  
- Does it make smart decisions such as blocking and winning when possible?

✔️ User Experience:  
- Is the game intuitive and easy to play in the terminal?  
- Are prompts and outputs clear and user-friendly?
