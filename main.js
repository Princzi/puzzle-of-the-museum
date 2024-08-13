import { InputHandler } from "./input.js";
import { GameOptions } from "./gameOptions.js";
import { Board } from "./board.js";

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
      this.board = new Board(gameOptions, "bunny");
      this.input = new InputHandler();
    }
    update() {
      this.board.update(this.input.keys);
    }
    draw(ctx) {
      this.board.draw(ctx);
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
