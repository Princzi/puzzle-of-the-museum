export class Tile {
  constructor(gameOptions, position, isEmpty) {
    this.gameOptions = gameOptions;
    this.originalPosition = position;
    this.currentPosition = position;
    this.isEmpty = isEmpty;

    this.calculatePosX();
    this.calculatePosY();
    this.calculateSourceX();
    this.calculateSourceY();
    this.calculateDestX();
    this.calculateDestY();

    this.image = document.getElementById("bunny");
  }
  calculatePosX() {
    this.posX = Math.floor(this.currentPosition / this.gameOptions.tilesOnX);
  }
  calculatePosY() {
    this.posY = this.currentPosition % this.gameOptions.tilesOnX;
  }
  calculateSourceX() {
    this.sourceX = this.posX * this.gameOptions.tileWidth;
  }
  calculateSourceY() {
    this.sourceY = this.posY * this.gameOptions.tileHeight;
  }
  calculateDestX() {
    this.destX = this.posX * this.gameOptions.tileWidth;
  }
  calculateDestY() {
    this.destY = this.posY * this.gameOptions.tileHeight;
  }
  update(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.calculateDestX();
    this.calculateDestY();
    // if (input.includes("ArrowRight")) this.x++;
    // else if (input.includes("ArrowLeft")) this.x--;
    // else if (input.includes("ArrowDown")) this.y++;
    // else if (input.includes("ArrowUp")) this.y--;
  }
  draw(ctx) {
    if (this.isEmpty) {
      ctx.fillStyle = "gray";
      ctx.fillRect(
        this.destX,
        this.destY,
        this.gameOptions.tileWidth,
        this.gameOptions.tileHeight
      );
    } else {
      ctx.drawImage(
        this.image,
        this.sourceX, // source x
        this.sourceY, // source y
        this.gameOptions.tileWidth, // source width
        this.gameOptions.tileHeight, //source height
        this.destX, // destination x
        this.destY, // destination y
        this.gameOptions.tileWidth, // destination width
        this.gameOptions.tileHeight //destination height
      );
    }
  }
}
