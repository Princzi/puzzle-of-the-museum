import { Tile } from "./tile.js";
import { keyActions } from "./keyActions.js";

export class Board {
  constructor(gameOptions, imageId) {
    this.gameOptions = gameOptions;
    this.image = document.getElementById(imageId);

    this.tiles = [];
    this.createTiles();
    this.keyActions = keyActions;
  }
  createTiles() {
    for (var i = 0; i < this.gameOptions.tileCount; i++) {
      const isEmptyTile = i === this.gameOptions.tileCount - 1;
      const tile = new Tile(this.gameOptions, i, isEmptyTile, this.image);
      this.tiles.push(tile);
    }
    this.emptyTile = this.tiles[this.tiles.length - 1];
  }
  swipeToPosition(x, y) {
    if (!this.canSwipeToPosition(x, y)) return;

    const tileToSwipe = this.tiles.find((e) => e.posX === x && e.posY === y);
    const emptyTileCurrentPosition = this.emptyTile.currentPosition;
    this.emptyTile.update(tileToSwipe.currentPosition);
    tileToSwipe.update(emptyTileCurrentPosition);
  }
  canSwipeToPosition(x, y) {
    return (
      x < this.gameOptions.tilesOnX &&
      x >= 0 &&
      y < this.gameOptions.tilesOnY &&
      y >= 0
    );
  }
  update(keys) {
    const key = keys.length ? keys[0] : null;
    if (key) {
      console.log(key);
      keys.splice(0, 1);

      const keyAction = this.keyActions.find((e) => e.key === key);
      const x = keyAction.onX(this.emptyTile.posX);
      const y = keyAction.onY(this.emptyTile.posY);
      this.swipeToPosition(x, y);
    }
  }
  draw(ctx) {
    for (var i = 0; i < this.tiles.length; i++) {
      this.tiles[i].draw(ctx);
    }
  }
}
