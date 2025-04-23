/**
 * Healable interface for characters that can be healed
 * In JavaScript, we'll use a class with default implementations
 * that can be extended or mixed in by other classes.
 */
class Healable {
  /**
   * Heal with specific min and max values
   * @param {number} theMax - Maximum heal amount
   * @param {number} theMin - Minimum heal amount
   * @returns {string} - Description of healing result
   */
  heal(theMax, theMin) {
    return null;
  }

  /**
   * Heal with default values
   * @returns {string} - Description of healing result
   */
  healDefault() {
    return null;
  }
}

module.exports = Healable; 