//vamos a crear nuestro propio servidor

const http = require('http');

var servidor = http.createServer(function(req, res) {
    // req -> request: solicitud del cliente
    // res -> response: respuesta del servidor
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hola Mundo desde Node.js</h1>');
    res.write('<h1>A mimir</h1>')
    console.log('Hola, sí entró al servidor');
    res.end();
});


//es necesario tener un puerto de comunicacion para el servidor
servidor.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
