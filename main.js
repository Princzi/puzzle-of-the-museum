//import { InputHandler } from "./input.js";
import { GameOptions } from "./gameOptions.js";
import { Game } from "./game.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const gameOptions = new GameOptions();

  //const imageId = "dancers-in-blue"; //
  const imageId = "cafe-terrace"; //

  // canvas.addEventListener('click', function() { }, false);
  const image = document.getElementById(imageId);
  //console.log(image.getBoundingClientRect());
  const imgRect = image.getBoundingClientRect();
  const imgRatio = imgRect.width / imgRect.height;
  const gameplayRect = document
    .getElementById("gameplay")
    .getBoundingClientRect();
  console.log(window.innerHeight + "x" + window.innerWidth);
  console.log(gameplayRect);

  const isVertical = imgRect.height >= imgRect.width;

  if (isVertical) {
    const boardHeight = gameplayRect.height;
    const boardWidth = imgRatio * boardHeight;
    gameOptions.setBoardSize(boardWidth, boardHeight);
  }

  canvas.width = gameOptions.boardWidth;
  canvas.height = gameOptions.boardHeight;

  //image.

  const game = new Game(gameOptions, imageId);
  //console.log(game);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});

window.addEventListener("resize", (event) => {
  console.log(window.innerHeight + "x" + window.innerWidth);
  console.log(document.getElementById("gameplay").getBoundingClientRect());
});
