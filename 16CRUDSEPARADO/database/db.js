const mysql2 = require('mysql2');

const db= mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'cursosdb'
});

db.connect((error) => {
    if(error){
        console.error('Error de conexion a la base de datos:', +err.stack);
        return;

    } 
        console.log('Conexion exitosa a la base de datos');
});

module.exports = db; 