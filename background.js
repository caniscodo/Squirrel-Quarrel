export default class background {
  constructor(gameWidth, gameHeight, ctx) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.width = 2400; //make background accordingly!
    this.height = 550;
    this.speed = 8;
    

    this.backgroundImage = new Image();
    this.backgroundImage.src = './assets/SquireelQuarrel Background.png';
  }

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
      this.x + this.width, //-this.speed to delete the gap between the two backgrounds
      this.y,
      this.width,
      this.height
    )
  }
  update() {
    this.x -= this.speed;
    if(this.x < 0 -this.width){
        this.x = 0;
    }
  }
}
