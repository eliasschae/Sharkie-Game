class Character extends MovableObject {
    height = 260;
    width = 260;
    speed = 8;

    IMAGES_SWIM = [
        'img/3.Swim/2.png',
        'img/3.Swim/3.png',
        'img/3.Swim/4.png',
        'img/3.Swim/5.png',
        'img/3.Swim/6.png'
    ];

    IMAGES_SWIM_UP_DOWN = [
        'img/1.IDLE/1.png',
        'img/1.IDLE/2.png',
        'img/1.IDLE/3.png',
        'img/1.IDLE/4.png',
        'img/1.IDLE/5.png',
        'img/1.IDLE/6.png',
        'img/1.IDLE/7.png',
        'img/1.IDLE/8.png',
        'img/1.IDLE/9.png',
        'img/1.IDLE/10.png',
        'img/1.IDLE/11.png',
        'img/1.IDLE/12.png',
        'img/1.IDLE/13.png',
        'img/1.IDLE/14.png',
        'img/1.IDLE/15.png',
        'img/1.IDLE/16.png',
        'img/1.IDLE/17.png',
        'img/1.IDLE/18.png'
    ];

    IMAGES_DEAD = [
        'img/6.dead/1.Poisoned/1.png',
        'img/6.dead/1.Poisoned/2.png',
        'img/6.dead/1.Poisoned/3.png',
        'img/6.dead/1.Poisoned/4.png',
        'img/6.dead/1.Poisoned/5.png',
        'img/6.dead/1.Poisoned/6.png',
        'img/6.dead/1.Poisoned/7.png',
        'img/6.dead/1.Poisoned/8.png',
        'img/6.dead/1.Poisoned/9.png',
    ];

    IMAGES_HURT = [
        'img/5.Hurt/1.Poisoned/1.png',
        'img/5.Hurt/1.Poisoned/2.png',
        'img/5.Hurt/1.Poisoned/3.png',
        'img/5.Hurt/1.Poisoned/4.png',
        'img/5.Hurt/1.Poisoned/5.png'
    ];

    IMAGES_ATTACK = [
        'img/4.Attack/Bubble trap/For Whale/1.png',
        'img/4.Attack/Bubble trap/For Whale/2.png',
        'img/4.Attack/Bubble trap/For Whale/3.png',
        'img/4.Attack/Bubble trap/For Whale/4.png',
        'img/4.Attack/Bubble trap/For Whale/5.png',
        'img/4.Attack/Bubble trap/For Whale/6.png',
        'img/4.Attack/Bubble trap/For Whale/7.png',
        'img/4.Attack/Bubble trap/For Whale/8.png'
    ];

    IMAGES_SLEEP = [
        'img/2.Long_IDLE/I11.png',
        'img/2.Long_IDLE/I12.png',
        'img/2.Long_IDLE/I13.png',
    ];

    IMAGES_ATTACKSlap = [
        'img/4.Attack/Fin slap/1.png',
        'img/4.Attack/Fin slap/2.png',
        'img/4.Attack/Fin slap/3.png',
        'img/4.Attack/Fin slap/4.png',
        'img/4.Attack/Fin slap/5.png',
        'img/4.Attack/Fin slap/6.png',
        'img/4.Attack/Fin slap/7.png',
        'img/4.Attack/Fin slap/8.png'
    ];

    world;
    swim_sound = new Audio('audio/swim.mp3');
    attack_sound = new Audio('audio/bubble-sound-43207.mp3');
    hurtSound = new Audio('audio/umph-47201.mp3');
    sleepSound = new Audio('audio/male-snore-1-29322.mp3');
    deadSound = new Audio('audio/marimba-win-c-3-209682.mp3');
    attackFishSound = new Audio('audio/fist-fight-192117.mp3');
    attacking = false;
    attackIndex = 0;
    attackSoundPlayed = false;
    currentAttackImages = [];
    lastAttackSoundTime = 0;
    attackSoundCooldown = 3000;
    shotBubbles = 0;
    deadAnimationPlayed = false;
    lastActionTime = new Date().getTime();
    sleepTimeout = 11000;
    invincible = false;

    /** 
    * Constructor for initializing the character object.
    * Loads various images for different actions and applies gravity.
    * Starts animations immediately after initialization.
    */
    constructor() {
        super().loadImage('img/1.IDLE/1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_SWIM_UP_DOWN);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_ATTACKSlap);
        this.applyGravity();
        this.animate();
    }

    /** 
    * Plays the sound effect for when the character is hurt.
    */
    playHurtSound() {
        if (isMusicOn) { // Überprüfen, ob die Musik aktiv ist
            this.hurtSound.play();
        }
    }

    /** 
    * Plays the sleep sound effect if it is not already playing.
    */
    playSleepSound() {
        if (this.sleepSound.paused) {
            this.sleepSound.play();
        }
    }

    /** 
    * Stops the sleep sound and resets its current time.
    */
    stopSleepSound() {
        if (!this.sleepSound.paused) {
            this.sleepSound.pause();
            this.sleepSound.currentTime = 0;
        }
    }

    // Offset values for character's bounding box for collision detection
    offset = {
        top: 125,
        left: 50,
        right: 50,
        bottom: 60
    };

    /** 
    * Handles keydown events for user input.
    * Triggers an attack if the 'E' key is pressed and there are enough bubbles.
    * @param {KeyboardEvent} e - The keydown event.
    */
    handleKeyDown(e) {
        this.lastActionTime = new Date().getTime();

        if (e.key === 'e' || e.key === 'E') {
            if (this.world.collectedBottles > this.shotBubbles) {
                this.triggerAttack(this.IMAGES_ATTACK, this.attack_sound);
                this.shotBubbles++;
                this.world.bubbleBar.setPercentage(Math.max(0, this.world.bubbleBar.percentage - 20));
            }
        }

        if (e.keyCode == 32) {
            this.triggerAttack(this.IMAGES_ATTACKSlap, this.attackFishSound);

            this.world.level.enemies.forEach((enemy, index) => {
                if (enemy instanceof Fish || enemy instanceof PufferFish) {
                    if (this.isWithinHitbox(enemy)) {
                        this.world.handleFishOrPufferFishHit(enemy, index);
                    }
                }
            });

            const endboss = this.world.level.enemies.find(enemy => enemy instanceof Endboss);
            if (endboss && this.isWithinHitbox(endboss)) {
                this.world.handleEndbossCollision(endboss);
            }
        }
    }

    /** 
    * Checks if the character is within the hitbox of the endboss.
    * @param {Object} endboss - The endboss object.
    * @returns {boolean} - Returns true if the character is within the hitbox of the endboss.
    */
    isWithinHitbox(endboss) {
        const characterRight = this.x + this.width - this.offset.right;
        const characterLeft = this.x + this.offset.left;
        const characterTop = this.y + this.offset.top;
        const characterBottom = this.y + this.height - this.offset.bottom;

        const endbossRight = endboss.x + endboss.width - endboss.offset.right;
        const endbossLeft = endboss.x + endboss.offset.left;
        const endbossTop = endboss.y + endboss.offset.top;
        const endbossBottom = endboss.y + endboss.height - endboss.offset.bottom;

        return (
            characterRight > endbossLeft &&
            characterLeft < endbossRight &&
            characterBottom > endbossTop &&
            characterTop < endbossBottom
        );
    }

    /** 
    * Triggers an attack with specified images and sound.
    * @param {Array} images - Array of attack images.
    * @param {Object} sound - Sound effect for the attack.
    */
    triggerAttack(images, sound) {
        this.attacking = true;
        this.attackIndex = 0;
        this.attackSoundPlayed = false;
        this.currentAttackImages = images;
        this.currentAttackSound = sound;
        this.lastActionTime = new Date().getTime();
        this.invincible = true;
    }

    /** 
    * Handles the attack sound playback based on cooldown.
    */
    handleAttackSound() {
        const currentTime = new Date().getTime();
        if (isMusicOn && currentTime - this.lastAttackSoundTime >= this.attackSoundCooldown) {
            this.currentAttackSound.play();
            this.lastAttackSoundTime = currentTime;
        }
    }

    /** 
    * Plays the attack animation and manages the state of the attack.
    */
    playAttackAnimation() {
        this.img = this.imageCache[this.currentAttackImages[this.attackIndex]];

        if (this.attackIndex >= 6 && !this.attackSoundPlayed) {
            this.handleAttackSound();
            this.attackSoundPlayed = true;
        }

        this.attackIndex++;

        if (this.attackIndex >= this.currentAttackImages.length) {
            if (this.currentAttackImages === this.IMAGES_ATTACK) {
                this.createBubble();
            }
            this.invincible = false;
            this.attacking = false;
            this.attackIndex = 0;
        }
    }

    checkForDamage() {
        if (!this.invincible) {
            this.takeDamage();
        }
    }

    takeDamage() {
        if (!this.invincible) {
            this.health -= 1;
            this.playHurtSound();
            this.invincible = true;
            setTimeout(() => {
                this.invincible = false;
            }, 1000);
        }
    }

    /** 
    * Creates a bubble object and adds it to the throwable objects.
    */
    createBubble() {
        this.world.throwableObjects = [];

        const bubbleStartX = this.x + this.width / 2;
        const bubbleStartY = this.y + this.height - 110;

        const bubble = new ThrowableObject(bubbleStartX, bubbleStartY);
        this.world.throwableObjects.push(bubble);
    }

    /** 
    * Plays the sleep animation and the associated sound.
    */
    playSleepAnimation() {
        this.playAnimation(this.IMAGES_SLEEP);
        this.playSleepSound();
    }

    /** 
    * Plays the idle animation of the character.
    */
    playIdleAnimation() {
        this.playAnimation(this.IMAGES_SWIM_UP_DOWN);
    }

    /** 
    * Plays the swimming animation of the character.
    */
    playSwimAnimation() {
        this.playAnimation(this.IMAGES_SWIM);
    }

    /** 
    * Checks if the current animation is finished based on the index.
    * @returns {boolean} - Returns true if the animation is finished.
    */
    isAnimationFinished() {
        return this.currentAnimationIndex >= this.IMAGES_DEAD.length;
    }

    /** 
    * Initializes the character's animations and movement.
    */
    animate() {
        this.setupKeyboardEvent();
        this.startHorizontalMovement();
        this.startVerticalMovement();
        this.startAnimations();
    }

    setupKeyboardEvent() {
        window.removeEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    /** 
    * Starts horizontal movement of the character based on keyboard input.
    */
    startHorizontalMovement() {
        setInterval(() => {
            this.swim_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (isMusicOn) {
                    this.swim_sound.play();
                }
                this.stopSleepSound();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                if (isMusicOn) { 
                    this.swim_sound.play();
                }
                this.stopSleepSound();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 30);
    }

    /** 
    * Starts vertical movement of the character based on keyboard input.
    */
    startVerticalMovement() {
        const canvasHeight = 480;
        const characterHeight = 200;
        const upperLimit = -120;

        setInterval(() => {
            if (this.world.keyboard.UP && this.y > upperLimit) {
                this.y -= this.speed;
                this.stopSleepSound();
            }

            if (this.world.keyboard.DOWN && this.y < canvasHeight - characterHeight) {
                this.y += this.speed;
                this.stopSleepSound();
            }
        }, 1000 / 30);
    }

    /** 
    * Starts the animations based on the character's state and actions.
    */
    startAnimations() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt() && !this.invincible) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.attacking) {
                this.playAttackAnimation();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playSwimAnimation();
            } else {
                this.playIdleAnimation();
            }
        }, 9000 / 60);
    }
}