import { Tile } from "./tile.js";
import { InputHandler } from "./input.js";
import { GameOptions } from "./gameOptions.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const gameOptions = new GameOptions();
  canvas.width = gameOptions.boardWidth;
  canvas.height = gameOptions.boardHeight;
  // canvas.addEventListener('click', function() { }, false);

  class Game {
    constructor(gameOptions) {
      this.gameOptions = gameOptions;
      this.createTiles();

      this.input = new InputHandler();
    }
    update() {
      //   this.tile4.update(this.input.keys);
      //   this.tile0.update(this.input.keys);

      const emptyPosX = this.emptyTile.posX;
      const emptyPosY = this.emptyTile.posY;

      if (this.input.keys.includes("ArrowRight")) {
        this.swapWith(emptyPosX - 1, emptyPosY);
        this.input.keys.splice(this.input.keys.indexOf("ArrowRight"), 1);
      } else if (this.input.keys.includes("ArrowLeft")) {
        this.swapWith(emptyPosX + 1, emptyPosY);
        this.input.keys.splice(this.input.keys.indexOf("ArrowLeft"), 1);
      } else if (this.input.keys.includes("ArrowDown")) {
        this.swapWith(emptyPosX, emptyPosY - 1);
        this.input.keys.splice(this.input.keys.indexOf("ArrowDown"), 1);
      } else if (this.input.keys.includes("ArrowUp")) {
        this.swapWith(emptyPosX, emptyPosY + 1);
        this.input.keys.splice(this.input.keys.indexOf("ArrowUp"), 1);
      }

      //this.tiles.find(e => e.)
    }
    swapWith(posX, posY) {
      if (this.canSwapWith(posX, posY)) {
        //console.log(" swap with " + posX + "," + posY);
        console.log("swap");
        const tileToSwap = this.tiles.find(
          (e) => e.posX === posX && e.posY === posY
        );

        const tempX = this.emptyTile.posX;
        const tempY = this.emptyTile.posY;

        this.emptyTile.update(posX, posY);
        tileToSwap.update(tempX, tempY);
        console.log(tileToSwap);
        console.log(this.emptyTile);
      }
    }
    canSwapWith(posX, posY) {
      return (
        posX < this.gameOptions.tilesOnX &&
        posX >= 0 &&
        posY < this.gameOptions.tilesOnY &&
        posY >= 0
      );
    }
    draw(ctx) {
      for (var i = 0; i < this.tiles.length; i++) {
        const tile = this.tiles[i];
        tile.draw(ctx);
      }
    }
    createTiles() {
      console.log("create tiles");
      this.tiles = [];
      for (var i = 0; i < this.gameOptions.tileCount - 1; i++) {
        const tile = new Tile(this.gameOptions, i, false);
        this.tiles.push(tile);
      }
      this.emptyTile = new Tile(
        this.gameOptions,
        this.gameOptions.tileCount - 1,
        true
      );
      this.tiles.push(this.emptyTile);
    }
  }

  const game = new Game(gameOptions);
  console.log(game);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});
