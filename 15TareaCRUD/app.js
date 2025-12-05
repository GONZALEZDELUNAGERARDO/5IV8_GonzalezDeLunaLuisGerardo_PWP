const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');

require('dotenv').config({ path: './.env' });

const app = express();
const port = 3000;

// Configuración de MySQL
const bd = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME
});

bd.connect((error) => {
    if (error) {
        console.log('Error de conexión a la base de datos: ' + error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(express.static(__dirname + '/css'));


app.get('/', (req, res) => {
    const query = 'SELECT * FROM bitacora ORDER BY fecha_cambio DESC';
    bd.query(query, (error, resultados) => {
        if (error) return res.status(500).send('Error al obtener registros');
        res.render('index', { bitacora: resultados });
    });
});

//  crear un registro
app.post('/bitacora', (req, res) => {
    const { id_equipo, tipo_fluido, fecha_cambio, cantidad, muestra_analisis, resultados_analisis, proximo_cambio } = req.body;
    const query = `INSERT INTO bitacora 
        (id_equipo, tipo_fluido, fecha_cambio, cantidad, muestra_analisis, resultados_analisis, proximo_cambio) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
    bd.query(query, [id_equipo, tipo_fluido, fecha_cambio, cantidad, muestra_analisis, resultados_analisis, proximo_cambio], (error) => {
        if (error) return res.status(500).send('Error al crear el registro');
        res.redirect('/');
    });
});

//  eliminar un registro
app.get('/bitacora/delete/:id', (req, res) => {
    const registroId = req.params.id;
    const query = 'DELETE FROM bitacora WHERE id = ?';
    bd.query(query, [registroId], (error) => {
        if (error) {
            console.log('Error al eliminar el registro: ' + error);
            return res.status(500).send('Error al eliminar el registro');
        }
        res.redirect('/');
    });
});

//  editar un registro
app.get('/bitacora/edit/:id', (req, res) => {
    const registroId = req.params.id;
    const query = 'SELECT * FROM bitacora WHERE id = ?';
    bd.query(query, [registroId], (error, resultados) => {
        if (error) return res.status(500).send('Error al obtener el registro');
        res.render('edit', { registro: resultados[0] });
    });
});

//   actualizar un registro
app.post('/bitacora/update/:id', (req, res) => {
    const registroId = req.params.id;
    const { id_equipo, tipo_fluido, fecha_cambio, cantidad, muestra_analisis, resultados_analisis, proximo_cambio } = req.body;
    const query = `UPDATE bitacora 
        SET id_equipo=?, tipo_fluido=?, fecha_cambio=?, cantidad=?, muestra_analisis=?, resultados_analisis=?, proximo_cambio=? 
        WHERE id=?`;
    bd.query(query, [id_equipo, tipo_fluido, fecha_cambio, cantidad, muestra_analisis, resultados_analisis, proximo_cambio, registroId], (error) => {
        if (error) {
            console.log('Error al actualizar el registro: ' + error);
            return res.status(500).send('Error al actualizar el registro');
        }
        res.redirect('/');
    });
});

// Servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});