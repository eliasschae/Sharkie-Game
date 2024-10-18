class Fish extends MovableObject {
    height = 70;
    width = 70;
    IMAGES_SWIM = [
        'img/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    /**
    * Constructor for the puffer fish character, loading images, setting position, speed, and starting animations.
    */
    constructor() {
        super().loadImage('img/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.x = 400 + Math.random() * 2000;
        this.y = 0 + Math.random() * 400;
        this.speed = 0.25 + Math.random() * 0.45;
        this.isDead = false;
        this.animate();
    }

    /**
    * Handles the movement and animation of the puffer fish.
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
        }, 170);
    }

    /**
    * Stops the movement and animation of the puffer fish.
    */
    stopAnimation() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
}