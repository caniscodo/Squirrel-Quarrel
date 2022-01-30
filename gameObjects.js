class GameObject {
  constructor(gameWidth, gameHeight, ctx) {
    this.gameWidth = canvas.width;
    this.gameHeight = canvas.height;
    this.ctx = ctx;
  }

  getBoundingBox() {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      w: this.width,
      h: this.height,
    };
  }
}

export default GameObject;
