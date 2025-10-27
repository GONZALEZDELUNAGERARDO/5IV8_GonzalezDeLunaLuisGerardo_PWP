const express = require('express');
const mirrow = require('./endpoints/mirrow');

//Vamos a hacer una estancia del servidor
const app = express();
const port = 3000;
app.use(express.json());
// Definimos cada una de las rutas
app.get('/', mirrow );
app.put('/', mirrow );
app.post('/', mirrow );
app.patch('/', mirrow );
app.delete('/', mirrow );
app.head('/', mirrow );

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
