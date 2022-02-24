import canvasProperties from "./canvasProperties.js";

export default class background extends canvasProperties{
  constructor(gameWidth, gameHeight, ctx) {
    super(gameWidth, gameHeight, ctx)
    this.x = 0;
    this.y = 0;
    this.width = 2400; 
    this.height = 600;
    this.speed = 8;
  
    this.backgroundImage = new Image();
    this.backgroundImage.src = './assets/SquireelQuarrel Background.png';
  }

  // DRAWS THE BACKGROUND
  draw(ctx) {
    this.ctx.drawImage(
      this.backgroundImage,
      this.x,
      this.y, 
      this.width,
      this.height
    ) 
    this.ctx.drawImage(
      this.backgroundImage,
      this.x + this.width, 
      this.y,
      this.width,
      this.height
    )
  }

  // UPDATES THE BACKGROUND EVERY FRAME IMPORTANT FOR SLIDING 
  update() {
    this.x -= this.speed;
    if(this.x < 0 -this.width){
        this.x = 0;
    }
  }
}
