import { InputHandler } from "./input.js";
import { Board } from "./board.js";
import { paintings } from "./paintings.js";
import { GameOptions } from "./gameOptions.js";

export class Game {
  constructor(puzzleIndex) {
    this.paintings = paintings;
    this.puzzleIndex = puzzleIndex;
    this.solved = false;
    this.painting = this.paintings[this.puzzleIndex];
    this.image = document.getElementById(this.painting.assetId);
    this.divElement = document.getElementById("gameplay");
    this.nextPuzzleButton = document.getElementById("next-puzzle");
    this.prevPuzzleButton = document.getElementById("prev-puzzle");

    this.gameOptions = new GameOptions(
      this.painting.tilesOnX,
      this.painting.tilesOnY,
      this.image,
      this.divElement
    );

    this.board = new Board(this.gameOptions, this.image);
    this.input = new InputHandler();

    this.paintingNameElement = document.getElementById("painting-name");
    this.paintingYearElement = document.getElementById("painting-year");
    this.paintingAuthorElement = document.getElementById("painting-author");
  }
  load() {
    this.input.keys = [];
    this.paintingNameElement.innerText = this.painting.title;
    this.paintingYearElement.innerText = this.painting.year;
    this.paintingAuthorElement.innerText = this.painting.author;
    this.adjustNextPrevAvailability();
  }
  adjustNextPrevAvailability() {
    this.nextPuzzleButton.disabled = !(
      this.puzzleIndex < this.paintings.length - 1 && this.solved === true
    );
    this.prevPuzzleButton.disabled = this.puzzleIndex === 0;
  }
  update() {
    if (this.board.update(this.input.keys) === true) {
      if (this.solved === false) {
        this.solved = true;
        this.adjustNextPrevAvailability();

        setTimeout(() => {
          alert("isOnOriginalPosition!!!");
        }, "10");
      }
    }
  }
  draw(ctx) {
    this.board.draw(ctx);
  }
}
