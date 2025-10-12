function validarn(e) {
  var teclado = (document.all) ? e.keyCode : e.which;
  if (teclado == 8) return true;
  var patron = /[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/; // permite letras y espacios
  var codigo = String.fromCharCode(teclado);
  return patron.test(codigo);
}

function problema1() {
  var entrada = document.getElementById("p1-input").value.trim();

  if (entrada === "") {
    alert("Por favor ingresa una cadena de palabras.");
    return;
  }

  var palabras = entrada.split(" ");
  var invertidas = palabras.reverse();
  var resultado = invertidas.join(" ");

  document.getElementById("p1-output").textContent =
    "Palabras invertidas: " + resultado;
}

function borrarProblema1() {
  document.getElementById("p1-input").value = "";
  document.getElementById("p1-output").textContent = "Esperando datos...";
}