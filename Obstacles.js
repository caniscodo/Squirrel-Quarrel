export default class Obstacle {
  constructor(gameWidth, gameHeight, ctx) {
    this.gameWidth = canvas.width;
    this.gameHeight = canvas.height;
    this.ctx = ctx;

    this.width = 200;
    this.height = 200;
    this.x = this.gameWidth - 100;
    this.y = this.gameHeight - this.height;
    this.frameX = 0;

    //VAR. FOR GENERATING OBSTACLES
    this.allObstacles = new Array();
    this.type = this.getRandomNumber(0, 10);
    this.allObstaclesNum = this.getRandomNumber(1, 2);

    //VAR. OBSTACLE ATTRIBUTES
    this.slideSpeed = 15;
    this.maxFrame = 4;
    this.fps = 8;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;

    //VAR. CAN ATTRIBUTES
    this.canX = -20;
    this.canY = -20;
    this.canWidth = this.width;
    this.canHeight = this.height;

    //VAR. GNOME ATTRIBUTES
    this.gnomeX = this.x + 80;
    this.gnomeY = this.y + 30;
    this.gnomeWidth = this.width - 105;
    this.gnomeHeight = this.height;

    //VAR. BUSH ATTRIBUTES
    this.bushX = this.x + 70;
    this.bushY = this.y;
    this.bushWidth = 167;
    this.bushHeight = 101;

    //VAR. BALL ATTRIBUTES
    this.ballX = this.x + 60;
    this.ballY = this.y + 60;
    this.ballWidth = this.width;
    this.ballHeight = this.height;

    this.init();
  }

  //GENERATES RANDOM NUMBERS
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //CAN SLIDE SPEED
  canSlide() {
    this.canX += this.slideSpeed = 15;
    this.canY += this.slideSpeed = this.getRandomNumber(10, 12);
  }

  //FILLING 'BOXES' OF OBSTACLE ARRAY
  init() {
    this.allObstacles[0] = new Image();
    this.allObstacles[0].src = './assets/cansSprite.png';

    this.allObstacles[1] = new Image();
    this.allObstacles[1].src = './assets/gnomeSprite.png';

    this.allObstacles[2] = new Image();
    this.allObstacles[2].src = './assets/bushTest.png';
  }

  //DECIDES IF A THROWN OBJECT OR A SOLID OBJECT APPEARS
  throwOrSolid() {
    if (this.type === 0) {
      this.throwCans();
    } else {
      this.drawAllSolidObstacles();
    }
  }

  throwCans() {
      this.ctx.drawImage(
        this.allObstacles[0],
        200 * this.frameX,
        0,
        200,
        this.height,
        this.canX,
        this.canY,
        this.canWidth,
        this.canHeight
      );
    }
  

  drawAllSolidObstacles() {
    //GNOME
    if (this.allObstaclesNum === 1) {
      this.ctx.drawImage(
        this.allObstacles[1],
        95 * this.frameX,
        0,
        95,
        this.gnomeHeight,
        this.x,
        this.y,
        this.gnomeWidth,
        this.gnomeHeight
      );

      //BUSH
    } else if (this.allObstaclesNum === 2) {
      this.ctx.drawImage(
        this.allObstacles[2],
        167 * this.frameX,
        0,
        167,
        101,
        this.x,
        this.gameHeight - this.bushHeight,
        this.bushWidth,
        this.bushHeight
      );
    }
  }

  update() {
    //INCREASES FRAMEX IF THE INTERVAL IS BIGGER THAN THE FRAMETIMER AND RESETS FRAMEX IF THE MAXIMUM NUMBER OF FRAMES IS REACHED
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX >= this.maxFrame) {
        this.frameX = 0;
      } else {
        this.frameX++;
        this.frameTimer = 0;
      }
    } else {
      this.frameTimer += 10;
    }

    //CALLS THE DECISION OF THE TYPE
    this.throwOrSolid();

    //DECIDES WHICH SLIDE SPEED IS USED
    if (this.type === 0) {
      this.canSlide();
    } else {
      this.x -= this.slideSpeed;
    }
  }
}
