class Punto {
  constructor(x, y, type = 0) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  draw() {
    push();
    strokeWeight(3);
    stroke(50);
    if (this.type === 0) stroke(0, 0, 255);
    if (this.type === 2) stroke(0, 255, 0);
    point(this.x, this.y);
    pop();
  }
}
