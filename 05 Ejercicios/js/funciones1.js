function validarn(e) {
  var teclado = (document.all) ? e.keyCode : e.which;
  if (teclado == 8) return true;
  var patron = /[0-9.]/;
  var codigo = String.fromCharCode(teclado);
  return patron.test(codigo);
}

function interes() {
  var valor = document.getElementById("cantidadi").value;
  var meses = parseInt(document.getElementById("mesesi").value);
  var parseo = parseFloat(valor);

  if (isNaN(parseo) || parseo <= 0) {
    alert("Por favor ingresa una cantidad válida.");
    return;
  }

  if (isNaN(meses) || meses < 1 || meses > 18) {
    alert("Por favor ingresa un número de meses entre 1 y 18.");
    return;
  }

  var tasaMensual = 0.02;
  var interes = parseo * tasaMensual * meses;
  var total = parseo + interes;

  document.getElementById("saldoi").value = "$ " + total.toFixed(2);
}

function borrari() {
  document.getElementById("saldoi").value = "";
  document.getElementById("cantidadi").value = "";
  document.getElementById("mesesi").value = "";
}

/*Del ejercicio tenemos que agregar el campo numero de meses y sera inversion de maximo de 18 meses

2. se deben de ingresar tres ventas, un sueldo base, y despues calcular el monto total, debe de a árecer cuanto cobra por comision y la suma total

3. Se debe ingresar un producto, con su precio y aplicarle el 15% y el sistema debe mostrar el producto, orecio, descuento, total a pagar

4. Se debe ingresar c1, c2, c3, se aplica el promedio y su porcentaje, se ingresa tf y se aplica % final 
*/