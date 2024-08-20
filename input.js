export class InputHandler {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (this.isControlKey(e.key) && this.keys.indexOf(e.key) < 0) {
        this.keys.push({ type: "keydown", value: e.key });
      }
      console.log(e.key, this.keys);
    });

    const canvas = document.getElementById("canvas1");
    canvas.addEventListener("click", (e) => {
      const clientRect = canvas.getBoundingClientRect();

      const x = e.clientX - clientRect.left;
      const y = e.clientY - clientRect.top;

      this.keys.push({ type: "click", value: { x: x, y: y } });
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
