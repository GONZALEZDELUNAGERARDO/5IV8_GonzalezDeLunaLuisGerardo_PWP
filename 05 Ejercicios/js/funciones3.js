function validarn(e) {
  var teclado = (document.all) ? e.keyCode : e.which;
  if (teclado == 8) return true;
  var patron = /[0-9.]/;
  var codigo = String.fromCharCode(teclado);
  return patron.test(codigo);
}

function calcularDescuento() {
  let producto = document.getElementById("producto").value.trim();
  let precio = parseFloat(document.getElementById("precio").value);

  if (producto === "" || isNaN(precio) || precio <= 0) {
    alert("Por favor ingresa un nombre de producto y un precio válido.");
    return;
  }

  let descuento = precio * 0.15;
  let total = precio - descuento;

  document.getElementById("descuento").value = "$ " + descuento.toFixed(2);
  document.getElementById("total").value = "$ " + total.toFixed(2);
}

function borrarDatos() {
  document.getElementById("producto").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("descuento").value = "";
  document.getElementById("total").value = "";
}