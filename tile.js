import { MovingFunction } from "./movingFunction.js";

export class Tile {
  constructor(gameOptions, position, isEmpty, image) {
    this.gameOptions = gameOptions;
    this.originalPosition = position;
    this.currentPosition = position;
    this.isEmpty = isEmpty;
    this.image = image;
    this.movingFunction = new MovingFunction();

    this.calculateInitials();
  }
  isOnOriginalPosition() {
    return this.originalPosition === this.currentPosition;
  }
  calculateInitials() {
    this.arrivedOnPosition = true;
    this.calculatePos();
    this.calculateSource();
    this.calculateDest();
    this.x = this.destX;
    this.y = this.destY;
  }
  calculatePos() {
    this.posY = Math.floor(this.currentPosition / this.gameOptions.tilesOnX);
    this.posX = this.currentPosition % this.gameOptions.tilesOnX;
  }
  calculateSource() {
    const rect = this.image.getBoundingClientRect();
    this.imageWidth = rect.width;
    this.imageHeight = rect.height;
    this.sourceTileWidth = this.imageWidth / this.gameOptions.tilesOnX;
    this.sourceTileHeight = this.imageHeight / this.gameOptions.tilesOnY;
    this.sourceX = this.posX * this.sourceTileWidth;
    this.sourceY = this.posY * this.sourceTileHeight;
  }
  calculateDest() {
    this.destX = this.posX * this.gameOptions.tileWidth;
    this.destY = this.posY * this.gameOptions.tileHeight;
  }
  recalculate() {
    this.calculatePos();
    this.calculateDest();
  }
  setPosition(currentPosition) {
    this.currentPosition = currentPosition;
    this.recalculate();
    this.arrivedOnPosition = false;
  }
  isCollision(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.gameOptions.tileWidth &&
      y >= this.y &&
      y <= this.y + this.gameOptions.tileHeight
    );
  }
  update() {
    if (this.x === this.destX && this.y === this.destY) {
      this.arrivedOnPosition = true;
      this.movingFunction.reset();
      return;
    }

    if (this.x !== this.destX)
      this.x = this.movingFunction.moveToDestination(this.x, this.destX);
    if (this.y !== this.destY)
      this.y = this.movingFunction.moveToDestination(this.y, this.destY);
  }
  draw(ctx) {
    if (this.isEmpty) {
      //   ctx.fillStyle = "red";
      //   ctx.fillRect(
      //     this.x,
      //     this.y,
      //     this.gameOptions.tileWidth,
      //     this.gameOptions.tileHeight
      //   );
    } else {
      ctx.drawImage(
        this.image,
        this.sourceX, // source x
        this.sourceY, // source y
        this.sourceTileWidth, // source width
        this.sourceTileHeight, //source height
        this.x, // destination x
        this.y, // destination y
        this.gameOptions.tileWidth, // destination width
        this.gameOptions.tileHeight //destination height
      );
    }
  }
}
