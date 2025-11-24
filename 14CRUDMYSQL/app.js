/*
Vamos a crear un cliente servidor para un CRUD.
Para esto tenemos que probar si el módulo mysql está verificado,
si no utilizaremos mysql2.
*/

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config({path: './.env'});

const app = express();
const port = 6160;

// Configuración de MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((error) => {
    if (error) {
        console.error('Error de conexión a la base de datos: ' + error);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

//Tenemos que configurar nuestro midelware, el cual estaremos usando rutas y codificaciones de la información por json.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Tenemos que configurar las vistas que se van a ejecutar.
app.set('view engine', 'ejs');
//Donde se encuentra el directorio de dichas vistas.
app.set('views', __dirname + '/views');

//Para la carga de imágenes, css, multimedia, etc. es necesario configurar una carpeta public, en la cual todos los recursos del proyecto se podrán consumir.
app.use(express.static(__dirname + '/css'));

//Vamos a crear el CRUD de estudiantes a partir de rutas.

//Ruta para mostrar el formulario y la lista de estudiantes.
app.get('/', (req, res) => {
    //Obtener la lista de estudiantes desde la base de datos.
    const query = 'SELECT * FROM estudiantes';
    db.query(query, (error, results) => {
        if (error) {
            console.log('Error al obtener los estudiantes: ' + error);
            res.status(500).send('Error al obtener los estudiantes');
        }
        res.render('index', { estudiantes: results });
    });
});

//Ruta para crear un estudiante.
app.post('/estudiantes', (req, res) => {
    //Obtener los datos del formulario.
    const { nombre, edad, curso } = req.body;
    const query = `INSERT INTO estudiantes (nombre, edad, curso) VALUES ('${nombre}', ${edad}, '${curso}');`;
    db.query(query, (error, results) => {
        if (error) {
            console.log('Error al crear el estudiante: ' + error);
            res.status(500).send('Error al crear el estudiante');
        }
        res.redirect('/');
    });
});

//Ruta para eliminar estudiante.
app.get('/estudiantes/delete/:id', (req, res) => {
    const estudianteId = req.params.id;
    const query = `DELETE FROM estudiantes WHERE id = ${estudianteId};`;
    db.query(query, (error, results) => {
        if (error) {
            console.log('Error al eliminar el estudiante: ' + error);
            res.status(500).send('Error al eliminar el estudiante');
        }
        res.redirect('/');
    });
});

//Ruta para buscar y actualizar estudiante.
app.get('/estudiantes/edit/:id', (req, res) => {
    const estudianteId = req.params.id;
    const query = `SELECT * FROM estudiantes WHERE id = ${estudianteId};`;
    db.query(query, (error, results) => {
        if (error) {
            console.log('Error al obtener el estudiante: ' + error);
            res.status(500).send('Error al obtener el estudiante');
        }
        res.render('editar', { estudiante: results[0] });
    });
});

app.post('/estudiantes/update/:id', (req, res) => {
    const estudianteId = req.params.id;
    const { nombre, edad, curso } = req.body;
    const query = `UPDATE estudiantes SET nombre='${nombre}', edad=${edad}, curso='${curso}' WHERE id = ${estudianteId};`;
    db.query(query, (error, results) => {
        if (error) {
            console.log('Error al actualizar el estudiante: ' + error);
            res.status(500).send('Error al actualizar el estudiante');
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
