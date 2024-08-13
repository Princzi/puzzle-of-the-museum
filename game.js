import { InputHandler } from "./input.js";
import { Board } from "./board.js";

export class Game {
  constructor(gameOptions, imageId) {
    this.gameOptions = gameOptions;
    this.image = document.getElementById(imageId);
    this.board = new Board(gameOptions, imageId);
    this.input = new InputHandler();
  }
  update() {
    this.board.update(this.input.keys);
  }
  draw(ctx) {
    this.board.draw(ctx);
  }
}
