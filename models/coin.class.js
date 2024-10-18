class Coin extends MovableObject {
    IMAGES_Coin = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png'
    ];

    constructor() {
        super();
        this.loadImage('img/4. Marcadores/1. Coins/1.png');
        this.loadImages(this.IMAGES_Coin);
        this.height = 40;
        this.width = 40;
        this.x = 200 + Math.random() * 1400;
        this.y = 0 + Math.random() * 400;
        this.animateCoin();
    }

    /**
     * Animate the coin by playing through the coin images.
     */
    animateCoin() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_Coin);
        }, 250);
    }

    /**
     * Play the sound when the coin is collected.
     */
    playCollectSound() {
        this.coinSound.play();
    }
}