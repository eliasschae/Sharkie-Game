class ThrowableObject extends MovableObject {
    /**
    * Constructor for the Poisoned Bubble attack entity.
    * @param {number} x - The initial X-coordinate of the bubble.
    * @param {number} y - The initial Y-coordinate of the bubble.
    */
    constructor(x, y) {
        super().loadImage('img/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        this.x = x;
        this.y = y;
        this.height = 40;
        this.width = 40;
        this.speedX = 7;
        this.x += 50;
        this.init();
    }

    /**
    * Initializes the bubble movement by incrementing the X-coordinate at regular intervals.
    */
    init() {
        setInterval(() => {
            this.x += this.speedX;
        }, 25);
    }
}