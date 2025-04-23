const Character = require('./AbstractClasses/Character');
const MonsterType = require('./CharacterConstants/MonsterType');
const Healable = require('./Interfaces/Healable');

/**
 * Monster class - Enemy characters that can heal
 * @extends Character
 */
class Monster extends Character {
  /**
   * Create a new Monster
   * @param {MonsterType} theType - The type of monster to create
   * @param {Object} db - Database connection or mock database object
   */
  constructor(theType, db) {
    super();
    this.myHealChance = 0;
    this.myRegeneration = 0;
    this.loadMonster(theType, db);
  }

  /**
   * Load monster data from the database
   * @param {MonsterType} theType - The type of monster to load
   * @param {Object} db - Database connection or mock data
   */
  loadMonster(theType, db) {
    try {
      // Similar to Hero classes, we'll assume db provides a method to get monster data
      let monsterData;
      
      switch (theType) {
        case MonsterType.OGRE:
          monsterData = db.getMonsterData('OGRE');
          break;
        case MonsterType.GOBLIN:
          monsterData = db.getMonsterData('GOBLIN');
          break;
        case MonsterType.DIREWOLF:
          monsterData = db.getMonsterData('DIREWOLF');
          break;
        default:
          throw new Error(`Unknown monster type: ${theType}`);
      }
      
      this.loadStats(monsterData);
    } catch (error) {
      console.error('Error loading Monster data:', error);
      // Load default stats as fallback
      this.loadDefaultStats(theType);
    }
  }

  /**
   * Load monster stats from database result
   * @param {Object} data - Monster data object
   */
  loadStats(data) {
    this.loadCharacter(data);
    this.myHealChance = data.HEALCHANCE;
    this.myRegeneration = data.REGENERATION;
  }

  /**
   * Load default stats if database connection fails
   * @param {MonsterType} theType - The type of monster to create default stats for
   */
  loadDefaultStats(theType) {
    // Default monster stats based on type
    let defaultStats = {
      SPEED: 3,
      HITCHANCE: 0.7,
      MINDMG: 20,
      MAXDMG: 40,
      HEALCHANCE: 0.2,
      REGENERATION: 10
    };
    
    switch (theType) {
      case MonsterType.OGRE:
        defaultStats = {
          ...defaultStats,
          NAME: 'OGRE',
          HP: 200,
          MINDMG: 30,
          MAXDMG: 60
        };
        break;
      case MonsterType.GOBLIN:
        defaultStats = {
          ...defaultStats,
          NAME: 'GOBLIN',
          HP: 70,
          SPEED: 5,
          HITCHANCE: 0.8
        };
        break;
      case MonsterType.DIREWOLF:
        defaultStats = {
          ...defaultStats,
          NAME: 'DIREWOLF',
          HP: 120,
          SPEED: 4,
          MINDMG: 25,
          MAXDMG: 45
        };
        break;
    }
    
    this.loadStats(defaultStats);
  }

  /**
   * Apply damage to this monster
   * @param {number} theDamage - Amount of damage to apply
   * @returns {string} - Description of damage result
   */
  damage(theDamage) {
    this.setMyHitPoints(this.getHealth() - theDamage);
    return `${this.getMyName()} took ${theDamage} damage.\n`;
  }

  /**
   * Heal the monster with a chance-based regeneration
   * @returns {string} - Description of healing result
   */
  heal() {
    // Is this monster lucky enough to heal?
    const recover = Math.random() <= this.myHealChance ? this.myRegeneration : 0;

    // If hit points are healed beyond maxHealth, reset back at maxHealth
    this.setMyHitPoints(Math.min(this.getHealth() + recover, this.getMaxHealth()));
    
    return recover === 0 
      ? `${this.getMyName()} did not regenerate health.\n` 
      : `${this.getMyName()} regenerated ${recover} health!\n`;
  }

  /**
   * Get string representation of the monster
   * @returns {string} - Monster stats as string
   */
  toString() {
    return `MONSTER:${this.getMyName()} HP:${this.getHealth()}/${this.getMaxHealth()} SPEED:${this.getMyAttackSpeed()} ACCURACY:${this.getMyHitChance()} HEALCHANCE:${this.myHealChance}`;
  }
}

module.exports = Monster; 