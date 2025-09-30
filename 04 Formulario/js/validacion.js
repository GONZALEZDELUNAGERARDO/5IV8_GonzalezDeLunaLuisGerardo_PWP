/*
JavSscript es un lenguaje multiparadigma 
Acepta la programación funcional, estructurada, POO, 
Eventos
Dentro de JS, no existe el typado de variables
int, string, float, etc
Solo existen 3 tipos de variables de acuerdo al estandar ES6 
VAR, LET, CONST

*/

function validar(formulario){
    // quiero validar que el campo nombre acepte mas de 3 caracteres
    if(formulario.nombre.value.lenght < 4){
        alert("Por favor escribe mas de 3 caracteres en el campo nombre");
        formulario.nombre.focus();
        return false;
    }

    // validación para unicamente nombre

    var checkStr = formulario.nombre.value;
    alert(checkStr);
    var abcOK = "QWERTYUIOPASDFGHJKLÑZXCVBNM" + "qwertyuiopasdfghjklñzxcvbnm";

    var  allValido = true;

    //Tenemos que comparar la cadena de nombre vs abc

    for(var i = 0; i < checkStr.lenght; i ++){
        var caracteres = checkStr. charAt(i);
        for(var j = 0; j < abcOK.length; j ++){
            if(caracteres == abcOK.charAt(j)){
                break;
            }

        }
        if( j == abcOK.length){
            allValido = false;
            break;
        }

    }
    if(!allValido){
        alert("Escriba unicamente letras en el nombre ");
        formulario.nombre.focus();
        return false; 

        if(!allValido){
        alert("Escriba unicamente digitos en el nombre ");
        formulario.edad.focus();
        return false; 
    }

    // vamos a crear una función de una expresión regular para validar el correo electronico 
    // texto.texto@texto.texto

    var b = /^[^@/s] + [^@./s]+(/.[^@/./s]+)+$/ ;
    var txt = formulario.correo.value;

    alert("Email" + (b.test(txt)? "": "no")+ "valido");

    return b.test;
}}