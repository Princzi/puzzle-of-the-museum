export class InputHandler {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (this.isControlKey(e.key) && this.keys.indexOf(e.key) < 0) {
        this.keys.push(e.key);
      }
      console.log(e.key, this.keys);
    });
    window.addEventListener("keyup", (e) => {
      if (this.isControlKey(e.key)) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
      console.log(e.key, this.keys);
    });
  }
  isControlKey(key) {
    return (
      key === "ArrowDown" ||
      key === "ArrowUp" ||
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "Enter"
    );
  }
}
