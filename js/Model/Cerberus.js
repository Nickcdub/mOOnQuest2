const Guardian = require('./AbstractClasses/Guardian');
const Blockable = require('./Interfaces/Blockable');

/**
 * Cerberus class - A guardian with blocking ability
 * @extends Guardian
 */
class Cerberus extends Guardian {
  /**
   * Create a new Cerberus
   * @param {Object} db - Database connection or mock database object
   */
  constructor(db) {
    super();
    this.myBlockChance = 0;
    this.loadCerberus(db);
  }

  /**
   * Load cerberus data from the database
   * @param {Object} db - Database connection or mock data
   */
  loadCerberus(db) {
    try {
      // Get Cerberus data
      const guardianData = db.getGuardianData('CERBERUS');
      this.loadGuardian(guardianData);
      
      // Borrow block chance from mender
      const menderData = db.getHeroData('MENDER');
      this.myBlockChance = menderData.BLOCKCHANCE;
    } catch (error) {
      console.error('Error loading Cerberus data:', error);
      // Load default stats
      this.loadDefaultStats();
    }
  }

  /**
   * Load default stats if database connection fails
   */
  loadDefaultStats() {
    // Default cerberus stats
    const defaultStats = {
      NAME: 'CERBERUS',
      HP: 280,
      SPEED: 3,
      HITCHANCE: 0.7,
      MINDMG: 30,
      MAXDMG: 50,
      ULTCHANCE: 0.4,
      PILLAR: 'ABSTRACTION'
    };
    
    this.loadGuardian(defaultStats);
    this.myBlockChance = 0.25; // Default block chance
  }

  /**
   * Use ultimate ability against another character
   * @param {Character} theDefender - The character being targeted
   * @returns {string} - Description of the ultimate ability result
   */
  ultimate(theDefender) {
    // If our random value is not within our chance range, do nothing, the hit misses
    if (Math.random() >= this.getMyUltChance()) {
      return `${this.getMyName()} Missed Multi-Bite...\n`;
    }
    
    // Calculate damage
    const result = Math.floor(Math.random() * (65 - 50)) + 50;
    return `Multi-Bite! ${theDefender.damage(result)}`;
  }

  /**
   * Apply damage to Cerberus with chance to block
   * @param {number} theDamage - Amount of damage to apply
   * @returns {string} - Description of damage result
   */
  damage(theDamage) {
    const result = this.block(theDamage);
    this.setMyHitPoints(this.getHealth() - result);
    
    return result === 0 
      ? `${this.getMyName()} blocked all incoming damage!\n` 
      : `${this.getMyName()} took ${theDamage} damage!\n`;
  }

  /**
   * Attempt to block damage
   * @param {number} theDamage - The damage to potentially block
   * @returns {number} - The amount of damage that gets through (0 if fully blocked)
   */
  block(theDamage) {
    return Math.random() <= this.myBlockChance ? 0 : theDamage;
  }

  /**
   * Get string representation of Cerberus
   * @returns {string} - Cerberus stats as string
   */
  toString() {
    return `GUARDIAN:${this.getMyName()} HP:${this.getHealth()}/${this.getMaxHealth()} SPEED:${this.getMyAttackSpeed()} ACCURACY:${this.getMyHitChance()} ULTCHANCE:${this.getMyUltChance()} BLOCKCHANCE: ${this.myBlockChance}`;
  }
}

module.exports = Cerberus; 