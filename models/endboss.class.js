class Endboss extends MovableObject {
    height = 800;
    width = 600;
    y = -200;
    hitCounter = 0;
    hurtAnimationPlaying = false;
    deadAnimationPlaying = false;

    offset = {
        top: 300,
        left: 20,
        right: 20,
        bottom: 150
    };

    IMAGES_SWIM = [
        'img/3 Final Enemy/1.Introduce/1.png',
        'img/3 Final Enemy/1.Introduce/2.png',
        'img/3 Final Enemy/1.Introduce/3.png',
        'img/3 Final Enemy/1.Introduce/4.png',
        'img/3 Final Enemy/1.Introduce/5.png',
        'img/3 Final Enemy/1.Introduce/6.png',
        'img/3 Final Enemy/1.Introduce/7.png',
        'img/3 Final Enemy/1.Introduce/8.png',
        'img/3 Final Enemy/1.Introduce/9.png',
        'img/3 Final Enemy/1.Introduce/10.png'
    ];

    IMAGES_SWIMaround = [
        'img/3 Final Enemy/2.floating/1.png',
        'img/3 Final Enemy/2.floating/2.png',
        'img/3 Final Enemy/2.floating/3.png',
        'img/3 Final Enemy/2.floating/4.png',
        'img/3 Final Enemy/2.floating/5.png',
        'img/3 Final Enemy/2.floating/6.png',
        'img/3 Final Enemy/2.floating/7.png',
        'img/3 Final Enemy/2.floating/8.png',
        'img/3 Final Enemy/2.floating/9.png',
        'img/3 Final Enemy/2.floating/10.png',
        'img/3 Final Enemy/2.floating/11.png',
        'img/3 Final Enemy/2.floating/12.png',
        'img/3 Final Enemy/2.floating/13.png'
    ];

    IMAGES_endbossHurt = [
        'img/3 Final Enemy/Hurt/1.png',
        'img/3 Final Enemy/Hurt/2.png',
        'img/3 Final Enemy/Hurt/3.png',
        'img/3 Final Enemy/Hurt/4.png'
    ];

    IMAGES_endbossDead = [
        'img/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];

    currentAnimation = this.IMAGES_SWIM;
    endbossHurt = new Audio('audio/515623_6769489-lq.mp3');
    endbossDeath = new Audio('audio/you-win-sequence-3-183950.mp3');

    /**
    * Load images for the endboss hurt and dead animations, set initial position and speed, and start the animation cycle.
    */
    constructor() {
        super().loadImage(this.IMAGES_SWIM[0]);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_SWIMaround);
        this.loadImages(this.IMAGES_endbossHurt);
        this.loadImages(this.IMAGES_endbossDead);
        this.x = 2400;
        this.speed = 1.20;
        this.animate();
    }

    /**
    * Handles the animation behavior of the endboss, including movement and animation playback.
    */
    animate() {
        this.moveInterval = setInterval(() => {
            if (!this.deadAnimationPlaying) {
                if (world.character.x > 500 || this.x > 2350) {
                    this.moveLeft();
                }
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.deadAnimationPlaying) {
                this.playAnimation(this.currentAnimation);
            }
        }, 170);

        setTimeout(() => {
            if (!this.hurtAnimationPlaying && !this.deadAnimationPlaying) {
                this.currentAnimation = this.IMAGES_SWIMaround;
            }
        }, 2000);
    }

    /**
    * Handles the endboss being hit, triggering hurt animation and checking for death condition.
    */
    hitEndboss() {
        this.hitCounter++;
        this.hurtAnimationPlaying = true;
        this.currentAnimation = this.IMAGES_endbossHurt;
        if (isMusicOn) {
            this.endbossHurt.play();
        }

        setTimeout(() => {
            this.hurtAnimationPlaying = false;
            if (this.hitCounter >= 5 && !this.deadAnimationPlaying) {
                this.triggerDeath();
            } else {
                this.currentAnimation = this.IMAGES_SWIMaround;
            }
        }, this.IMAGES_endbossHurt.length * 170);
    }

    /**
    * Triggers the death sequence for the endboss, playing the death animation and sound.
    */
    triggerDeath() {
        this.deadAnimationPlaying = true;
        this.currentAnimation = this.IMAGES_endbossDead;
        if (isMusicOn) {
            this.endbossDeath.play();
        }
        this.endbossDeath.play();
        clearInterval(this.moveInterval);

        this.playDeathAnimation();
    }

    /**
    * Plays the death animation for the endboss frame by frame and reloads the page after the animation ends.
    */
    playDeathAnimation() {
        let frameIndex = 0;
        const deathAnimationInterval = setInterval(() => {
            this.loadImage(this.IMAGES_endbossDead[frameIndex]);
            frameIndex++;

            if (frameIndex >= this.IMAGES_endbossDead.length) {
                clearInterval(deathAnimationInterval);
                this.loadImage(this.IMAGES_endbossDead[this.IMAGES_endbossDead.length - 1]);
                document.getElementById('overlay').style.display = 'flex';
                setTimeout(() => {
                    document.getElementById('overlay').style.display = 'none';
                    location.reload();
                }, 8000);
            }
        }, 170);
    }
}