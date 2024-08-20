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
  canSwipeTile(tile) {
    return (
      (tile.posX === this.emptyTile.posX &&
        Math.abs(tile.posY - this.emptyTile.posY) === 1) ||
      (tile.posY === this.emptyTile.posY &&
        Math.abs(tile.posX - this.emptyTile.posX) === 1)
    );
  }
  isOnOriginalPosition() {
    return this.tiles.every((e) => e.isOnOriginalPosition());
  }
  getTileToSwipe(keys) {
    const key = keys.length ? keys[0] : null;
    if (!key) return null;

    if (key.type === "click") {
    } else if (key.type === "keydown") {
    }
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
    } else {
      const key = keys.length ? keys[0] : null;
      if (!this.moving && key && key.type === "click") {
        keys.splice(0, 1);
        for (var i = 0; i < this.tiles.length; i++) {
          const tile = this.tiles[i];
          if (tile.isCollision(key.value.x, key.value.y)) {
            if (!this.canSwipeTile(tile)) {
              this.cantSlideAudio.play();
              return;
            }
            this.tileToSwipe = tile;
            const emptyTileCurrentPosition = this.emptyTile.currentPosition;
            this.emptyTile.setPosition(this.tileToSwipe.currentPosition);

            this.tileToSwipe.setPosition(emptyTileCurrentPosition);
            this.slideAudio.play();

            this.emptyTile.update();
            this.tileToSwipe.update();
            this.moving = true;
          }
        }
      }

      if (!this.moving && key && key.type === "keydown") {
        keys.splice(0, 1);
        const keyAction = this.keyActions.find((e) => e.key === key.value);
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
  }
  draw(ctx) {
    for (var i = 0; i < this.tiles.length; i++) {
      this.tiles[i].draw(ctx);
    }
  }
}
