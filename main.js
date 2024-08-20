import { paintings } from "./paintings.js";
import { GameOptions } from "./gameOptions.js";
import { Game } from "./game.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  var puzzleIndex = 0;
  var game = null;
  const games = [];
  const nextPuzzleButton = document.getElementById("next-puzzle");
  const prevPuzzleButton = document.getElementById("prev-puzzle");

  nextPuzzleButton.addEventListener("click", () => loadGame(++puzzleIndex));
  prevPuzzleButton.addEventListener("click", () => loadGame(--puzzleIndex));

  document.getElementById("peek").addEventListener("mousedown", function () {
    const painting = paintings[puzzleIndex];
    console.log("mousedown");
    const paintingPeek = document.getElementById(painting.assetId + "-peek");
    paintingPeek.style.display = "block";

    paintingPeek.style.width = "" + game.boardWidth / 4 + "px";
    // setTimeout(() => {
    //   paintingPeek.style.display = "none";
    // }, "3000");
  });

  function loadGame(puzzleIndex) {
    if (games.length <= puzzleIndex) {
      const game = new Game(puzzleIndex);
      games.push(game);
    }

    game = games[puzzleIndex];
    game.load();

    canvas.width = game.gameOptions.boardWidth;
    canvas.height = game.gameOptions.boardHeight;
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  loadGame(puzzleIndex);
  animate();
});

window.addEventListener("resize", (event) => {
  // console.log(window.innerHeight + "x" + window.innerWidth);
  // console.log(document.getElementById("gameplay").getBoundingClientRect());
});
