function compararNumeros() {
  const n1 = parseFloat(document.getElementById("num1").value);
  const n2 = parseFloat(document.getElementById("num2").value);
  let resultado;

  if (n1 === n2) {
    resultado = n1 * n2;
  } else if (n1 > n2) {
    resultado = n1 - n2;
  } else {
    resultado = n1 + n2;
  }

  document.getElementById("resultado1").textContent = resultado;
}

function mayorDeTres() {
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const c = parseFloat(document.getElementById("c").value);
  const mayor = Math.max(a, b, c);
  document.getElementById("resultado2").textContent = mayor;
}

function calcularPagoExtra() {
  const horas = parseFloat(document.getElementById("horas").value);
  const pagoHora = parseFloat(document.getElementById("pagoHora").value);
  let total;

  if (horas <= 40) {
    total = horas * pagoHora;
  } else {
    const extra = horas - 40;
    if (extra <= 8) {
      total = (40 * pagoHora) + (extra * pagoHora * 2);
    } else {
      const triple = extra - 8;
      total = (40 * pagoHora) + (8 * pagoHora * 2) + (triple * pagoHora * 3);
    }
  }

  document.getElementById("resultado3").textContent = `$${total.toFixed(2)}`;
}

function calcularUtilidad() {
  const salario = parseFloat(document.getElementById("salario").value);
  const años = parseFloat(document.getElementById("antiguedad").value);
  let porcentaje;

  if (años < 1) {
    porcentaje = 0.05;
  } else if (años < 2) {
    porcentaje = 0.07;
  } else if (años < 5) {
    porcentaje = 0.10;
  } else if (años < 10) {
    porcentaje = 0.15;
  } else {
    porcentaje = 0.20;
  }

  const utilidad = salario * porcentaje * 12;
  document.getElementById("resultado4").textContent = `$${utilidad.toFixed(2)}`;
}
