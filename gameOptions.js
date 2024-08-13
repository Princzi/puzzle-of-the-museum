export class GameOptions {
  constructor() {
    // this.boardWidth = 10;
    // this.boardHeight = 10;
    this.tilesOnX = 4; // only squares work for now
    this.tilesOnY = 4; // only squares work for now
    // this.tileWidth = this.boardWidth / this.tilesOnX;
    // this.tileHeight = this.boardHeight / this.tilesOnY;
    this.tileCount = this.tilesOnX * this.tilesOnY;
  }
  setBoardSize(boardWidth, boardHeight) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.tileWidth = this.boardWidth / this.tilesOnX;
    this.tileHeight = this.boardHeight / this.tilesOnY;
  }
}
