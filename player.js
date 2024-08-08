export class Player {
  constructor(game) {
    this.game = game;
    this.width = 200;
    this.height = 200;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.image = document.getElementById("bunny");
  }
  update(input) {
    if (input.includes("ArrowRight")) this.x++;
    else if (input.includes("ArrowLeft")) this.x--;
    else if (input.includes("ArrowDown")) this.y++;
    else if (input.includes("ArrowUp")) this.y--;
  }
  draw(ctx) {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.drawImage(
      this.image,
      200, // source x
      200, // source y
      this.width, // source width
      this.height, //source height
      this.x, // destination x
      this.y, // destination y
      this.width, // destination width
      this.height //destination height
    );
  }
}
