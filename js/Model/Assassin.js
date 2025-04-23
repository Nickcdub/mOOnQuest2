const Hero = require('./AbstractClasses/Hero');
const Inventory = require('./Inventory');

/**
 * Assassin class - A specific hero type
 * @extends Hero
 */
class Assassin extends Hero {
  /**
   * Create a new Assassin
   * @param {Object} db - Database connection or mock database object
   */
  constructor(db) {
    super();
    this.setInventory(new Inventory());
    this.loadAssassin(db);
  }

  /**
   * Load assassin data from the database
   * @param {Object} db - Database connection or mock data
   */
  loadAssassin(db) {
    // In JavaScript, we'll assume db is either:
    // 1. A real database connection with a query method
    // 2. A mock object with predefined data for testing
    
    try {
      // This could be an async function with await if needed
      const heroData = db.getHeroData('ASSASSIN');
      this.loadHero(heroData);
    } catch (error) {
      console.error('Error loading Assassin data:', error);
      // Load default stats as fallback
      this.loadDefaultStats();
    }
  }

  /**
   * Load default stats if database connection fails
   */
  loadDefaultStats() {
    // Default assassin stats
    const defaultStats = {
      NAME: 'ASSASSIN',
      HP: 75,
      SPEED: 6,
      HITCHANCE: 0.8,
      MINDMG: 35,
      MAXDMG: 50,
      ULTCHANCE: 0.4,
      BLOCKCHANCE: 0.3
    };
    
    this.loadHero(defaultStats);
  }

  /**
   * Use ultimate ability against another character
   * @param {Character} theDefender - The character being targeted
   * @returns {string} - Description of the ultimate ability result
   */
  ultimate(theDefender) {
    let hitCount = 0;
    let result;

    if (Math.random() < this.getMyUltChance()) hitCount++;
    if (Math.random() < this.getMyUltChance()) hitCount++;

    // Calculate damage
    const calculateDamage = () => {
      return Math.floor(Math.random() * (this.getMyMaxDmg() - this.getMyMinDmg())) + this.getMyMinDmg();
    };

    switch (hitCount) {
      case 0:
        result = `${this.getMyName()} Missed Rhythm Echo...\n`; // failed
        break;
      case 1:
        result = `Partial Success: Single Hit!\n${theDefender.damage(calculateDamage())}`; // partial success
        break;
      case 2:
        result = `Complete Success: Double Hit!\n${theDefender.damage(calculateDamage())}${theDefender.damage(calculateDamage())}`; // complete success
        break;
      default:
        throw new Error(`HitCount should be >=2, hitCount: ${hitCount}`);
    }
    
    return result;
  }
}

module.exports = Assassin; 