let canvas;
let world;
let keyboard = new Keyboard();
let isMusicOn = true;
let gameStarted = false;

/**
* Starts the game by initializing the level, playing music, hiding the home screen, 
* and setting up the game world. Ensures the game starts only once.
*/
function startGame() {
    initLevel();
    if (!gameStarted) {
        playMusic();
        document.getElementById('home-screen').style.display = 'none';
        document.getElementById('game-title').style.display = 'none';
        init();
        gameStarted = true;
    }
}

/**
 * Plays the background music if the music setting is enabled.
 */
function playMusic() {
    let backgroundSound = document.getElementById('background-music');
    if (isMusicOn) {
        backgroundSound.play();
    }
}

/**
 * Set up event listeners for control, close, and music buttons when the DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', function () {
    setupControlsButton();
    setupCloseButton();
    setupMusicButton();

    document.getElementById("finslap").onclick = triggerslap;

    const muteButton = document.getElementById('mutebutton');
    const muteImage = 'img/soundimg1.png';
    const unmuteImage = 'img/soundimg2.png';
    const backgroundSound = document.getElementById('background-music'); 

    muteButton.addEventListener('click', function () {
        if (muteButton.src.includes(muteImage)) {
            muteButton.src = unmuteImage;
            backgroundSound.pause(); 
            isMusicOn = false; 
        } else {
            muteButton.src = muteImage;
            backgroundSound.play();
            isMusicOn = true; 
        }
    });
});

/**
 * Adds click event listener to toggle controls visibility when controls button is clicked.
 */
function setupControlsButton() {
    document.getElementById('controls-button').addEventListener('click', function () {
        toggleVisibility('controls-image-container');
    });
}

/**
 * Adds click event listener to hide controls when close button is clicked.
 */
function setupCloseButton() {
    document.getElementById('close-button').addEventListener('click', function () {
        hideElement('controls-image-container');
    });
}

/**
 * Adds click event listener to toggle music on/off when the music button is clicked.
 */
function setupMusicButton() {
    document.getElementById('music-button').addEventListener('click', function () {
        toggleMusic(this);
    });
}

/**
 * Toggles the visibility of an element by adding or removing the 'hidden' class.
 * @param {string} elementId - The ID of the element to toggle.
 */
function toggleVisibility(elementId) {
    let element = document.getElementById(elementId);
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
}

/**
 * Hides the specified element by adding the 'hidden' class.
 * @param {string} elementId - The ID of the element to hide.
 */
function hideElement(elementId) {
    document.getElementById(elementId).classList.add('hidden');
}

/**
 * Toggles background music on or off and updates button text accordingly.
 * @param {HTMLElement} buttonElement - The music button element.
 */
function toggleMusic(buttonElement) {
    let backgroundSound = document.getElementById('background-music');
    if (isMusicOn) {
        backgroundSound.pause();
        buttonElement.innerHTML = "MUSIC OFF";
        buttonElement.classList.add('off');
        isMusicOn = false;
    } else {
        backgroundSound.play();
        buttonElement.innerHTML = "MUSIC ON";
        buttonElement.classList.remove('off');
        isMusicOn = true;
    }
}

/**
 * Initializes the game world and assigns the canvas element.
 */
function init() {
    canvas = document.getElementById('canvas');
    if (!canvas) {
        return;
    }
    world = new World(canvas, keyboard);
}

/**
 * Event listeners for keydown events to track keyboard inputs (W, A, S, D, Space, E).
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 68) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 65) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 87) {
        keyboard.UP = true;
    }
    if (e.keyCode == 83) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 69) {
        keyboard.E = true;
    }
});

/**
 * Event listeners for keyup events to stop the movement/actions when keys are released.
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 68) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 65) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 87) {
        keyboard.UP = false;
    }
    if (e.keyCode == 83) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 69) {
        keyboard.E = false;
    }
});

/**
 * Set up mobile controls event listeners for touch start and end on direction buttons.
 */
document.addEventListener('DOMContentLoaded', function () {
    const upButton = document.getElementById('up');
    const downButton = document.getElementById('down');
    const leftButton = document.getElementById('left');
    const rightButton = document.getElementById('right');
    const bubbleButton = document.getElementById('bubble');

    [upButton, downButton, leftButton, rightButton, bubbleButton].forEach(button => {
        button.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        });
    });

    upButton.addEventListener('touchstart', () => keyboard.UP = true, { passive: true });
    upButton.addEventListener('touchend', () => keyboard.UP = false, { passive: true });

    downButton.addEventListener('touchstart', () => keyboard.DOWN = true, { passive: true });
    downButton.addEventListener('touchend', () => keyboard.DOWN = false, { passive: true });

    leftButton.addEventListener('touchstart', () => keyboard.LEFT = true, { passive: true });
    leftButton.addEventListener('touchend', () => keyboard.LEFT = false, { passive: true });

    rightButton.addEventListener('touchstart', () => keyboard.RIGHT = true, { passive: true });
    rightButton.addEventListener('touchend', () => keyboard.RIGHT = false, { passive: true });

    bubbleButton.addEventListener('touchstart', triggerBubble, { passive: true });
});

let mobileControls = document.getElementById('mobile-controls');

/**
 * Returns the character instance from the game world.
 */
function getCharacterInstance() {
    return world.character;
}

/**
 * Triggers a bubble attack if bottles are available, updates the UI, and plays attack sound.
 */
function triggerBubble() {
    if (world && world.character) {
        if (world.collectedBottles > world.character.shotBubbles) {
            world.character.triggerAttack(
                world.character.IMAGES_ATTACK,
                world.character.attack_sound
            );
            world.character.shotBubbles++;
            world.bubbleBar.setPercentage(Math.max(0, world.bubbleBar.percentage - 20));
        }
    }
}

/**
 * Moves the character left by setting the LEFT key state to true,
 * then stops the movement after 100 milliseconds by resetting the state to false.
 */
function moveLeft() {
    keyboard.LEFT = true;
    setTimeout(() => {
        keyboard.LEFT = false;
    }, 100);
}

/**
 * Moves the character right by setting the RIGHT key state to true,
 * then stops the movement after 100 milliseconds by resetting the state to false.
 */
function moveRight() {
    keyboard.RIGHT = true;
    setTimeout(() => {
        keyboard.RIGHT = false;
    }, 100);
}

/**
 * Moves the character down by setting the DOWN key state to true,
 * then stops the movement after 100 milliseconds by resetting the state to false.
 */
function moveDown() {
    keyboard.DOWN = true;
    setTimeout(() => {
        keyboard.DOWN = false;
    }, 100);
}

/**
 * Moves the character up by setting the UP key state to true,
 * then stops the movement after 100 milliseconds by resetting the state to false.
 */
function moveUp() {
    keyboard.UP = true;
    setTimeout(() => {
        keyboard.UP = false;
    }, 100);
}

/**
 * Sets up the keyboard event listener for keydown events.
 * It removes any existing listener to prevent duplicates and
 * then adds a new listener that binds the handleKeyDown method
 * to the current context (this).
 */
function setupKeyboardEvent() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
}

/**
 * Executes a slap attack for the character, updating the last action time 
 * and checking for collisions with the Endboss.
 */
function triggerslap() {
    const character = getCharacterInstance();
    if (!character) return;
    character.lastActionTime = new Date().getTime();
    character.triggerAttack(character.IMAGES_ATTACKSlap, character.attackFishSound);
    const endboss = world.level.enemies.find(enemy => enemy instanceof Endboss);
    if (endboss && character.isWithinHitbox(endboss)) {
        world.handleEndbossCollision(endboss);
    }

    world.level.enemies.forEach((enemy, index) => {
        if (enemy instanceof Fish || enemy instanceof PufferFish) {
            if (character.isWithinHitbox(enemy)) {
                world.handleFishOrPufferFishHit(enemy, index);
            }
        }
    });
}

/**
 * Listens for the 'keydown' event and calls the triggerslap function 
 * when the spacebar (key code 32) is pressed.
 */
document.addEventListener('keydown', function (e) {
    if (e.keyCode === 32) {
        triggerslap();
    }
});
