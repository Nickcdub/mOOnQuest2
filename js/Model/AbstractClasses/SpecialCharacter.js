const Character = require('./Character');

/**
 * SpecialCharacter class - Characters with ultimate abilities
 * @extends Character
 */
class SpecialCharacter extends Character {
  constructor() {
    super();
    this.myUltChance = 0;
  }

  /**
   * Load special character data from database result
   * @param {Object} data - Character data object with properties matching the database fields
   */
  loadSpecialCharacter(data) {
    super.loadCharacter(data);
    this.myUltChance = data.ULTCHANCE;
  }

  /**
   * Use ultimate ability against another character
   * @param {Character} theDefender - The character being targeted
   * @returns {string} - Description of the ultimate ability result
   */
  ultimate(theDefender) {
    // This is an abstract method to be implemented by subclasses
    throw new Error("Method 'ultimate' must be implemented by subclasses.");
  }

  // Getters and setters
  getMyUltChance() {
    return this.myUltChance;
  }

  setMyUltChance(theChance) {
    this.myUltChance = theChance;
  }
}

module.exports = SpecialCharacter; 