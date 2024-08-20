import { InputHandler } from "./input.js";
import { Board } from "./board.js";

export class Game {
  constructor(gameOptions, img) {
    this.gameOptions = gameOptions;
    this.img = img;
    this.board = new Board(gameOptions, img);
    this.input = new InputHandler();
  }
  load() {
    this.input.keys = [];
  }
  update() {
    this.board.update(this.input.keys);
  }
  draw(ctx) {
    this.board.draw(ctx);
  }
}
