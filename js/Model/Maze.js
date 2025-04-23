const Monster = require('./Monster');
const MonsterType = require('./CharacterConstants/MonsterType');
const Cerberus = require('./Cerberus');
const Hydra = require('./Hydra');
const Moon_Demon = require('./Moon_Demon');
const RedDragon = require('./RedDragon');
const VisionPotion = require('./VisionPotion');
const HealthPotion = require('./HealthPotion');

/**
 * Maze class - Represents the game's maze
 */
class Maze {
  /**
   * Create a new Maze
   * @param {string} difficulty - Difficulty level (EASY, NORMAL, HARD)
   * @param {Hero} hero - The player's hero
   * @param {Object} db - Database connection or mock database object
   */
  constructor(difficulty, hero, db) {
    this.myMaze = [];
    this.myHeroLocation = [0, 0]; // Starting position
    this.myDifficulty = difficulty;
    this.myHero = hero;
    this.myEnemy = null;
    this.myBoss = null;
    this.myDb = db;
    
    // Initialize the maze
    this.initializeMaze();
    
    console.log(`Created ${difficulty} maze for ${hero.getMyName()}`);
  }

  /**
   * Initialize the maze structure
   * This is a simplified placeholder implementation
   */
  initializeMaze() {
    // In the real implementation, this would generate the maze structure
    // For now, we'll just create a simple grid
    const size = this.getDifficultySize();
    
    // Create empty maze grid
    for (let i = 0; i < size; i++) {
      this.myMaze[i] = [];
      for (let j = 0; j < size; j++) {
        this.myMaze[i][j] = {
          north: Math.random() > 0.3,
          south: Math.random() > 0.3,
          east: Math.random() > 0.3,
          west: Math.random() > 0.3,
          visited: false,
          monster: Math.random() > 0.8,
          item: Math.random() > 0.9,
          pillar: false
        };
      }
    }
    
    // Place entrance at [0,0]
    this.myMaze[0][0].visited = true;
    
    // Place exit at opposite corner
    this.myMaze[size-1][size-1].exit = true;
    
    // Place pillars
    this.placePillars();
  }

  /**
   * Get the maze size based on difficulty
   * @returns {number} - Size of the maze
   */
  getDifficultySize() {
    switch (this.myDifficulty) {
      case 'EASY':
        return 5;
      case 'NORMAL':
        return 8;
      case 'HARD':
        return 12;
      default:
        return 8;
    }
  }

  /**
   * Place the four pillars in the maze
   */
  placePillars() {
    const size = this.getDifficultySize();
    
    // Place pillars at fixed positions for simplicity
    // In a real implementation, these would be placed randomly
    this.myMaze[1][size-2].pillar = 'ABSTRACTION';
    this.myMaze[size-2][1].pillar = 'ENCAPSULATION';
    this.myMaze[size-2][size-2].pillar = 'INHERITANCE';
    this.myMaze[Math.floor(size/2)][Math.floor(size/2)].pillar = 'POLYMORPHISM';
  }

  /**
   * Move the hero in the specified direction
   * @param {string} direction - The direction to move (NORTH, SOUTH, EAST, WEST)
   * @returns {string} - Description of the movement result
   */
  move(direction) {
    // In a real implementation, this would check walls and update position
    console.log(`Moving ${direction}`);
    
    // Simple implementation just to demonstrate functionality
    const [row, col] = this.myHeroLocation;
    let newRow = row;
    let newCol = col;
    
    switch (direction) {
      case 'NORTH':
        if (row > 0 && this.myMaze[row][col].north) newRow--;
        break;
      case 'SOUTH':
        if (row < this.getDifficultySize() - 1 && this.myMaze[row][col].south) newRow++;
        break;
      case 'EAST':
        if (col < this.getDifficultySize() - 1 && this.myMaze[row][col].east) newCol++;
        break;
      case 'WEST':
        if (col > 0 && this.myMaze[row][col].west) newCol--;
        break;
    }
    
    // If we actually moved
    if (newRow !== row || newCol !== col) {
      this.myHeroLocation = [newRow, newCol];
      this.myMaze[newRow][newCol].visited = true;
      
      // Check for items, monsters, etc.
      return this.checkRoom();
    }
    
    return `Cannot move ${direction}`;
  }

  /**
   * Check the current room for events
   * @returns {string} - Description of what was found in the room
   */
  checkRoom() {
    const [row, col] = this.myHeroLocation;
    const cell = this.myMaze[row][col];
    
    // Check for items
    if (cell.item) {
      cell.item = false; // Remove item
      
      // 50% chance of health or vision potion
      if (Math.random() > 0.5) {
        this.myHero.getInventory().addItem(new HealthPotion());
        return 'You found a Health Potion!';
      } else {
        this.myHero.getInventory().addItem(new VisionPotion());
        return 'You found a Vision Potion!';
      }
    }
    
    // Check for monsters
    if (cell.monster) {
      cell.monster = false; // Remove monster
      
      // Create a random monster
      const monsterType = Math.random() > 0.66 ? MonsterType.OGRE : 
                        Math.random() > 0.5 ? MonsterType.GOBLIN : 
                        MonsterType.DIREWOLF;
                        
      this.myEnemy = new Monster(monsterType, this.myDb);
      return `A ${this.myEnemy.getMyName()} appears!`;
    }
    
    // Check for pillar/boss
    if (cell.pillar) {
      const pillarName = cell.pillar;
      cell.pillar = false; // Remove pillar
      
      // Create the appropriate guardian
      switch (pillarName) {
        case 'ABSTRACTION':
          this.myBoss = new Cerberus(this.myDb);
          break;
        case 'ENCAPSULATION':
          this.myBoss = new Moon_Demon(this.myDb);
          break;
        case 'INHERITANCE':
          this.myBoss = new RedDragon(this.myDb);
          break;
        case 'POLYMORPHISM':
          this.myBoss = new Hydra(this.myDb);
          break;
      }
      
      return `You found the ${pillarName} Pillar, but it's guarded by ${this.myBoss.getMyName()}!`;
    }
    
    // Check for exit
    if (cell.exit && this.myHero.getPillarCount() === 4) {
      return 'You found the exit! You can escape now that you have all four pillars.';
    }
    
    return 'You entered an empty room.';
  }

  /**
   * Get the current monster
   * @returns {Monster} - The current monster or null
   */
  getEnemy() {
    return this.myEnemy;
  }

  /**
   * Get the current boss
   * @returns {Guardian} - The current boss or null
   */
  getBoss() {
    return this.myBoss;
  }

  /**
   * Remove the current monster
   * @returns {Monster} - The removed monster
   */
  popEnemy() {
    const enemy = this.myEnemy;
    this.myEnemy = null;
    return enemy;
  }

  /**
   * Remove the current boss
   * @returns {Guardian} - The removed boss
   */
  popBoss() {
    const boss = this.myBoss;
    this.myBoss = null;
    return boss;
  }

  /**
   * Get the hero's current location
   * @returns {number[]} - [row, col] coordinates
   */
  getHeroLocation() {
    return this.myHeroLocation;
  }

  /**
   * Get the current room the hero is in
   * @returns {Object} - Room object with properties for exits, items, etc.
   */
  getCurrentRoom() {
    const [row, col] = this.myHeroLocation;
    return this.myMaze[row][col];
  }

  /**
   * Reveal the area around the hero (for vision potion)
   * @returns {string} - Description of what was revealed
   */
  revealArea() {
    // In a real implementation, this would mark surrounding cells as visible
    return 'The vision potion reveals the surrounding area!';
  }
}

module.exports = Maze; 