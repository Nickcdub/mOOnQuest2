/**
 * Inventory class - Manages a hero's inventory of items
 */
class Inventory {
  constructor() {
    this.INVENTORY = new Map();
    this.INVENTORY.set("Health Potion", 0);
    this.INVENTORY.set("Vision Potion", 0);
  }

  /**
   * Add an item to the inventory
   * @param {Item} theItem - The item to add
   * @returns {string} - Confirmation message
   */
  addItem(theItem) {
    const itemName = theItem.toString();
    const currentCount = this.INVENTORY.get(itemName) || 0;
    this.INVENTORY.set(itemName, currentCount + 1);
    return `${itemName} added to Inventory!`;
  }

  /**
   * Remove an item from the inventory
   * @param {string} theItem - The name of the item to remove
   */
  removeItem(theItem) {
    const currentCount = this.INVENTORY.get(theItem);
    if (currentCount > 0) {
      this.INVENTORY.set(theItem, currentCount - 1);
    }
  }

  /**
   * Get the number of different types of items in the inventory
   * @returns {number} - The size of the inventory
   */
  getSize() {
    let size = 0;
    if (this.INVENTORY.get("Health Potion") > 0) size++;
    if (this.INVENTORY.get("Vision Potion") > 0) size++;
    return size;
  }

  /**
   * Get the count of a specific item
   * @param {string} theItem - The name of the item to check
   * @returns {number} - The count of the item
   */
  getItem(theItem) {
    return this.INVENTORY.get(theItem) || 0;
  }

  /**
   * Get string representation of the inventory
   * @returns {string} - The inventory as a string
   */
  toString() {
    return `[ Health Potions: ${this.INVENTORY.get("Health Potion")}, Vision Potions: ${this.INVENTORY.get("Vision Potion")} ]`;
  }
}

module.exports = Inventory; 