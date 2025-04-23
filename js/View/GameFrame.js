/**
 * GameFrame class - Handles the game's user interface
 * This is a simplified version without actual UI implementation
 */
class GameFrame {
  /**
   * Create a new GameFrame
   * @param {number} width - The width of the game window
   * @param {number} height - The height of the game window
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    console.log(`Creating game window: ${width}x${height}`);
  }

  /**
   * Show the intro panel
   */
  introPanel() {
    console.log('Showing intro panel');
    // In a real implementation, this would display the intro UI
  }

  /**
   * Show the character selection panel
   */
  characterSelectPanel() {
    console.log('Showing character selection panel');
    // In a real implementation, this would display hero options
  }

  /**
   * Show the difficulty selection panel
   */
  difficultyPanel() {
    console.log('Showing difficulty selection panel');
    // In a real implementation, this would display difficulty options
  }

  /**
   * Show the map
   * @param {Maze} maze - The maze to display
   * @param {Hero} hero - The player's hero
   * @param {StringBuilder} travelLog - Log of player actions
   */
  showMap(maze, hero, travelLog) {
    console.log('Showing game map');
    // In a real implementation, this would render the maze and player location
  }

  /**
   * Show the inventory panel
   * @param {Hero} hero - The player's hero
   */
  inventoryPanel(hero) {
    console.log('Showing inventory panel');
    // In a real implementation, this would display the player's inventory
  }

  /**
   * Show the battle panel
   * @param {Hero} hero - The player's hero
   * @param {Character} defender - The enemy in battle
   * @param {StringBuilder} atkLog - Log of battle actions
   */
  battlePanel(hero, defender, atkLog) {
    console.log('Showing battle panel');
    // In a real implementation, this would display the battle UI
  }

  /**
   * Show the help panel
   */
  helpPanel() {
    console.log('Showing help panel');
    // In a real implementation, this would display game instructions
  }

  /**
   * Show the save/load panel
   * @param {boolean} isSaving - True if saving, false if loading
   */
  savePanel(isSaving) {
    console.log(`Showing ${isSaving ? 'save' : 'load'} panel`);
    // In a real implementation, this would display save/load options
  }

  /**
   * Show the death panel
   * @param {string} message - Death message to display
   */
  deathPanel(message) {
    console.log(`Game over: ${message}`);
    // In a real implementation, this would display the death screen
  }

  /**
   * Show the win panel
   */
  winPanel() {
    console.log('Congratulations! You won!');
    // In a real implementation, this would display the victory screen
  }
}

module.exports = GameFrame; 