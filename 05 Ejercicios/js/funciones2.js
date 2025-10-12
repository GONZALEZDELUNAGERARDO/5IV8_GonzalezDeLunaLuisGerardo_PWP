function validarn(e) {
  var teclado = (document.all) ? e.keyCode : e.which;
  if (teclado == 8) return true;
  var patron = /[0-9.]/;
  var codigo = String.fromCharCode(teclado);
  return patron.test(codigo);
}

function calcularComision() {
  let sueldo = parseFloat(document.getElementById("sueldoBase").value);
  let v1 = parseFloat(document.getElementById("venta1").value);
  let v2 = parseFloat(document.getElementById("venta2").value);
  let v3 = parseFloat(document.getElementById("venta3").value);

  if ([sueldo, v1, v2, v3].some(val => isNaN(val) || val < 0)) {
    alert("Por favor ingresa valores válidos en todos los campos.");
    return;
  }

  let totalVentas = v1 + v2 + v3;
  let comision = totalVentas * 0.10;
  let totalMes = sueldo + comision;

  document.getElementById("comision").value = "$ " + comision.toFixed(2);
  document.getElementById("totalMes").value = "$ " + totalMes.toFixed(2);
}

function borrarDatos() {
  document.getElementById("sueldoBase").value = "";
  document.getElementById("venta1").value = "";
  document.getElementById("venta2").value = "";
  document.getElementById("venta3").value = "";
  document.getElementById("comision").value = "";
  document.getElementById("totalMes").value = "";
}