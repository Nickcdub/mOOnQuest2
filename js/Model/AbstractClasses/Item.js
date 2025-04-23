/**
 * Abstract Item class - Base class for all items in the game
 */
class Item {
  constructor() {
    this.myPotionName = "";
  }

  /**
   * Get string representation of the item
   * @returns {string} - Item name
   */
  toString() {
    return this.myPotionName;
  }
}

module.exports = Item; 