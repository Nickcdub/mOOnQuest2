const SpecialCharacter = require('./SpecialCharacter');

/**
 * Guardian class - Special characters that guard pillars
 * @extends SpecialCharacter
 */
class Guardian extends SpecialCharacter {
  constructor() {
    super();
    this.myPillar = '';
  }

  /**
   * Apply damage to this guardian
   * @param {number} theDamage - Amount of damage to apply
   * @returns {string} - Description of damage result
   */
  damage(theDamage) {
    this.setMyHitPoints(this.getHealth() - theDamage);
    return `${this.getMyName()} took ${theDamage} damage.\n`;
  }

  /**
   * Load guardian data from database result
   * @param {Object} data - Guardian data object
   */
  loadGuardian(data) {
    super.loadSpecialCharacter(data);
    this.myPillar = data.PILLAR;
  }

  /**
   * Get the pillar guarded by this guardian
   * @returns {string} - The pillar name
   */
  getPillar() {
    return this.myPillar;
  }

  /**
   * Get string representation of the guardian
   * @returns {string} - Guardian stats as string
   */
  toString() {
    return `GUARDIAN:${this.getMyName()} HP:${this.getHealth()}/${this.getMaxHealth()} SPEED:${this.getMyAttackSpeed()} ACCURACY:${this.getMyHitChance()} ULTCHANCE:${this.getMyUltChance()}`;
  }
}

module.exports = Guardian; 