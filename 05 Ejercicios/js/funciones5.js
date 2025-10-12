function validarn(e) {
  var teclado = (document.all) ? e.keyCode : e.which;
  if (teclado == 8) return true;
  var patron = /[0-9]/;
  var codigo = String.fromCharCode(teclado);
  return patron.test(codigo);
}

function calcularPorcentajes() {
  let total = parseInt(document.getElementById("total").value);
  let mujeres = parseInt(document.getElementById("mujeres").value);
  let hombres = parseInt(document.getElementById("hombres").value);

  if ([total, mujeres, hombres].some(val => isNaN(val) || val < 0)) {
    alert("Por favor ingresa valores válidos.");
    return;
  }

  if (mujeres + hombres !== total) {
    alert("La suma de hombres y mujeres debe ser igual al total de alumnos.");
    return;
  }

  let porcentajeMujeres = (mujeres / total) * 100;
  let porcentajeHombres = (hombres / total) * 100;

  document.getElementById("porcentajeMujeres").value = porcentajeMujeres.toFixed(2) + " %";
  document.getElementById("porcentajeHombres").value = porcentajeHombres.toFixed(2) + " %";
}

function borrarDatos() {
  document.getElementById("total").value = "";
  document.getElementById("mujeres").value = "";
  document.getElementById("hombres").value = "";
  document.getElementById("porcentajeMujeres").value = "";
  document.getElementById("porcentajeHombres").value = "";
}