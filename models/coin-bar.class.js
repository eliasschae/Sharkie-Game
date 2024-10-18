/**
 * Class representing a coin bar.
 */
class CoinBar extends DrawableObject {
    IMAGES_coinbar = [
        'img/4. Marcadores/green/Coin/0_  copia 4.png',
        'img/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/4. Marcadores/green/Coin/100_ copia 4.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_coinbar);
        this.x = 50;
        this.y = 60;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Set the percentage of the coin bar and update the displayed image.
     * @param {number} percentage - The percentage to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_coinbar[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolve the image index based on the current percentage.
     * @returns {number} - The index of the image to use.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}