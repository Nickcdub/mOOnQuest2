const Hero = require('./AbstractClasses/Hero');
const Inventory = require('./Inventory');

/**
 * Knight class - A specific hero type with high defense
 * @extends Hero
 */
class Knight extends Hero {
  /**
   * Create a new Knight
   * @param {Object} db - Database connection or mock database object
   */
  constructor(db) {
    super();
    this.setInventory(new Inventory());
    this.loadKnight(db);
  }

  /**
   * Load knight data from the database
   * @param {Object} db - Database connection or mock data
   */
  loadKnight(db) {
    try {
      const heroData = db.getHeroData('KNIGHT');
      this.loadHero(heroData);
    } catch (error) {
      console.error('Error loading Knight data:', error);
      // Load default stats as fallback
      this.loadDefaultStats();
    }
  }

  /**
   * Load default stats if database connection fails
   */
  loadDefaultStats() {
    // Default knight stats
    const defaultStats = {
      NAME: 'KNIGHT',
      HP: 150,
      SPEED: 3,
      HITCHANCE: 0.7,
      MINDMG: 45,
      MAXDMG: 65,
      ULTCHANCE: 0.3,
      BLOCKCHANCE: 0.5
    };
    
    this.loadHero(defaultStats);
  }

  /**
   * Use ultimate ability against another character
   * @param {Character} theDefender - The character being targeted
   * @returns {string} - Description of the ultimate ability result
   */
  ultimate(theDefender) {
    if (Math.random() >= this.getMyUltChance()) {
      return `${this.getMyName()} Missed Crushing Blow...\n`;
    }
    
    // Calculate damage - Knights do high damage with their ultimate
    const damage = Math.floor(Math.random() * (80 - 60)) + 60;
    return `Crushing Blow! ${theDefender.damage(damage)}`;
  }
}

module.exports = Knight; 