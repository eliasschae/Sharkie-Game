class BossBar extends DrawableObject {

    IMAGES_Boss = [
        'img/4. Marcadores/Purple/0_ .png',
        'img/4. Marcadores/Purple/20__1.png',
        'img/4. Marcadores/Purple/40_ .png',
        'img/4. Marcadores/Purple/60_ .png',
        'img/4. Marcadores/Purple/80_ .png',
        'img/4. Marcadores/Purple/100_ .png'
    ];

    percentage = 100;

    /** 
    * Constructor for initializing the boss object.
    * It loads the images for the boss, sets its position, size, and initial health percentage.
    */
    constructor() {
        super();
        this.loadImages(this.IMAGES_Boss);
        this.x = 500;
        this.y = 20;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /** 
    * Sets the health percentage of the boss and updates the displayed image accordingly.
    * @param {number} percentage - The new health percentage to set.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_Boss[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /** 
    * Resolves the index of the image to display based on the current health percentage.
    * @returns {number} - The index of the image corresponding to the current percentage.
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