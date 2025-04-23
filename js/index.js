/**
 * Main entry point for the mOOn Quest game
 */
const GameController = require('./Controller/GameController');

// Initialize the game controller
try {
  const gameController = new GameController();
  // Game starts automatically when controller is initialized
} catch (error) {
  console.error('Error starting the game:', error);
} 