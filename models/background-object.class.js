class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;
  /** 
  * Constructor for creating a background object with a specified image and x position.
  * It initializes the image and sets the y position based on the height of the image.
  */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}