
function invertirPalabras() {
  const entrada = document.getElementById("palabrasEspacio").value.trim();
  const palabras = entrada.split(" ");
  const invertido = palabras.reverse().join(" ");
  document.getElementById("resultado1").textContent = invertido;
}


function minProductoEscalar() {
  const v1 = document.getElementById("vector1").value.split(",").map(Number);
  const v2 = document.getElementById("vector2").value.split(",").map(Number);

  if (v1.length !== v2.length || v1.some(isNaN) || v2.some(isNaN)) {
    alert("Ambos vectores deben tener el mismo número de elementos y ser numéricos.");
    return;
  }

  const v1Ordenado = v1.sort((a, b) => a - b);
  const v2Ordenado = v2.sort((a, b) => b - a);

  let producto = 0;
  for (let i = 0; i < v1Ordenado.length; i++) {
    producto += v1Ordenado[i] * v2Ordenado[i];
  }

  document.getElementById("resultado2").textContent = producto;
}


function palabraMasUnicos() {
  const entrada = document.getElementById("listaPalabras").value.trim();
  const palabras = entrada.split(",");

  let maxUnicos = 0;
  let palabraMax = "";

  for (const palabra of palabras) {
    const letras = new Set(palabra.toUpperCase().replace(/[^A-Z]/g, ""));
    if (letras.size > maxUnicos) {
      maxUnicos = letras.size;
      palabraMax = palabra;
    }
  }

  document.getElementById("resultado3").textContent = `${palabraMax} (${maxUnicos} caracteres únicos)`;
}

