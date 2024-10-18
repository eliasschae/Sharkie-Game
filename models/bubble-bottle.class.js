class BOTTLE extends MovableObject {

    IMAGES_BOTTLE = [
        'img/4. Marcadores/green/100_ copia 5.png'
    ];

    /** 
    * Constructor for initializing a bottle object.
    * It loads the main bottle image and the images for the bottle type.
    * Sets the initial size and random position within the defined range.
    */
    constructor() {
        super();
        this.loadImage('img/4. Marcadores/green/100_ copia 5.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.height = 60;
        this.width = 60;
        this.x = 200 + Math.random() * 1400;
        this.y = 420;
    }

    /** 
    * Draws the bottle on the canvas at its current position.
    * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the drawing surface.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

}  