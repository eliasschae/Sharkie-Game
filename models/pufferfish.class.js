class PufferFish extends MovableObject {
  height = 70;
  width = 60;
  IMAGES_SWIM = [
    "img/1.Puffer fish (3 color options)/2.transition/3.transition1.png",
    "img/1.Puffer fish (3 color options)/2.transition/3.transition2.png",
    "img/1.Puffer fish (3 color options)/2.transition/3.transition3.png",
    "img/1.Puffer fish (3 color options)/2.transition/3.transition4.png",
    "img/1.Puffer fish (3 color options)/2.transition/3.transition5.png",
  ];

  /**
  * Pufferfish entity constructor that manages its movement and animation.
  */
  constructor() {
    super().loadImage(
      "img/1.Puffer fish (3 color options)/2.transition/3.transition1.png"
    );
    this.loadImages(this.IMAGES_SWIM);
    this.x = 400 + Math.random() * 2000;
    this.y = 0 + Math.random() * 400;
    this.speed = 0.25 + Math.random() * 0.45;
    this.isDead = false;
    this.animate();
  }

  /**
  * Starts the movement and animation loops.
  */ 
  animate() {
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_SWIM);
      }
    }, 200);
  }

  /**
  * Stops the movement and animation intervals.
  */
  stopAnimation() {
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
  }
}