function validarn(e) {
  var teclado = (document.all) ? e.keyCode : e.which;
  if (teclado == 8) return true;
  var patron = /[0-9]/;
  var codigo = String.fromCharCode(teclado);
  return patron.test(codigo);
}

function calcularEdad() {
  let anioNacimiento = parseInt(document.getElementById("anioNacimiento").value);
  let anioActual = new Date().getFullYear();

  if (isNaN(anioNacimiento) || anioNacimiento <= 1900 || anioNacimiento > anioActual) {
    alert("Por favor ingresa un año de nacimiento válido.");
    return;
  }

  let edad = anioActual - anioNacimiento;
  document.getElementById("edad").value = edad + " años";
}

function borrarDatos() {
  document.getElementById("anioNacimiento").value = "";
  document.getElementById("edad").value = "";
}