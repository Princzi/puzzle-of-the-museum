export class Tile {
  constructor(gameOptions, position, isEmpty) {
    this.gameOptions = gameOptions;
    this.originalPosition = position;
    this.currentPosition = position;
    this.isEmpty = isEmpty;
    this.calculateInitials();

    this.image = document.getElementById("bunny");
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
    console.log(this.originalPosition + " update to " + currentPosition);
    this.currentPosition = currentPosition;
    this.recalculate();
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
