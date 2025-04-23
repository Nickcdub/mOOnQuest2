const Hero = require('./AbstractClasses/Hero');
const Inventory = require('./Inventory');

/**
 * Mender class - A hero type with healing abilities
 * @extends Hero
 */
class Mender extends Hero {
  /**
   * Create a new Mender
   * @param {Object} db - Database connection or mock database object
   */
  constructor(db) {
    super();
    this.setInventory(new Inventory());
    this.loadMender(db);
  }

  /**
   * Load mender data from the database
   * @param {Object} db - Database connection or mock data
   */
  loadMender(db) {
    try {
      const heroData = db.getHeroData('MENDER');
      this.loadHero(heroData);
    } catch (error) {
      console.error('Error loading Mender data:', error);
      // Load default stats as fallback
      this.loadDefaultStats();
    }
  }

  /**
   * Load default stats if database connection fails
   */
  loadDefaultStats() {
    // Default mender stats
    const defaultStats = {
      NAME: 'MENDER',
      HP: 100,
      SPEED: 4,
      HITCHANCE: 0.75,
      MINDMG: 30,
      MAXDMG: 40,
      ULTCHANCE: 0.5,
      BLOCKCHANCE: 0.25
    };
    
    this.loadHero(defaultStats);
  }

  /**
   * Use ultimate ability - healing self instead of damaging enemy
   * @param {Character} theDefender - Not used for Mender's ultimate
   * @returns {string} - Description of the healing result
   */
  ultimate(theDefender) {
    if (Math.random() >= this.getMyUltChance()) {
      return `${this.getMyName()} Failed to cast Healing Light...\n`;
    }
    
    // Mender heals itself significantly with ultimate
    return `Healing Light! ${this.heal(70, 50)}`;
  }
}

module.exports = Mender; 