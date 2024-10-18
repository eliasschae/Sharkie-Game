class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height;
    width;

    hitboxXOffset = 1;
    hitboxYOffset = 1;
    hitboxWidthReduction = 10;
    hitboxHeightReduction = 20;

    /**
     * Load a single image from a specified path.
     * @param {string} path - The path of the image to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Load multiple images from an array of paths.
     * @param {string[]} arr - Array containing paths of the images to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draw the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draw the hitbox frame for collision detection visualization.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Fish || this instanceof JellyFish || this instanceof JellyFishYellow || this instanceof PufferFish) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(
                this.x + this.hitboxXOffset,
                this.y + this.hitboxYOffset,
                this.width - this.hitboxWidthReduction,
                this.height - this.hitboxHeightReduction
            );
            ctx.stroke();
        }
    }

    /**
    * Load multiple images from an array of paths into the image cache.
    * @param {string[]} arr - An array of image paths to be loaded.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}