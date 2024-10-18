class JellyFishYellow extends MovableObject {
    height = 70;
    width = 60;
    IMAGES_SWIM = [
        'img/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2 Jelly fish/Súper dangerous/Green 4.png'
    ];

    /**
    * Constructor for the dangerous green jellyfish, initializing its image, position, speed, and animation.
    */
    constructor() {
        super().loadImage('img/2 Jelly fish/Súper dangerous/Green 1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.x = 400 + Math.random() * 2000;
        this.y = 0 + Math.random() * 400;
        this.speed = 0.25 + Math.random() * 0.45;
        this.isDead = false;
        this.animate();
    }

    /**
    * Animates the movement and frame switching for the jellyfish.
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
    * Stops both movement and animation of the jellyfish.
    */
    stopAnimation() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
}