var instrucciones = [
    "Utiliza las flechas de navegacion para mover las piezas, ",
    "Para ordenar las piezas guiate por la imagen Objetivo"
]

//Vamos a guardar dentro de una variable los movimientos del rompecabezas
var movimientos = [

]

//Vamos crear una matriz para saber las posiciones del rompecabezas

var rompe = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]

//vamos a tener que crear una matriz donde tengamos las posiciones correctas

var rompeCorrecta = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]

//Necesito saber las coordenadas de la pieza vacia 

var filaVacia = 2;
var columnaVacia = 2;

//Necesitamos ahora si una funcion que se encargue de mostrar las instrucciones

function mostrarInstrucciones(instrucciones){
    for(var i=0; i < instrucciones.length; i++){
        mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }
}

//esta funcion se encarga de crear el componente li y agregar la lista de dichas instrucciones

function mostrarInstruccionesLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}
//Mandamos traer a la funcion 
mostrarInstrucciones(instrucciones);

//Vamos a crear una función para saber que ganó
function checarSiGano(){
    for(var i = 0; i < rompe.length; i++){
        for(var j = 0; j < rompe[i].length; j++){
            var rompeActual = rompe[i][j];
            if(rompeActual !== rompeCorrecta[i][j]){
                return false;
            }
        }
    }
    return true;
}

//Mostrar en HTML si ganó
function mostrarCartelGanador(){
    if(checarSiGano()){
        alert("Felicidades, Ganaste");
    }
}

/*
    Necesitamos una función que se encargue de poder intercambiar las posiciones de la pieza vacía vs cualquiera;
    para esto tenemos que hacer uso de:
    arreglo[][] = posicion[][]
    //intercambiar
    posicion[][] = arreglo[][]
*/
function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2){
    var temp = rompe[filaPos1][columnaPos1];
    rompe[filaPos1][columnaPos1] = rompe[filaPos2][columnaPos2];
    rompe[filaPos2][columnaPos2] = temp;
}

//Crear una función que se encargue de saber dónde está la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna){
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

//necesitamos también limityar las posiciones del rompecabezas
function posicionValida(fila, columna){
    return (fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2)
}

//Debemos crear una función que se encargue del movimiento detectando el evento de las flechas de navegación.

//Debemos crear una matriz de identificación de mov
//Arriba 38, abajo 40, izquierda 37, derecha 38
var codigosDireccion = {
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO : 40
}; //ES FORMATO JSON

function moverEnDireccion(direccion){
    var nuevaFilapszVacia;
    var nuevaColumnapszVacia;

    //saber si se mueve
    if(direccion === codigosDireccion.ABAJO){
        nuevaFilapszVacia = filaVacia + 1;
        nuevaColumnapszVacia = columnaVacia;
    } else if(direccion === codigosDireccion.ARRIBA){
        nuevaFilapszVacia = filaVacia - 1;
        nuevaColumnapszVacia = columnaVacia;
    }else if(direccion === codigosDireccion.DERECHA){
        nuevaFilapszVacia = filaVacia;
        nuevaColumnapszVacia = columnaVacia + 1;
    }else if(direccion === codigosDireccion.IZQUIERDA){
        nuevaFilapszVacia = filaVacia;
        nuevaColumnapszVacia = columnaVacia - 1;
    }

    //Solo mando a llamar a que la posición sea válida
    if(posicionValida(nuevaFilapszVacia, nuevaColumnapszVacia)){
        //Tengo que hacer una función que se encargue de intercambiar las posiciones
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilapszVacia, nuevaColumnapszVacia);
        actualizarPosicionVacia(nuevaFilapszVacia, nuevaColumnapszVacia);
        //tengo que guardar el último movimiento
        agregarUltimoMovimiento(direccion);
    }

}

function intercambiarPosiciones(fila1, columna1, fila2, columna2){
    var psz1 = rompe[fila1][columna1];
    var psz2 = rompe[fila2][columna2];

    //Intercambio ya debe de ser por parte de los frames y el html
    intercambiarPosicionesRompe(fila1, columna1, fila2, columna2);
    //para el html
    intercambiarPosicionesDOM('pieza' + psz1, 'pieza' + psz2);
}

function intercambiarPosicionesDOM(idPieza1, idPieza2){
    var pieza1 = document.getElementById(idPieza1);
    var pieza2 = document.getElementById(idPieza2);

    //vamos a clonarlas
    var padrePieza1 = pieza1.parentNode;
    var padrePieza2 = pieza2.parentNode;

    var clon1 = pieza1.cloneNode(true);
    var clon2 = pieza2.cloneNode(true);

    padrePieza1.replaceChild(clon2, pieza1);
    padrePieza2.replaceChild(clon1, pieza2);
}

//Debo de actualizar los elementos en el DOM
function agregarUltimoMovimiento(direccion){
    var ultimoMovimiento = document.getElementById("flecha");
    switch(direccion){
        case codigosDireccion.ARRIBA:
            ultimoMovimiento.textContent = "↑";
            break;
        case codigosDireccion.ABAJO:
            ultimoMovimiento.textContent = "↓";
            break;
        case codigosDireccion.DERECHA:
            ultimoMovimiento.textContent = "→";
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMovimiento.textContent = "←";
            break;
    }
}

function mezclarPiezas(veces){
    if(veces <= 0){
        alert("Así no se puede");
        return;
    }

    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA, codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA];
    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
    moverEnDireccion(direccion);

    setTimeout(function(){
        mezclarPiezas(veces - 1);
    }, 50);
}

//Necesitamos saber qué teclas se están oprimiendo
function capturarTeclas(){
    document.body.onkeydown = (function(evento){
        if(evento.which === codigosDireccion.ARRIBA ||
                         evento.which === codigosDireccion.ABAJO ||
                         evento.which === codigosDireccion.DERECHA ||
                         evento.which === codigosDireccion.IZQUIERDA){
            moverEnDireccion(evento.which);
            //saber si gane
            var gano = checarSiGano();
            if(gano){
                setTimeout(function(){
                    mostrarCartelGanador();
                }, 500);
            }
            evento.preventDefault();
        }
    });
}


function iniciar(){
    mezclarPiezas(30);
    capturarTeclas();
}

iniciar();


document.getElementById("btnRevolver").addEventListener("click", function () {
    const contenedor = document.getElementById("juego");
    const piezas = Array.from(contenedor.querySelectorAll(".piezas"));
    const piezasMezcladas = piezas.sort(() => Math.random() - 0.5);
    piezasMezcladas.forEach(pieza => contenedor.appendChild(pieza));
});