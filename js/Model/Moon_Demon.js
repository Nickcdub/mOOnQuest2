const Guardian = require('./AbstractClasses/Guardian');

/**
 * Moon_Demon class - A guardian of the Encapsulation pillar
 * @extends Guardian
 */
class Moon_Demon extends Guardian {
  /**
   * Create a new Moon_Demon
   * @param {Object} db - Database connection or mock database object
   */
  constructor(db) {
    super();
    this.loadMoonDemon(db);
  }

  /**
   * Load moon demon data from the database
   * @param {Object} db - Database connection or mock data
   */
  loadMoonDemon(db) {
    try {
      const guardianData = db.getGuardianData('MOON_DEMON');
      this.loadGuardian(guardianData);
    } catch (error) {
      console.error('Error loading Moon Demon data:', error);
      // Load default stats
      this.loadDefaultStats();
    }
  }

  /**
   * Load default stats if database connection fails
   */
  loadDefaultStats() {
    // Default moon demon stats
    const defaultStats = {
      NAME: 'MOON_DEMON',
      HP: 300,
      SPEED: 2,
      HITCHANCE: 0.8,
      MINDMG: 40,
      MAXDMG: 60,
      ULTCHANCE: 0.3,
      PILLAR: 'ENCAPSULATION'
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
      return `${this.getMyName()} Failed to cast Lunar Fury...\n`;
    }
    
    // Calculate damage - Moon Demon has high damage output
    const damage = Math.floor(Math.random() * (90 - 70)) + 70;
    return `Lunar Fury! ${theDefender.damage(damage)}`;
  }
}

module.exports = Moon_Demon; 