export class Tile {
  constructor(gameOptions, position, isEmpty, image) {
    this.gameOptions = gameOptions;
    this.originalPosition = position;
    this.currentPosition = position;
    this.isEmpty = isEmpty;
    this.calculateInitials();

    this.image = image; //document.getElementById("bunny");
  }
  isOnOriginalPosition() {
    return this.originalPosition === this.currentPosition;
  }
  calculateInitials() {
    this.calculatePos();
    this.calculateSource();
    this.calculateDest();
  }
  calculatePos() {
    this.posY = Math.floor(this.currentPosition / this.gameOptions.tilesOnX);
    this.posX = this.currentPosition % this.gameOptions.tilesOnX;
  }
  calculateSource() {
    this.sourceX = this.posX * this.gameOptions.tileWidth;
    this.sourceY = this.posY * this.gameOptions.tileHeight;
  }
  calculateDest() {
    this.destX = this.posX * this.gameOptions.tileWidth;
    this.destY = this.posY * this.gameOptions.tileHeight;
  }
  recalculate() {
    this.calculatePos();
    this.calculateDest();
  }
  update(currentPosition) {
    this.currentPosition = currentPosition;
    this.recalculate();
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
