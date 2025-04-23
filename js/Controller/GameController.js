const Assassin = require('../Model/Assassin');
const Knight = require('../Model/Knight');
const Mender = require('../Model/Mender');
const Maze = require('../Model/Maze');
const GameFrame = require('../View/GameFrame');
const readline = require('readline');

/**
 * GameController class - Controls the game flow and logic
 */
class GameController {
  /**
   * Create a new GameController
   */
  constructor() {
    // Game state
    this.myHero = null;
    this.myMaze = null;
    this.myFrame = null;
    
    // Create readline interface for user input
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    // For serialization
    this.myDb = this.initializeDatabase();
    
    // Start the game at the intro screen
    this.intro();
  }

  /**
   * Initialize the database connection or mock database for testing
   * @returns {Object} - Database connection or mock
   */
  initializeDatabase() {
    // In a real implementation, this would connect to a database
    // For now, we'll return a mock database object with predefined data
    return {
      getHeroData: (heroName) => {
        const heroData = {
          ASSASSIN: {
            NAME: 'ASSASSIN',
            HP: 75,
            SPEED: 6,
            HITCHANCE: 0.8,
            MINDMG: 35,
            MAXDMG: 50,
            ULTCHANCE: 0.4,
            BLOCKCHANCE: 0.3
          },
          KNIGHT: {
            NAME: 'KNIGHT',
            HP: 150,
            SPEED: 3,
            HITCHANCE: 0.7,
            MINDMG: 45,
            MAXDMG: 65,
            ULTCHANCE: 0.3,
            BLOCKCHANCE: 0.5
          },
          MENDER: {
            NAME: 'MENDER',
            HP: 100,
            SPEED: 4,
            HITCHANCE: 0.75,
            MINDMG: 30,
            MAXDMG: 40,
            ULTCHANCE: 0.5,
            BLOCKCHANCE: 0.25
          }
        };
        return heroData[heroName];
      },
      getMonsterData: (monsterName) => {
        const monsterData = {
          OGRE: {
            NAME: 'OGRE',
            HP: 200,
            SPEED: 3,
            HITCHANCE: 0.7,
            MINDMG: 30,
            MAXDMG: 60,
            HEALCHANCE: 0.2,
            REGENERATION: 15
          },
          GOBLIN: {
            NAME: 'GOBLIN',
            HP: 70,
            SPEED: 5,
            HITCHANCE: 0.8,
            MINDMG: 20,
            MAXDMG: 35,
            HEALCHANCE: 0.3,
            REGENERATION: 10
          },
          DIREWOLF: {
            NAME: 'DIREWOLF',
            HP: 120,
            SPEED: 4,
            HITCHANCE: 0.75,
            MINDMG: 25,
            MAXDMG: 45,
            HEALCHANCE: 0.25,
            REGENERATION: 12
          }
        };
        return monsterData[monsterName];
      },
      getGuardianData: (guardianName) => {
        const guardianData = {
          CERBERUS: {
            NAME: 'CERBERUS',
            HP: 280,
            SPEED: 3,
            HITCHANCE: 0.7,
            MINDMG: 30,
            MAXDMG: 50,
            ULTCHANCE: 0.4,
            PILLAR: 'ABSTRACTION'
          },
          HYDRA: {
            NAME: 'HYDRA',
            HP: 250,
            SPEED: 4,
            HITCHANCE: 0.75,
            MINDMG: 35,
            MAXDMG: 55,
            ULTCHANCE: 0.5,
            PILLAR: 'POLYMORPHISM'
          },
          MOON_DEMON: {
            NAME: 'MOON_DEMON',
            HP: 300,
            SPEED: 2,
            HITCHANCE: 0.8,
            MINDMG: 40,
            MAXDMG: 60,
            ULTCHANCE: 0.3,
            PILLAR: 'ENCAPSULATION'
          },
          RED_DRAGON: {
            NAME: 'RED_DRAGON',
            HP: 320,
            SPEED: 3,
            HITCHANCE: 0.7,
            MINDMG: 45,
            MAXDMG: 65,
            ULTCHANCE: 0.4,
            PILLAR: 'INHERITANCE'
          }
        };
        return guardianData[guardianName];
      }
    };
  }

  /**
   * Show the intro screen
   */
  intro() {
    // Reset game state
    this.myHero = null;
    this.myMaze = null;
    
    // Create game frame if it doesn't exist
    if (!this.myFrame) {
      this.myFrame = new GameFrame(1000, 1000);
      console.log('Game started! Welcome to mOOn Quest!');
      console.log('---------------------------------');
    }
    
    console.log('MAIN MENU:');
    console.log('1. New Game');
    console.log('2. Load Game');
    console.log('3. Help');
    console.log('4. Exit');
    
    this.rl.question('Select an option (1-4): ', (answer) => {
      switch (answer) {
        case '1':
          this.characterSelect();
          break;
        case '2':
          console.log('Load game feature not implemented yet.');
          this.intro();
          break;
        case '3':
          this.showHelp();
          break;
        case '4':
          console.log('Thanks for playing mOOn Quest!');
          this.rl.close();
          break;
        default:
          console.log('Invalid option. Please try again.');
          this.intro();
      }
    });
  }

  /**
   * Show help information
   */
  showHelp() {
    console.log('\nHELP:');
    console.log('mOOn Quest is a dungeon crawler game where you battle monsters and collect pillars.');
    console.log('- Choose a hero with unique abilities');
    console.log('- Navigate through the maze using directional commands');
    console.log('- Collect items and defeat guardians to retrieve the four pillars');
    console.log('- Return to the entrance with all pillars to win\n');
    
    this.rl.question('Press Enter to return to main menu...', () => {
      this.intro();
    });
  }

  /**
   * Show the character select screen
   */
  characterSelect() {
    console.log('\nCHARACTER SELECTION:');
    console.log('1. Assassin - Fast with high attack speed and moderate damage');
    console.log('2. Knight - Tanky with high defense and high damage');
    console.log('3. Mender - Balanced with healing abilities');
    console.log('4. Back to main menu');
    
    this.rl.question('Select your hero (1-4): ', (answer) => {
      switch (answer) {
        case '1':
          this.myHero = new Assassin(this.myDb);
          console.log(`You selected the Assassin!`);
          this.difficultySelect();
          break;
        case '2':
          this.myHero = new Knight(this.myDb);
          console.log(`You selected the Knight!`);
          this.difficultySelect();
          break;
        case '3':
          this.myHero = new Mender(this.myDb);
          console.log(`You selected the Mender!`);
          this.difficultySelect();
          break;
        case '4':
          this.intro();
          break;
        default:
          console.log('Invalid option. Please try again.');
          this.characterSelect();
      }
    });
  }

  /**
   * Show the difficulty select screen
   */
  difficultySelect() {
    console.log('\nDIFFICULTY SELECTION:');
    console.log('1. Easy - 5x5 maze, weaker monsters');
    console.log('2. Normal - 8x8 maze, balanced monsters');
    console.log('3. Hard - 12x12 maze, stronger monsters');
    console.log('4. Back to character selection');
    
    this.rl.question('Select difficulty (1-4): ', (answer) => {
      switch (answer) {
        case '1':
          this.myMaze = new Maze('EASY', this.myHero, this.myDb);
          console.log(`You selected Easy difficulty!`);
          this.traverse();
          break;
        case '2':
          this.myMaze = new Maze('NORMAL', this.myHero, this.myDb);
          console.log(`You selected Normal difficulty!`);
          this.traverse();
          break;
        case '3':
          this.myMaze = new Maze('HARD', this.myHero, this.myDb);
          console.log(`You selected Hard difficulty!`);
          this.traverse();
          break;
        case '4':
          this.characterSelect();
          break;
        default:
          console.log('Invalid option. Please try again.');
          this.difficultySelect();
      }
    });
  }

  /**
   * Handle game traversal/movement
   */
  traverse() {
    console.log('\nMAZE:');
    console.log(`Hero: ${this.myHero.getMyName()} | HP: ${this.myHero.getHealth()}/${this.myHero.getMaxHealth()} | Pillars: ${this.myHero.getPillarCount()}/4`);
    
    const [row, col] = this.myMaze.getHeroLocation();
    console.log(`Location: [${row}, ${col}]`);
    console.log('Available exits:');
    
    const currentRoom = this.myMaze.getCurrentRoom();
    let availableDirections = [];
    
    if (currentRoom.north) {
      console.log('- North (n)');
      availableDirections.push('n');
    }
    if (currentRoom.south) {
      console.log('- South (s)');
      availableDirections.push('s');
    }
    if (currentRoom.east) {
      console.log('- East (e)');
      availableDirections.push('e');
    }
    if (currentRoom.west) {
      console.log('- West (w)');
      availableDirections.push('w');
    }
    
    console.log('\nACTIONS:');
    console.log('- Move: n, s, e, w');
    console.log('- Inventory (i)');
    console.log('- Help (h)');
    console.log('- Quit (q)');
    
    this.rl.question('What would you like to do? ', (answer) => {
      switch (answer.toLowerCase()) {
        case 'n':
          if (availableDirections.includes('n')) {
            const result = this.myMaze.move('NORTH');
            console.log(result);
            this.checkForEvents();
          } else {
            console.log('You cannot move North from here.');
            this.traverse();
          }
          break;
        case 's':
          if (availableDirections.includes('s')) {
            const result = this.myMaze.move('SOUTH');
            console.log(result);
            this.checkForEvents();
          } else {
            console.log('You cannot move South from here.');
            this.traverse();
          }
          break;
        case 'e':
          if (availableDirections.includes('e')) {
            const result = this.myMaze.move('EAST');
            console.log(result);
            this.checkForEvents();
          } else {
            console.log('You cannot move East from here.');
            this.traverse();
          }
          break;
        case 'w':
          if (availableDirections.includes('w')) {
            const result = this.myMaze.move('WEST');
            console.log(result);
            this.checkForEvents();
          } else {
            console.log('You cannot move West from here.');
            this.traverse();
          }
          break;
        case 'i':
          this.showInventory();
          break;
        case 'h':
          this.showGameHelp();
          break;
        case 'q':
          this.confirmQuit();
          break;
        default:
          console.log('Invalid command. Try again.');
          this.traverse();
      }
    });
  }

  /**
   * Show inventory and allow using items
   */
  showInventory() {
    console.log('\nINVENTORY:');
    console.log(this.myHero.getInventory().toString());
    
    const healthPotions = this.myHero.getInventory().getItem('Health Potion');
    const visionPotions = this.myHero.getInventory().getItem('Vision Potion');
    
    console.log('\nACTIONS:');
    if (healthPotions > 0) console.log('1. Use Health Potion');
    if (visionPotions > 0) console.log('2. Use Vision Potion');
    console.log('3. Back to game');
    
    this.rl.question('What would you like to do? ', (answer) => {
      switch (answer) {
        case '1':
          if (healthPotions > 0) {
            const healthPotion = new (require('../Model/HealthPotion'))();
            console.log(healthPotion.useEffect(this.myHero));
            this.myHero.getInventory().removeItem('Health Potion');
            this.showInventory();
          } else {
            console.log('You don\'t have any Health Potions.');
            this.showInventory();
          }
          break;
        case '2':
          if (visionPotions > 0) {
            const visionPotion = new (require('../Model/VisionPotion'))();
            console.log(visionPotion.useEffect(this.myMaze));
            this.myHero.getInventory().removeItem('Vision Potion');
            this.showInventory();
          } else {
            console.log('You don\'t have any Vision Potions.');
            this.showInventory();
          }
          break;
        case '3':
          this.traverse();
          break;
        default:
          console.log('Invalid option. Please try again.');
          this.showInventory();
      }
    });
  }

  /**
   * Show in-game help
   */
  showGameHelp() {
    console.log('\nGAME HELP:');
    console.log('- Move around using n (north), s (south), e (east), w (west)');
    console.log('- Use i to access your inventory and use items');
    console.log('- Collect the four pillars guarded by powerful bosses');
    console.log('- Return to the entrance with all pillars to win');
    console.log('- Use q to quit the game');
    
    this.rl.question('Press Enter to return to the game...', () => {
      this.traverse();
    });
  }

  /**
   * Confirm before quitting
   */
  confirmQuit() {
    this.rl.question('Are you sure you want to quit? Progress will be lost. (y/n): ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        console.log('Thanks for playing mOOn Quest!');
        this.rl.close();
      } else {
        this.traverse();
      }
    });
  }

  /**
   * Check for events after moving
   */
  checkForEvents() {
    // Check for death
    if (this.myHero.getHealth() <= 0) {
      this.death("You have been defeated!");
      return;
    }
    
    // Check for monsters
    if (this.myMaze.getEnemy() !== null) {
      this.battle(this.myMaze.getEnemy(), false);
      return;
    }
    
    // Check for bosses
    if (this.myMaze.getBoss() !== null) {
      this.battle(this.myMaze.getBoss(), true);
      return;
    }
    
    // Check for win condition
    if (this.myHero.getPillarCount() === 4) {
      const [row, col] = this.myMaze.getHeroLocation();
      if (row === 0 && col === 0) {
        this.win();
        return;
      }
    }
    
    // Continue traversal
    this.traverse();
  }

  /**
   * Handle battles with monsters and guardians
   * @param {Character} enemy - The enemy to battle
   * @param {boolean} isBoss - Whether this is a boss battle
   */
  battle(enemy, isBoss) {
    console.log('\nBATTLE:');
    console.log(`${this.myHero.getMyName()} (HP: ${this.myHero.getHealth()}/${this.myHero.getMaxHealth()}) vs ${enemy.getMyName()} (HP: ${enemy.getHealth()}/${enemy.getMaxHealth()})`);
    
    console.log('\nACTIONS:');
    console.log('1. Attack');
    console.log('2. Use Ultimate Ability');
    console.log('3. Access Inventory');
    console.log('4. Run Away (not available for boss battles)');
    
    this.rl.question('What would you like to do? ', (answer) => {
      switch (answer) {
        case '1':
          console.log(this.myHero.attack(enemy));
          if (enemy.getHealth() <= 0) {
            console.log(`You defeated the ${enemy.getMyName()}!`);
            if (isBoss) {
              this.myHero.addPillar();
              console.log(`You collected a pillar! (${this.myHero.getPillarCount()}/4)`);
              this.myMaze.popBoss();
            } else {
              this.myMaze.popEnemy();
            }
            this.traverse();
          } else {
            console.log(enemy.attack(this.myHero));
            if (this.myHero.getHealth() <= 0) {
              this.death(`You were defeated by the ${enemy.getMyName()}!`);
            } else {
              this.battle(enemy, isBoss);
            }
          }
          break;
        case '2':
          console.log(this.myHero.ultimate(enemy));
          if (enemy.getHealth() <= 0) {
            console.log(`You defeated the ${enemy.getMyName()}!`);
            if (isBoss) {
              this.myHero.addPillar();
              console.log(`You collected a pillar! (${this.myHero.getPillarCount()}/4)`);
              this.myMaze.popBoss();
            } else {
              this.myMaze.popEnemy();
            }
            this.traverse();
          } else {
            console.log(enemy.attack(this.myHero));
            if (this.myHero.getHealth() <= 0) {
              this.death(`You were defeated by the ${enemy.getMyName()}!`);
            } else {
              this.battle(enemy, isBoss);
            }
          }
          break;
        case '3':
          this.battleInventory(enemy, isBoss);
          break;
        case '4':
          if (isBoss) {
            console.log('You cannot run from a boss battle!');
            this.battle(enemy, isBoss);
          } else {
            console.log('You managed to escape!');
            this.myMaze.popEnemy();
            this.traverse();
          }
          break;
        default:
          console.log('Invalid option. Please try again.');
          this.battle(enemy, isBoss);
      }
    });
  }

  /**
   * Show inventory during battle
   * @param {Character} enemy - The enemy in battle
   * @param {boolean} isBoss - Whether this is a boss battle
   */
  battleInventory(enemy, isBoss) {
    console.log('\nBATTLE INVENTORY:');
    console.log(this.myHero.getInventory().toString());
    
    const healthPotions = this.myHero.getInventory().getItem('Health Potion');
    
    console.log('\nACTIONS:');
    if (healthPotions > 0) console.log('1. Use Health Potion');
    console.log('2. Back to battle');
    
    this.rl.question('What would you like to do? ', (answer) => {
      switch (answer) {
        case '1':
          if (healthPotions > 0) {
            const healthPotion = new (require('../Model/HealthPotion'))();
            console.log(healthPotion.useEffect(this.myHero));
            this.myHero.getInventory().removeItem('Health Potion');
            this.battle(enemy, isBoss);
          } else {
            console.log('You don\'t have any Health Potions.');
            this.battleInventory(enemy, isBoss);
          }
          break;
        case '2':
          this.battle(enemy, isBoss);
          break;
        default:
          console.log('Invalid option. Please try again.');
          this.battleInventory(enemy, isBoss);
      }
    });
  }

  /**
   * Handle player death
   * @param {string} message - Death message
   */
  death(message) {
    console.log('\nGAME OVER');
    console.log(message);
    
    this.rl.question('Press Enter to return to main menu...', () => {
      this.intro();
    });
  }

  /**
   * Handle player victory
   */
  win() {
    console.log('\nVICTORY!');
    console.log('Congratulations! You have collected all four pillars and escaped the dungeon!');
    console.log(`You completed the game with the ${this.myHero.getMyName()} on ${this.myMaze.myDifficulty} difficulty.`);
    
    this.rl.question('Press Enter to return to main menu...', () => {
      this.intro();
    });
  }
}

module.exports = GameController; 