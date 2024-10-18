class BubbleBar extends DrawableObject {
    IMAGES_BubbleBar = [
        'img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png'
    ];

    percentage = 0;

    /** 
    * Constructor for initializing the bubble bar object.
    * It loads the images for the bubble bar, sets its initial health percentage, position, and size.
    */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BubbleBar);
        this.setPercentage(0);
        this.x = 50;
        this.y = 105;
        this.width = 200;
        this.height = 60;
    }

    /** 
    * Sets the health percentage of the bubble bar and updates the displayed image accordingly.
    * @param {number} percentage - The new health percentage to set.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BubbleBar[this.resolveImageIndex()]
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