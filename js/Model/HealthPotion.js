const Item = require('./AbstractClasses/Item');

/**
 * HealthPotion class - A potion that heals the hero
 * @extends Item
 */
class HealthPotion extends Item {
  constructor() {
    super();
    this.myPotionName = "Health Potion";
  }

  /**
   * Use the potion on a hero
   * @param {Hero} theHero - The hero to heal
   * @returns {string} - Description of healing result
   */
  useEffect(theHero) {
    // Heal the hero
    return theHero.heal(60, 40);
  }
}

module.exports = HealthPotion; 