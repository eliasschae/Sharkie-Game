class World {
  coinSound = new Audio('audio/collectcoin-6075.mp3');
  bottleSound = new Audio('audio/liquor-bottle-open-2-96923.mp3');
  character = new Character();
  endboss = new Endboss();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  throwableObjects = [];
  coinBar = new CoinBar();
  collectedCoins = 0;
  bubbleBar = new BubbleBar();
  collectedBottles = 0;
  bossBar = new BossBar();
  objects = [];

  pufferFishDeathImages = [
    'img/1.Puffer fish (3 color options)/4.DIE/2.png',
    'img/1.Puffer fish (3 color options)/4.DIE/2.2.png',
    'img/1.Puffer fish (3 color options)/4.DIE/2.3.png'
  ];

  FishDeathImages = [
    'img/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
    'img/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
    'img/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png'
  ];

  jellyfishDeathImages = [
    'img/2 Jelly fish/Dead/Lila/L1.png',
    'img/2 Jelly fish/Dead/Lila/L2.png',
    'img/2 Jelly fish/Dead/Lila/L3.png',
    'img/2 Jelly fish/Dead/Lila/L4.png'
  ];

  greenjellyfishDeathImages = [
    'img/2 Jelly fish/Dead/green/g1.png',
    'img/2 Jelly fish/Dead/green/g2.png',
    'img/2 Jelly fish/Dead/green/g3.png',
    'img/2 Jelly fish/Dead/green/g4.png'
  ];

  /**
  * Initializes the canvas, keyboard input, and starts the main functions.
  * @param {HTMLCanvasElement} canvas - The canvas element where drawing occurs.
  * @param {Object} keyboard - An object to manage keyboard inputs.
  */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
  * Resets the number of bubbles shot by the character to zero.
  */
  resetBubbles() {
    this.character.shotBubbles = 0;
  }

  /**
  * Assigns the current world (game environment) to the character.
  */
  setWorld() {
    this.character.world = this;
  }

  /**
  * Starts the game's main loop, checking for collisions and object interactions at regular intervals.
  */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkBubbleEnemyCollision();
    }, 200);
  }

  /**
  * Checks if the 'E' key is pressed to throw objects.
  */
  checkThrowObjects() {
    if (this.keyboard.E) {
    }
  }

  /**
  * Checks collisions with enemies, coins, and bottles.
  */
  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkCoinCollisions();
    this.checkBottleCollisions();
  }

  /**
  * Checks if the character is colliding with any enemies and handles the hit.
  */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit(enemy);
        this.character.playHurtSound();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
  * Checks if the character is colliding with any coins and collects them.
  */
  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collectCoin(index);
      }
    });
  }

  /**
  * Checks if the character is colliding with any bottles and collects them.
  */
  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.collectBottle(index);
      }
    });
  }

  /**
  * Checks for collisions between bubbles and enemies, and handles the result.
  */
  checkBubbleEnemyCollision() {
    this.throwableObjects.forEach((bubble, bubbleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (bubble.isColliding(enemy)) {
          this.handleCollision(bubbleIndex, enemy, enemyIndex);
        }
      });
    });
  }

  /**
  * Handles the result of a collision between a bubble and an enemy.
  * @param {number} bubbleIndex - The index of the bubble that collided.
  * @param {Object} enemy - The enemy object that was hit.
  * @param {number} enemyIndex - The index of the enemy.
  */
  handleCollision(bubbleIndex, enemy, enemyIndex) {
    this.throwableObjects.splice(bubbleIndex, 1);
    if (enemy instanceof Endboss) {
      this.handleEndbossCollision(enemy, enemyIndex);
    } else {
      this.handleEnemyDeathAnimation(enemy, enemyIndex);
    }
  }

  /**
  * Handles the collision with the Endboss by updating health and playing animations.
  * @param {Object} enemy - The Endboss object that was hit.
  * @param {number} enemyIndex - The index of the Endboss.
  */
  handleEndbossCollision(enemy, enemyIndex) {
    enemy.hitEndboss();
    enemy.hitMinEndboss();
    this.bossBar.setPercentage(enemy.percentage);

    if (enemy.isDead()) {
      this.playDeathAnimation(enemy, enemyIndex, this.pufferFishDeathImages);
      this.level.enemies.splice(enemyIndex, 1);
    } else if (typeof enemy.playHurtAnimation === 'function') {
      enemy.playHurtAnimation();
    }
  }

  /**
  * Plays the death animation for an enemy based on its type.
  * @param {Object} enemy - The enemy object to be killed.
  * @param {number} enemyIndex - The index of the enemy.
  */
  handleEnemyDeathAnimation(enemy, enemyIndex) {
    if (enemy instanceof PufferFish) {
      this.playDeathAnimation(enemy, enemyIndex, this.pufferFishDeathImages);
    } else if (enemy instanceof Fish) {
      this.playDeathAnimation(enemy, enemyIndex, this.FishDeathImages);
    } else if (enemy instanceof JellyFish) {
      this.playDeathAnimation(enemy, enemyIndex, this.jellyfishDeathImages);
    } else if (enemy instanceof JellyFishYellow) {
      this.playDeathAnimation(enemy, enemyIndex, this.greenjellyfishDeathImages);
    } else {
      this.level.enemies.splice(enemyIndex, 1);
    }
  }

  handleFishOrPufferFishHit(enemy, enemyIndex) {
    if (enemy.isDead) return;
    enemy.isDead = true;
    this.clearEnemyIntervals(enemy);

    let deathImages;
    if (enemy instanceof PufferFish) {
      deathImages = this.pufferFishDeathImages;
    } else if (enemy instanceof Fish) {
      deathImages = this.FishDeathImages;
    }
    this.startDeathAnimation(enemy, enemyIndex, deathImages);
  }

  /**
  * Starts the death animation for an enemy.
  * @param {Object} enemy - The enemy object to animate.
  * @param {number} enemyIndex - The index of the enemy.
  * @param {Array<string>} deathImages - The array of images for the death animation.
  */
  playDeathAnimation(enemy, enemyIndex, deathImages) {
    if (enemy.isDead) return;
    enemy.isDead = true;

    this.clearEnemyIntervals(enemy);
    this.startDeathAnimation(enemy, enemyIndex, deathImages);
  }

  /**
  * Clears the animation and movement intervals of an enemy.
  * @param {Object} enemy - The enemy whose intervals need to be cleared.
  */
  clearEnemyIntervals(enemy) {
    if (enemy.animationInterval) {
      clearInterval(enemy.animationInterval);
    }
    if (enemy.moveInterval) {
      clearInterval(enemy.moveInterval);
    }
  }

  /**
  * Animates the enemy's death by cycling through its death images.
  * @param {Object} enemy - The enemy object to animate.
  * @param {number} enemyIndex - The index of the enemy.
  * @param {Array<string>} deathImages - The array of death animation images.
  */
  startDeathAnimation(enemy, enemyIndex, deathImages) {
    let frame = 0;
    const animationInterval = setInterval(() => {
      if (frame < deathImages.length) {
        this.updateDeathImage(enemy, deathImages, frame);
        frame++;
      } else {
        this.removeEnemyAfterAnimation(enemyIndex, animationInterval);
      }
    }, 200);
  }

  /**
  * Updates the image of the enemy during its death animation.
  * @param {Object} enemy - The enemy object being animated.
  * @param {Array<string>} deathImages - The array of death animation images.
  * @param {number} frame - The current frame of the animation.
  */
  updateDeathImage(enemy, deathImages, frame) {
    enemy.img.src = deathImages[frame];
  }

  /**
  * Removes the enemy after the death animation has finished.
  * @param {number} enemyIndex - The index of the enemy to remove.
  * @param {number} animationInterval - The interval ID for the death animation.
  */
  removeEnemyAfterAnimation(enemyIndex, animationInterval) {
    clearInterval(animationInterval);
    setTimeout(() => {
      this.level.enemies.splice(enemyIndex, 1);
    }, 200);
  }

  /**
  * Collects a bottle and updates the bubble bar.
  * @param {number} index - The index of the bottle to collect.
  */
  collectBottle(index) {
    this.level.bottles.splice(index, 1);
    this.collectedBottles++;
    if (isMusicOn) {
      this.bottleSound.play();
    }
    let bubblePercentage = (this.collectedBottles / this.level.totalBottles) * 100;
    this.bubbleBar.setPercentage(bubblePercentage);
  }

  /**
  * Collects a coin and updates the coin bar.
  * @param {number} index - The index of the coin to collect.
  */
  collectCoin(index) {
    this.level.coins.splice(index, 1);
    this.collectedCoins++;
    let coinPercentage = (this.collectedCoins / this.level.totalCoins) * 100;
    this.coinBar.setPercentage(coinPercentage);
    if (isMusicOn) {
      this.coinSound.play();
    }
  }

  /**
  * Draws the current state of the game, including characters, enemies, and objects.
  * Author: Elias
  */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bubbleBar);
    this.addToMap(this.bossBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  /**
  * Adds multiple objects to the canvas map.
  * @param {Array<Object>} objects - Array of objects to add to the map.
  */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
  * Adds a single object to the canvas map, flipping the image if necessary.
  * @param {Object} mo - The movable object to add to the map.
  */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
  * Flips the image horizontally before drawing it on the canvas.
  * @param {Object} mo - The object to flip.
  */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
  * Restores the image to its original orientation after drawing.
  * @param {Object} mo - The object to unflip.
  */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
  * Adds a new object to the array of objects.
  * @param {Object} object - The object to add to the list of objects.
  */
  addObject(object) {
    this.objects.push(object);
  }
}