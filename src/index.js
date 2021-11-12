const WIDTH = 300;
const HEIGHT = 300;

let redN;

const circuloUno = { x: 280, y: -70 };
const circuloDos = { x: 70, y: -280 };

const puntos = [];

function setup() {
  createCanvas(WIDTH * 2, HEIGHT * 2);
  frameRate(6);

  redN = new Neurona([2, 3, 2], 0.05);
}

function draw() {
  background(250);
  drawCircles();
  translate(WIDTH / 2, HEIGHT / 2);
  scale(1, -1);

  for (let i = 0; i < 50; i++) {
    puntos.push(
      new Punto(
        generarRandom(circuloUno.x + 60, circuloUno.x - 60),
        generarRandom(circuloUno.y + 60, circuloUno.y - 60)
      )
    );
    puntos.push(
      new Punto(
        generarRandom(circuloUno.x + 60, circuloUno.x - 60),
        generarRandom(circuloUno.y + 60, circuloUno.y - 60)
      )
    );
  }

  for (let punto of puntos) {
    let tipo = [0, 0, 0];
    if (dist(punto.x, punto.y, circuloUno.x, circuloUno.y) < 60) tipo[0] = 1;
    if (dist(punto.x, punto.y, circuloDos.x, circuloDos.y) < 60) tipo[1] = 1;

    redN.entrenamiento([punto.x, punto.y], tipo);

    punto.type = getTipo(redN.clasificar([punto.x, punto.y]));
    punto.draw();
  }
}

function getTipo(valores = []) {
  if (valores[0] == 1 && (valores[1] == 0) == 0) {
    return 1;
  } else if (valores[0] == 0 && (valores[1] == 1) == 0) {
    return 2;
  } else {
    return 0;
  }
}

function drawCircles() {
  push();
  translate(WIDTH / 2, HEIGHT / 2);
  scale(1, -1);
  fill(0, 0, 0, 0);
  stroke(0, 0, 255);
  ellipse(circuloUno.x, circuloUno.y, 60 * 2);
  stroke(0, 255, 0);
  ellipse(circuloDos.x, circuloDos.y, 60 * 2);
  pop();
}

generarRandom = (max = 1, min = 0) => Math.random() * (max - min) + min;
