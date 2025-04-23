/**
 * Blockable interface for characters that can block damage
 * In JavaScript, we'll use a class with a default implementation
 * that can be extended or mixed in by other classes.
 */
class Blockable {
  /**
   * Block damage
   * @param {number} theDamage - The damage to potentially block
   * @returns {number} - The amount of damage that gets through (0 if fully blocked)
   */
  block(theDamage) {
    return 0;
  }
}

module.exports = Blockable; 