class StatusBar extends DrawableObject {
    IMAGES = [
        'img/4. Marcadores/green/Life/0_  copia 3.png',
        'img/4. Marcadores/green/Life/20_ copia 4.png',
        'img/4. Marcadores/green/Life/40_  copia 3.png',
        'img/4. Marcadores/green/Life/60_  copia 3.png',
        'img/4. Marcadores/green/Life/80_  copia 3.png',
        'img/4. Marcadores/green/Life/100_  copia 2.png'
    ];

    percentage = 100;

    /**
    * Constructor for a health/status bar entity.
    */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 50;
        this.y = 20;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
    * Sets the current health percentage and updates the corresponding image.
    * @param {number} percentage - Current percentage (0 to 100).
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * Resolves the index of the image based on the health percentage.
    * @returns {number} - The index of the image corresponding to the health level.
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