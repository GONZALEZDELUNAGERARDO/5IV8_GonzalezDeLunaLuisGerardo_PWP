function validarn(e) {
  var teclado = (document.all) ? e.keyCode : e.which;
  if (teclado == 8) return true;
  var patron = /[0-9.-]/; 
  var codigo = String.fromCharCode(teclado);
  return patron.test(codigo);
}

function problema1() {
  var x = [];
  var y = [];

  for (var i = 1; i <= 5; i++) {
    var xi = parseFloat(document.getElementById("p2-x" + i).value);
    var yi = parseFloat(document.getElementById("p2-y" + i).value);

    if (isNaN(xi) || isNaN(yi)) {
      alert("Por favor llena todos los campos con números válidos.");
      return;
    }

    x.push(xi);
    y.push(yi);
  }

  
  x.sort(function(a, b) { return a - b; });
  y.sort(function(a, b) { return b - a; });

  var producto = 0;
  for (var j = 0; j < 5; j++) {
    producto += x[j] * y[j];
  }

  document.getElementById("p2-output").textContent =
    "Producto escalar mínimo: " + producto;
}

function borrarProblema1() {
  for (var i = 1; i <= 5; i++) {
    document.getElementById("p2-x" + i).value = "";
    document.getElementById("p2-y" + i).value = "";
  }
  document.getElementById("p2-output").textContent = "Esperando datos...";

}
