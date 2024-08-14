import { paintings } from "./paintings.js";
import { GameOptions } from "./gameOptions.js";
import { Game } from "./game.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  var puzzleIndex = 0;
  var game = null;

  document.getElementById("next-puzzle").addEventListener("click", function () {
    if (puzzleIndex < paintings.length - 1) {
      puzzleIndex++;
      console.log("next puzzle" + puzzleIndex);
      loadGame();
    }
  });
  document.getElementById("prev-puzzle").addEventListener("click", function () {
    if (puzzleIndex > 0) {
      puzzleIndex--;
      console.log("prev puzzle" + puzzleIndex);
      loadGame();
    }
  });

  //console.log(game);

  function loadGame() {
    const painting = paintings[puzzleIndex];
    const image = document.getElementById(painting.assetId);
    const divElement = document.getElementById("gameplay");

    const gameOptions = new GameOptions(4, 4, image, divElement);

    canvas.width = gameOptions.boardWidth;
    canvas.height = gameOptions.boardHeight;

    game = new Game(gameOptions, image);
    const paintingName = document.getElementById("painting-name");
    paintingName.innerText = painting.title;
    const paintingYear = document.getElementById("painting-year");
    paintingYear.innerText = painting.year;
    const paintingAuthor = document.getElementById("painting-author");
    paintingAuthor.innerText = painting.author;
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  loadGame();
  animate();
});

window.addEventListener("resize", (event) => {
  // console.log(window.innerHeight + "x" + window.innerWidth);
  // console.log(document.getElementById("gameplay").getBoundingClientRect());
});
