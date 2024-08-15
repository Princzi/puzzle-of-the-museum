export class MovingFunction {
  constructor() {
    this.n = 5;
  }
  moveToDestination(e, destination) {
    if (e === destination) return;

    if (e < destination) {
      e = e + this.n;
      if (e > destination) e = destination;
    } else {
      e = e - this.n;
      if (e < destination) e = destination;
    }

    this.n += 5;
    return e;
  }
  reset() {
    this.n = 5;
  }
}
