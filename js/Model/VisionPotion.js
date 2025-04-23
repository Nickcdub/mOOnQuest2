const Item = require('./AbstractClasses/Item');

/**
 * VisionPotion class - A potion that reveals parts of the maze
 * @extends Item
 */
class VisionPotion extends Item {
  constructor() {
    super();
    this.myPotionName = "Vision Potion";
  }

  /**
   * Use the potion on a maze
   * @param {Maze} theMaze - The maze to reveal
   * @returns {string} - Description of vision result
   */
  useEffect(theMaze) {
    // Reveal parts of the maze
    return theMaze.revealArea();
  }
}

module.exports = VisionPotion; 