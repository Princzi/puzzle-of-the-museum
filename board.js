import { Tile } from "./tile.js";
import { keyActions } from "./keyActions.js";

export class Board {
  constructor(gameOptions, img) {
    this.gameOptions = gameOptions;
    this.img = img;
    this.tiles = [];
    this.createTiles();
    this.keyActions = keyActions;
    this.moving = false;

    this.slideAudio = document.getElementById("slide");
    this.cantSlideAudio = document.getElementById("cant-slide");
  }
  createTiles() {
    for (var i = 0; i < this.gameOptions.tileCount; i++) {
      const isEmptyTile = i === this.gameOptions.tileCount - 1;
      const tile = new Tile(this.gameOptions, i, isEmptyTile, this.img);
      this.tiles.push(tile);
    }
    this.emptyTile = this.tiles[this.tiles.length - 1];
    this.tileToSwipe = null;
  }
  canSwipeToPosition(x, y) {
    return (
      x < this.gameOptions.tilesOnX &&
      x >= 0 &&
      y < this.gameOptions.tilesOnY &&
      y >= 0
    );
  }
  isOnOriginalPosition() {
    return this.tiles.every((e) => e.isOnOriginalPosition());
  }
  update(keys) {
    if (this.moving) {
      this.emptyTile.update();
      this.tileToSwipe.update();

      if (this.tileToSwipe.arrivedOnPosition === true) {
        this.moving = false;
        this.tileToSwipe = null;
        if (this.isOnOriginalPosition()) {
          return true;
        }
      }
    }

    const key = keys.length ? keys[0] : null;
    if (!this.moving && key) {
      keys.splice(0, 1);
      const keyAction = this.keyActions.find((e) => e.key === key);
      const x = keyAction.onX(this.emptyTile.posX);
      const y = keyAction.onY(this.emptyTile.posY);

      if (!this.canSwipeToPosition(x, y)) {
        this.cantSlideAudio.play();
        return;
      }
      this.tileToSwipe = this.tiles.find((e) => e.posX === x && e.posY === y);
      const emptyTileCurrentPosition = this.emptyTile.currentPosition;
      this.emptyTile.setPosition(this.tileToSwipe.currentPosition);

      this.tileToSwipe.setPosition(emptyTileCurrentPosition);
      this.slideAudio.play();

      this.emptyTile.update();
      this.tileToSwipe.update();
      this.moving = true;
    }
  }
  draw(ctx) {
    for (var i = 0; i < this.tiles.length; i++) {
      this.tiles[i].draw(ctx);
    }
  }
}
