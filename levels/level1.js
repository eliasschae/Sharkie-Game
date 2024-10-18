let level1;
/** 
 * Initializes level 1 by creating instances of various objects such as enemies, background objects, coins, and bottles.
 */
function initLevel() {
    level1 = new Level(
        [
            new Fish(),
            new Fish(),
            new JellyFish(),
            new JellyFish(),
            new JellyFishYellow(),
            new JellyFishYellow(),
            new PufferFish(),
            new PufferFish(),
            new Endboss(),
        ],
        [
            new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", -720),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", -720),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", -720),
            new BackgroundObject("img/3. Background/Dark/2.png", -720),
            new BackgroundObject("img/3. Background/Layers/1. Light/2.png", -720),

            new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 0),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 0),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 0),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 0),
            new BackgroundObject("img/3. Background/Layers/1. Light/1.png", 0),
            new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", 720),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720),
            new BackgroundObject("img/3. Background/Dark/2.png", 720),
            new BackgroundObject("img/3. Background/Layers/1. Light/2.png", 720),

            new BackgroundObject("img/3. Background/Layers/5. Water/D1.png", 720 * 2),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D1.png", 720 * 2),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D1.png", 720 * 2),
            new BackgroundObject("img/3. Background/Layers/2. Floor/D1.png", 720 * 2),
            new BackgroundObject("img/3. Background/Layers/1. Light/1.png", 720 * 2),
            new BackgroundObject("img/3. Background/Layers/5. Water/D2.png", 720 * 3),
            new BackgroundObject("img/3. Background/Layers/4.Fondo 2/D2.png", 720 * 3),
            new BackgroundObject("img/3. Background/Layers/3.Fondo 1/D2.png", 720 * 3),
            new BackgroundObject("img/3. Background/Dark/2.png", 720 * 3),
            new BackgroundObject("img/3. Background/Layers/1. Light/2.png", 720 * 3),
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ],
        [
            new BOTTLE(),
            new BOTTLE(),
            new BOTTLE(),
            new BOTTLE(),
            new BOTTLE(),
            new BOTTLE(),
        ]
    );
}