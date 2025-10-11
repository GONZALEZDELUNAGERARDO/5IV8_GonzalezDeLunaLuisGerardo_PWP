function validarn(e) {
  var teclado = (document.all) ? e.keyCode : e.which;
  if (teclado == 8) return true;
  var patron = /[0-9.]/;
  var codigo = String.fromCharCode(teclado);
  return patron.test(codigo);
}

function calcularCalificacion() {
  let p1 = parseFloat(document.getElementById("parcial1").value);
  let p2 = parseFloat(document.getElementById("parcial2").value);
  let p3 = parseFloat(document.getElementById("parcial3").value);
  let examen = parseFloat(document.getElementById("examen").value);
  let trabajo = parseFloat(document.getElementById("trabajo").value);

  if ([p1, p2, p3, examen, trabajo].some(val => isNaN(val) || val < 0 || val > 10)) {
    alert("Por favor ingresa calificaciones válidas entre 0 y 10.");
    return;
  }

  let promedioParciales = (p1 + p2 + p3) / 3;
  let calificacionFinal = (promedioParciales * 0.55) + (examen * 0.30) + (trabajo * 0.15);

  document.getElementById("calificacionFinal").value = calificacionFinal.toFixed(2);
}

function borrarDatos() {
  document.getElementById("parcial1").value = "";
  document.getElementById("parcial2").value = "";
  document.getElementById("parcial3").value = "";
  document.getElementById("examen").value = "";
  document.getElementById("trabajo").value = "";
  document.getElementById("calificacionFinal").value = "";
}