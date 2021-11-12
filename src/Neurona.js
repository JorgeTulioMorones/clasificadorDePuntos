class Neurona {
  /**
   *
   * @param {Array<number>} capas - 0 = entrada, 1 = oculta, 2 = salida
   * @param {number} alfa
   */
  constructor(capas, alfa) {
    this.capas = capas;
    this.alfa = alfa;

    this.pesosOcultos = [];
    this.biasOculto = [];
    this.salidasOcultas = [];

    this.pesosSalida = [];
    this.biasSalida = [];
    this.salidasSalida = [];

    this.pesosOcultos = this.llenarMatriz(capas[0], capas[1]);
    this.llenarArrays(capas[1], this.biasOculto);

    this.pesosSalida = this.llenarMatriz(capas[1], capas[2]);
    this.llenarArrays(capas[2], this.biasSalida);
  }

  clasificar(pos) {
    /** Calculo de la salidda de la capa oculta */
    this.salidasOcultas = this.salidas(
      pos,
      this.capas[0],
      this.capas[1],
      this.pesosOcultos,
      this.biasOculto
    );

    /** Calciulo de la salidda de la capa de salida */
    this.salidasSalida = this.salidas(
      this.salidasOcultas,
      this.capas[1],
      this.capas[2],
      this.pesosSalida,
      this.biasSalida
    );

    /* Redondeado del resultante de las salidas*/
    return this.salidasSalida.map((valor) => Math.round(valor));
  }

  salidas(pos, ancho, alto, pesos, bias) {
    let salidas = [];
    let resultado;

    for (let i = 0; i < alto; i++) {
      resultado = bias[i];
      for (let j = 0; j < ancho; j++) {
        resultado += pos[j] * pesos[j][i];
      }
      salidas[i] = this.fS(resultado);
    }

    return salidas;
  }

  entrenamiento(pos, valores) {
    let cambioSalida = [];
    let cambioOculto = [];

    // Comenzamos la clasificacion
    this.clasificar(pos);

    let i = 0;

    while (i < this.capas[2]) {
      cambioSalida[i] =
        (valores[i] - Math.round(this.salidasSalida[i])) *
        this.dFS(this.salidasSalida[i]);
      i++;
    }

    i = 0;

    while (i < this.capas[1]) {
      let error = 0;
      let j = 0;
      while (j < this.capas[2]) {
        error += this.pesosSalida[i][j] * cambioSalida[j];
        j++;
      }
      cambioOculto[i] = error * this.dFS(this.salidasOcultas[i]);
      i++;
    }

    this.biasSalida = this.biasSalida.map(
      (valor, indice) => valor + this.alfa * cambioSalida[indice]
    );

    this.biasOculto = this.biasOculto.map(
      (valor, indice) => valor + this.alfa * cambioOculto[indice]
    );

    /** Actualizacion de pesos  */
    for (i = 0; i < this.salidasOcultas.length; i++) {
      for (let j = 0; j < pos.length; j++) {
        this.pesosSalida[i][j] + this.salidasOcultas[i] * pos[j] * this.alfa;
      }
    }

    for (i = 0; i < pos.length; i++) {
      for (let j = 0; j < cambioOculto.length; j++) {
        this.pesosOcultos[i][j] + pos[i] * cambioOculto[j] * this.alfa;
      }
    }
  }

  llenarArrays(limite = 0, array = []) {
    for (let index = 0; index < limite; index++) {
      array[index] = this.generarRandom(1, -1);
    }
  }

  llenarMatriz(limiteI = 0, limiteJ = 1) {
    return Array(limiteI)
      .fill()
      .map(() =>
        Array(limiteJ)
          .fill()
          .map(() => this.generarRandom(1, -1))
      );
  }

  //Función sigmoide
  fS = (x) => {
    return 1 / (1 + Math.exp(-x));
  };
  //Derivada de sigmoide
  dFS = (x) => {
    return this.fS(x) * (1 - this.fS(x));
  };

  generarRandom = (max = 1, min = 0) => Math.random() * (max - min) + min;
}
