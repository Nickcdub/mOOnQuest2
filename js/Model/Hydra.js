const Guardian = require('./AbstractClasses/Guardian');

/**
 * Hydra class - A guardian of the Polymorphism pillar
 * @extends Guardian
 */
class Hydra extends Guardian {
  /**
   * Create a new Hydra
   * @param {Object} db - Database connection or mock database object
   */
  constructor(db) {
    super();
    this.loadHydra(db);
  }

  /**
   * Load hydra data from the database
   * @param {Object} db - Database connection or mock data
   */
  loadHydra(db) {
    try {
      const guardianData = db.getGuardianData('HYDRA');
      this.loadGuardian(guardianData);
    } catch (error) {
      console.error('Error loading Hydra data:', error);
      // Load default stats
      this.loadDefaultStats();
    }
  }

  /**
   * Load default stats if database connection fails
   */
  loadDefaultStats() {
    // Default hydra stats
    const defaultStats = {
      NAME: 'HYDRA',
      HP: 250,
      SPEED: 4,
      HITCHANCE: 0.75,
      MINDMG: 35,
      MAXDMG: 55,
      ULTCHANCE: 0.5,
      PILLAR: 'POLYMORPHISM'
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
      return `${this.getMyName()} Missed Multi-Head Strike...\n`;
    }
    
    // Calculate multiple hits
    let result = "Multi-Head Strike!\n";
    const hitCount = Math.floor(Math.random() * 3) + 1; // 1-3 hits
    
    for (let i = 0; i < hitCount; i++) {
      const damage = Math.floor(Math.random() * (this.getMyMaxDmg() - this.getMyMinDmg())) + this.getMyMinDmg();
      result += theDefender.damage(damage);
    }
    
    return result;
  }
}

module.exports = Hydra; 