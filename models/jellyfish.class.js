class JellyFish extends MovableObject {
    height = 70;
    width = 60;
    IMAGES_SWIM = [
        'img/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    /**
    * Constructor for the jellyfish character, loading images, setting position, speed, and starting animations.
    */
    constructor() {
        super().loadImage('img/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.x = 400 + Math.random() * 2000;
        this.y = 0 + Math.random() * 400;
        this.speed = 0.25 + Math.random() * 0.45;
        this.isDead = false;
        this.animate();
    }

    /**
    * Handles the movement and animation of the jellyfish.
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
    * Stops the movement and animation of the jellyfish.
    */
    stopAnimation() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
}