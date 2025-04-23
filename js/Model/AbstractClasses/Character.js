/**
 * Character class - Base class for all characters in the game
 */
class Character {
  constructor() {
    this.myName = null;
    this.myHitPoints = 0;
    this.myMaxHealth = 0;
    this.myAttackSpeed = 0;
    this.myHitChance = 0;
    this.myMinDmg = 0;
    this.myMaxDmg = 0;
  }

  /**
   * Load character data from a database result
   * @param {Object} data - Character data object with properties matching the database fields
   */
  loadCharacter(data) {
    this.myName = data.NAME;
    this.myHitPoints = this.myMaxHealth = data.HP;
    this.myAttackSpeed = data.SPEED;
    this.myHitChance = data.HITCHANCE;
    this.myMinDmg = data.MINDMG;
    this.myMaxDmg = data.MAXDMG;
  }

  /**
   * Attack another character
   * @param {Character} theDefender - The character being attacked
   * @returns {string} - String describing the attack result
   */
  attack(theDefender) {
    // Random object for damage calculation
    const hit = Math.random() <= this.myHitChance ? 1 : 0;
    const result = hit * (Math.floor(Math.random() * (this.myMaxDmg - this.myMinDmg)) + this.myMinDmg);

    if (result !== 0) {
      return `${this.myName} Attacks! ${theDefender.damage(result)}`;
    } else {
      return `${this.myName} Missed...\n`;
    }
  }

  /**
   * Apply damage to this character - to be implemented by subclasses
   * @param {number} theDamage - Amount of damage to apply
   * @returns {string} - Description of damage result
   */
  damage(theDamage) {
    // This is an abstract method to be implemented by subclasses
    throw new Error("Method 'damage' must be implemented by subclasses.");
  }

  // Getters
  getMyName() {
    return this.myName;
  }

  getHealth() {
    return this.myHitPoints;
  }

  getMaxHealth() {
    return this.myMaxHealth;
  }

  getMyAttackSpeed() {
    return this.myAttackSpeed;
  }

  getMyHitChance() {
    return this.myHitChance;
  }

  getMyMinDmg() {
    return this.myMinDmg;
  }

  getMyMaxDmg() {
    return this.myMaxDmg;
  }

  // Setters
  setMyDmg(theMaxDmg, theMinDmg) {
    this.myMaxDmg = theMaxDmg;
    this.myMinDmg = theMinDmg;
  }

  setMyHitPoints(theHitPoints) {
    this.myHitPoints = theHitPoints;
  }

  setMyMaxHealth(theMax) {
    this.myMaxHealth = theMax;
  }

  setMyHitChance(theChance) {
    this.myHitChance = theChance;
  }
}

module.exports = Character; 