const Guardian = require('./AbstractClasses/Guardian');

/**
 * RedDragon class - A guardian of the Inheritance pillar
 * @extends Guardian
 */
class RedDragon extends Guardian {
  /**
   * Create a new RedDragon
   * @param {Object} db - Database connection or mock database object
   */
  constructor(db) {
    super();
    this.loadRedDragon(db);
  }

  /**
   * Load red dragon data from the database
   * @param {Object} db - Database connection or mock data
   */
  loadRedDragon(db) {
    try {
      const guardianData = db.getGuardianData('RED_DRAGON');
      this.loadGuardian(guardianData);
    } catch (error) {
      console.error('Error loading Red Dragon data:', error);
      // Load default stats
      this.loadDefaultStats();
    }
  }

  /**
   * Load default stats if database connection fails
   */
  loadDefaultStats() {
    // Default red dragon stats
    const defaultStats = {
      NAME: 'RED_DRAGON',
      HP: 320,
      SPEED: 3,
      HITCHANCE: 0.7,
      MINDMG: 45,
      MAXDMG: 65,
      ULTCHANCE: 0.4,
      PILLAR: 'INHERITANCE'
    };
    
    this.loadGuardian(defaultStats);
  }

  /**
   * Use ultimate ability against another character
   * @param {Character} theDefender - The character being targeted
   * @returns {string} - Description of the ultimate ability result
   */
  ultimate(theDefender) {
    if (Math.random() >= this.getMyUltChance()) {
      return `${this.getMyName()} Failed to use Dragon Breath...\n`;
    }
    
    // Calculate damage - Red Dragon has very high damage with ultimate
    const damage = Math.floor(Math.random() * (100 - 80)) + 80;
    return `Dragon Breath! ${theDefender.damage(damage)}`;
  }
}

module.exports = RedDragon; 