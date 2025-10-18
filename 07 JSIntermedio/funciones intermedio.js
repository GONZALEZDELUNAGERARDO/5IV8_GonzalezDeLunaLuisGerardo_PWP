 /*
 JS maneja variables del siguiente modo: var-> una variable de acceso local y global dependiendo de donde se declare
let-> es una variable "protegida", solo se puede hacer uso dentro de la función o bloque donde se declara 
 const -> es una variable que no puede cambiar su valor, es una constante




var x = "hola";
if(true){
let x = "habia una vez";
console.log(x);
}


// Como usamos las funciones 

function suma(n1,n2){
    return n1 + n2
}

console.log( `Esta suma es de: ${suma (5,3)}`);



// Las funciones flecha nos ayudan a poder realizar operaciones de una forma mucho mas sencilla, de acuerdo a la siguiente estructura
// "cadena" -> id, clase, metodo, nombre, atributo

const suma = (n1,n2) => n1 + n2; 
console.log( `Esta suma es de: ${suma (5,3)}`);

const razaDePerros = [
    "Pastor alemán",
    "Labrador retriever",
    "Bulldog Frances",
    "beagle",
    "chihuahua",
    "dalmata",
    "salchicha",
    "pug"
];

// formas de recorrer e imprimir los elementos de un arreglo 
//for

for (let i = 0; i < razaDePerros.length; i++){
    console.log(razaDePerros[i]);
}

// for of

for(const raza of razaDePerros){
    console.log(raza);
}



// for in 

for(const indice in razaDePerros){
    console.log(razaDePerros[indice]);

}


// for each itera sobre los elementos del arreglo y no devuelve nada
// por lo tanto los forEach son funciones flecha por defecto 
razaDePerros.forEach(raza => console.log(raza));
//La estructura general del forEach es la siguiete: 
//argumento.forEach((raza,indice,arregloOriginal)=> {código a ejecutar})

razaDePerros.forEach((raza,indice,razaDePerros) => console.log(raza));


//funcion MAP => Iterar sobre los elementos del arreglo, y regresa un arreglo diferente con el cual podemos jugar

const razaDePerrosMayusculas = razaDePerros.map (raza => raza.toUpperCase());
console.log(razaDePerrosMayusculas);

//FIND -> Nos permite realizar una busqueda de un elemento dentro de un arreglo, si lo encuentra lo retorna, sino lanza un "undefined"

if(razaDePerros.find(raza => raza == "chihuahua")){
    console.log("Si se encontró la raza");
    console.log(razaDePerros);
}
else{
    //hay que meterlo 
    razaDePerros.push("chihuahua");
    console.log(razaDePerros);
}
    */

//FINDINDEX -> Nos permite realizar la busqueda de un elemento dentro del arreglo, si lo encuentra, regresa el indice del elemento, sino regresa un -1, esta funcion es particularmente util cuando necesitamos modificar o eliminar de un arreglo original, dentro de una copia del mismo

const indiceDeDalmata = razasDePerros.findIndex(raza => raza === "chihuahua");


if(indiceChihuahua > -1) {
    //si se encontro y está dentro del arreglo 
    console.log(razasDePerros[indiceChihuahua]);
    // aparte le oy a decir que agregue un texto a este resultado 
    razasDePerros[indiceChihuahua] += "(Es una raza de perros chiquita y chillona)";
    console.log(razasDePerros[indiceChihuahua]);
    console.log(razasDePerros);
}