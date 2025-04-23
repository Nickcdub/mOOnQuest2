const SpecialCharacter = require('./SpecialCharacter');
const Blockable = require('../Interfaces/Blockable');

/**
 * Hero class - Base class for all playable heroes
 * @extends SpecialCharacter
 */
class Hero extends SpecialCharacter {
  constructor() {
    super();
    this.INVENTORY = null; // Will be initialized after we convert Inventory class
    this.myBlockChance = 0;
    this.myPillarCount = 0;
  }

  /**
   * Initialize the inventory
   * @param {Inventory} inventory - The inventory instance
   */
  setInventory(inventory) {
    this.INVENTORY = inventory;
  }

  /**
   * Apply damage to this hero with chance to block
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
   * Apply trap damage to this hero
   * @param {number} theDamage - Amount of damage from the trap
   * @returns {string} - Description of the trap damage
   */
  trap(theDamage) {
    this.setMyHitPoints(this.getHealth() - theDamage);
    return `${this.getMyName()} was ensnared by a trap and took ${theDamage} damage!`;
  }

  /**
   * Heal the hero
   * @param {number} theMax - Maximum heal amount
   * @param {number} theMin - Minimum heal amount
   * @returns {string} - Description of healing result
   */
  heal(theMax, theMin) {
    const result = Math.floor(Math.random() * (theMax - theMin)) + theMin;
    this.setMyHitPoints(Math.min(this.getHealth() + result, this.getMaxHealth()));
    
    return this.getHealth() === this.getMaxHealth() 
      ? `${this.getMyName()} healed to Max Health!\n` 
      : `${this.getMyName()} healed for ${result} HP!\n`;
  }

  /**
   * Load hero data from database result
   * @param {Object} data - Hero data object
   */
  loadHero(data) {
    super.loadSpecialCharacter(data);
    this.myBlockChance = data.BLOCKCHANCE;
  }

  /**
   * Add a pillar to the hero's collection
   */
  addPillar() {
    this.myPillarCount++;
  }

  /**
   * Get the number of pillars collected
   * @returns {number} - Pillar count
   */
  getPillarCount() {
    return this.myPillarCount;
  }

  /**
   * Clear the pillar count
   */
  clearPillarCount() {
    this.myPillarCount = 0;
  }

  /**
   * Get the hero's inventory
   * @returns {Inventory} - The hero's inventory
   */
  getInventory() {
    return this.INVENTORY;
  }

  /**
   * Enable god mode for the hero (cheat)
   */
  setGod() {
    this.myBlockChance = 1;
    this.setMyDmg(500000, 450000);
    this.setMyMaxHealth(500000);
    this.setMyUltChance(1);
    this.setMyHitChance(1);
  }

  /**
   * Get string representation of the hero
   * @returns {string} - Hero stats as string
   */
  toString() {
    return `CLASS:${this.getMyName()} HP:${this.getHealth()}/${this.getMaxHealth()} SPEED:${this.getMyAttackSpeed()} ACCURACY:${this.getMyHitChance()} PROTECTION:${this.myBlockChance}`;
  }
}

module.exports = Hero; 