export class GameOptions {
  constructor(tilesOnX, tilesOnY, img, divElement) {
    this.tilesOnX = tilesOnX; // only squares work for now
    this.tilesOnY = tilesOnY; // only squares work for now
    this.tileCount = this.tilesOnX * this.tilesOnY;

    const imgRect = img.getBoundingClientRect();
    const imgRatio = imgRect.width / imgRect.height;
    console.log("imgRatio " + imgRatio);

    const divElementRect = divElement.getBoundingClientRect();
    const divElementRatio = divElementRect.width / divElementRect.height;
    console.log("divElementRatio " + divElementRatio);

    if (imgRatio < divElementRatio) {
      this.boardHeight = divElementRect.height;
      this.boardWidth = imgRatio * this.boardHeight;
    } else {
      this.boardWidth = divElementRect.width;
      this.boardHeight = this.boardWidth / imgRatio;
    }

    this.tileWidth = this.boardWidth / this.tilesOnX;
    this.tileHeight = this.boardHeight / this.tilesOnY;
  }
  //   setBoardSize(boardWidth, boardHeight) {
  //     this.boardWidth = boardWidth;
  //     this.boardHeight = boardHeight;
  //     this.tileWidth = this.boardWidth / this.tilesOnX;
  //     this.tileHeight = this.boardHeight / this.tilesOnY;
  //   }
}
