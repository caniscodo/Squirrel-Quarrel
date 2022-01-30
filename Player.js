export default class Player {
  constructor(gameWidth, gameHeight, ctx, input) {
    this.gameWidth = canvas.width;
    this.gameHeight = canvas.height;
    this.ctx = ctx;
    this.width = 360;
    this.height = 190;
    this.x = 0;
    this.y = gameHeight - this.height;

    this.isJumping = false;
    this.isGliding = false;

    this.frameX = 0;
    this.frameY = 0;

    this.maxFrame = 5;
    this.fps = 16;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.speed = 0; // 1 FOR RIGHT, -1 FOR LEFT (NOT YET NEEDED HERE);

    this.input = input;
    this.velocity = 0;
    this.gravity = 1; //GRAVITY..LEAVES THE PLAYER WHERE HE BELONGS... ON THE X AXIS.

    this.playerSprite = new Image();
    this.playerSprite.src = './assets/DarylWalkAndJump.png';
  }

  draw() {
    this.jumping();
    this.ctx.drawImage(
      this.playerSprite,
      360 * this.frameX,
      360 * this.frameY,
      360,
      190,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(input, obstacle) {
    // SPRITE ANIMATION
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX >= this.maxFrame) {
        this.frameX = 0;
      } else {
        this.frameX++;
        this.frameTimer = 0;
      }
    } else {
      this.frameTimer += 20;
    }
  }

  //CHECKS IF GROUNDED
  grounded() {
    return this.y >= this.gameHeight - this.height;
  }

  // PRODUCES THE JUMP
  jumping() {
    if (this.isJumping) {
      if (this.grounded()) {
        this.velocity -= 60;
      } else {
        this.speed = 0;
      }
    }

    //HORIZONTAL MOVEMENT
    this.x += this.speed;
    if (this.x < 0) this.x = 0;
    else if (this.x > this.gameWidth - this.width)
      this.x = this.gameWidth - this.width;

    //DOWNWARD BORDERS
    if (this.y >= this.gameHeight - this.height) {
      this.y = this.gameHeight - this.height;
    }

    //UPWARD BORDERS
    if (this.y < 70) {
      this.gravity = 0.5;
      this.y = 70;
    }

    //VERTICAL MOVEMENT
    this.y += this.velocity;
    if (!this.grounded()) {
      this.velocity += this.gravity;
      this.frameY = 1; // SWITCHES TO JUMP SPRITE ANIMATION
      this.maxFrame = 6; // JUMP SRPITE
    } else {
      this.velocity = 0;
      this.maxFrame = 5;
      this.frameY = 0; // SWITCHES TO RUN SPRITE ANIMATION
    }
  }

  animate() {
    Player.update(input);
  }
}
