export class GameOptions {
  constructor() {
    this.boardWidth = 600;
    this.boardHeight = 600;
    this.tilesOnX = 3;
    this.tilesOnY = 3;
    this.tileWidth = this.boardWidth / this.tilesOnX;
    this.tileHeight = this.boardHeight / this.tilesOnY;
    this.tileCount = this.tilesOnX * this.tilesOnY;
  }
}
