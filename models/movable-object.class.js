class MovableObject extends DrawableObject {
  otherDirection = false;
  energy = 100;
  percentage = 100;
  lastHit = 0;
  /**
  * Object managing game entity physics, animations, and collisions.
  */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  /**
  * Applies gravity to the object at regular intervals.
  */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround()) {
      }
    }, 1000 / 25);
  }

  /**
  * Checks if the object is above the ground level.
  * @returns {boolean} True if the object is above ground.
  */
  isAboveGround() {
    return this.y < 330;
  }

  /**
  * Reduces the energy of the object when hit.
  */
  hit() {
    const currentTime = new Date().getTime();
    const timeSinceLastHit = (currentTime - this.lastHit) / 1000; 

    if (timeSinceLastHit >= 0.5) {
      this.energy -= 5;
      if (this.energy < 0) {
        this.energy = 0;
      }
      this.lastHit = currentTime; 
    }
  }

  /**
  * Reduces the percentage value when the endboss is hit.
  */
  hitMinEndboss() {
    this.percentage -= 20;
    if (this.percentage < 0) {
      this.percentage = 0;
    }
    console.log(this.percentage);
  }

  /**
  * Checks if the current object is colliding with another movable object (mo).
  * @param {object} mo - The other object to check collision with.
  * @returns {boolean} True if there is a collision.
  */
  isColliding(mo) {
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
  }

  /**
  * Determines if the object is hurt (within a certain time since last hit).
  * @returns {boolean} True if the object was hit recently.
  */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1.5;
  }

  /**
  * Determines if the object is dead (energy is 0).
  * @returns {boolean} True if the object has no energy left.
  */
  isDead() {
    return this.energy == 0;
  }

  /**
  * Plays the current animation for the object based on its state.
  * @param {Array} images - Array of image paths to animate.
  */
  playAnimation(images) {
    if (this.shouldPlayDeadAnimation(images)) {
      this.playDeadAnimation(images);
      return;
    }

    this.updateCurrentImage(images);
  }

  /**
  * Checks if the dead animation should be played.
  * @param {Array} images - Array of image paths.
  * @returns {boolean} True if the dead animation should be played.
  */
  shouldPlayDeadAnimation(images) {
    return typeof this.isDead === 'function' && this.isDead() && !this.deadAnimationPlayed;
  }

  /**
  * Plays the death animation sequence.
  * @param {Array} images - Array of image paths to animate for death.
  */
  playDeadAnimation(images) {
    this.img = this.imageCache[images[images.length - 1]];
    this.deadSound.play();
    this.deadAnimationPlayed = true;
    this.showDeathOverlay();
    this.reloadAfterDelay(8000);
  }

  /**
  * Shows the death overlay.
  */
  showDeathOverlay() {
    document.getElementById('death-overlay').classList.remove('hidden');
  }

  /**
  * Reloads the page after a given delay.
  * @param {number} delay - Time in milliseconds before reloading the page.
  */
  reloadAfterDelay(delay) {
    setTimeout(() => {
      location.reload();
    }, delay);
  }

  /**
  * Updates the current animation frame.
  * @param {Array} images - Array of image paths to animate.
  */
  updateCurrentImage(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];

    if (this.shouldStopAtLastFrame(images)) {
      this.deadAnimationPlayed = true;
      this.currentImage = images.length - 1;
    } else {
      this.currentImage++;
    }
  }

  /**
  * Determines if the animation should stop at the last frame.
  * @param {Array} images - Array of image paths.
  * @returns {boolean} True if the animation should stop at the last frame.
  */
  shouldStopAtLastFrame(images) {
    return typeof this.isDead === 'function' && this.isDead() && this.currentImage >= images.length - 1;
  }

  /**
  * Moves the object to the right.
  */
  moveRight() {
    this.x += this.speed;
  }

  /**
  * Moves the object to the left.
  */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
  * Placeholder function for drawing the object's frame.
  * @param {object} ctx - The canvas context.
  */
  drawFrame(ctx) {
  }

  /**
  * Placeholder function for drawing the object's hitbox.
  * @param {object} ctx - The canvas context.
  */
  drawHitbox(ctx) {
  }
}