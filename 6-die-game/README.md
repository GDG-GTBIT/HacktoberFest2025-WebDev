# 🎲 6-Die Game

A modern, multiplayer dice game built with React, TypeScript, and Socket.IO. Roll 6 dice and try to get all the same values in the fewest rolls possible!

![Game Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.1-black)

## 🎮 Game Overview

The 6-Die Game is an exciting multiplayer dice game where players compete to roll 6 dice and achieve the same value on all dice in the fewest number of rolls. The game features real-time multiplayer functionality, allowing multiple players to participate simultaneously.

## ✨ Features

### 🎯 Core Gameplay
- **6 Dice Rolling**: Roll 6 dice with values from 1-10
- **Win Condition**: Get all dice to show the same value
- **Score Tracking**: Keep track of your best score (fewest rolls to win)
- **Random Threshold**: After a random number of rolls, dice start showing the same value
- **Local Storage**: Your best score is saved locally

### 🌐 Multiplayer Features
- **Real-time Multiplayer**: Play with friends in real-time using Socket.IO
- **Turn-based System**: Players take turns rolling dice
- **Live Updates**: See other players' dice rolls instantly
- **Winner Declaration**: Automatic winner detection and announcement
- **Game Reset**: Reset the game for all players simultaneously

### 🎨 User Interface
- **Modern Design**: Beautiful gradient backgrounds and smooth animations
- **Responsive Layout**: Works on desktop and mobile devices
- **Interactive Elements**: Hover effects and smooth transitions
- **Visual Feedback**: Clear indication of game state and player actions

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or later)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/HacktoberFest2025-WebDev.git
   cd HacktoberFest2025-WebDev/6-die-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Start the backend server** (in a new terminal)
   ```bash
   node src/backend/server.js
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Production Build

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks
- **TypeScript 5.5.3** - Type-safe JavaScript
- **Vite 5.4.2** - Fast build tool and dev server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React 0.344.0** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.21.1** - Web framework
- **Socket.IO 4.8.1** - Real-time communication
- **CORS 2.8.5** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🎮 How to Play

1. **Start the Game**: Click "Start Game" to begin rolling dice
2. **Roll Dice**: Click "Roll Dice" to roll all 6 dice
3. **Check Results**: See if all dice show the same value
4. **Win Condition**: If all dice match, you win! If not, keep rolling
5. **Best Score**: Try to win in fewer rolls than your previous best
6. **Multiplayer**: Other players can join and play simultaneously

### Game Rules
- Roll 6 dice with values from 1-10
- Try to get all dice to show the same value
- The fewer rolls it takes, the better your score
- After a random number of rolls, dice will start showing the same value
- Your best score is saved locally

## 🌐 Multiplayer Functionality

### Socket.IO Integration

The game uses Socket.IO for real-time multiplayer functionality:

- **Connection**: Players automatically connect to the server
- **Dice Broadcasting**: All dice rolls are broadcast to all connected players
- **Winner Detection**: Server detects when a player wins and notifies everyone
- **Game Reset**: All players can reset the game simultaneously

### Server Features

The backend server (`src/backend/server.js`) provides:
- **Player Management**: Tracks connected players
- **Event Broadcasting**: Sends game events to all players
- **Winner Declaration**: Announces winners to all players
- **Game Reset**: Resets the game state for all players

## 📁 Project Structure

```
6-die-game/
├── src/
│   ├── App.tsx              # Main game component
│   ├── main.tsx             # React entry point
│   ├── index.css            # Global styles
│   └── backend/
│       └── server.js         # Socket.IO server
├── public/                   # Static assets
├── package.json             # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🤝 Contributing

We welcome contributions to improve the 6-Die Game! Here's how you can contribute:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Contribution Guidelines

- **Code Style**: Follow the existing code style and use TypeScript
- **Testing**: Test your changes in both single-player and multiplayer modes
- **Documentation**: Update documentation for new features
- **Commit Messages**: Use clear, descriptive commit messages

### Ideas for Contributions

- 🎨 **UI/UX Improvements**: Better animations, themes, responsive design
- 🎮 **Game Features**: New game modes, difficulty levels, achievements
- 🌐 **Multiplayer**: Room system, player names, chat functionality
- 📊 **Analytics**: Game statistics, leaderboards, player profiles
- 🔧 **Technical**: Performance optimizations, error handling, testing

## 🐛 Bug Reports

If you find a bug, please create an issue with:
- **Description**: Clear description of the bug
- **Steps to Reproduce**: How to reproduce the issue
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, and version information

## 📄 License

This project is part of the HacktoberFest 2025 WebDev repository and is open source.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Socket.IO Team** for real-time communication
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **Vite** for the fast development experience

## 📞 Support

If you need help or have questions:
- Create an issue in this repository
- Check the existing issues for solutions
- Join our community discussions

---

**Happy Rolling! 🎲**

*Made with ❤️ for HacktoberFest 2025*