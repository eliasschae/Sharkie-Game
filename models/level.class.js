class Level {
  /**
  * Constructor for setting up the game level with enemies, background objects, coins, and bottles.
  * 
  * @param {Array} enemies - Array of enemy objects in the level.
  * @param {Array} backgroundObjects - Array of background objects.
  * @param {Array} coins - (Optional) Array of coin objects, defaults to an empty array if not provided.
  * @param {Array} bottles - (Optional) Array of bottle objects, defaults to an empty array if not provided.
  */
  constructor(enemies, backgroundObjects, coins = [], bottles = []) {
    this.level_end_x = 2200;
    this.enemies = enemies; 
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
    this.totalCoins = coins.length;
    this.totalBottles = bottles.length;
    this.levelData = [];
    this.width = 0;
    this.height = 0;
  }
}