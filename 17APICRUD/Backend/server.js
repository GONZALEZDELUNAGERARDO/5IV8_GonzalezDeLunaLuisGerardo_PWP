import express from 'express';
import path from 'path';
//Aqui tenemos que agregar las rutas que se van a consumir 

import productRoutes from './routes/productroutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve(); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend','public')));

app.set('views engine', 'ejs');
app.set('public', path.join(__dirname, '../Frontend', 'public'));

//VAMOS A CONSUMIR LAS RUTAS AQUI
app.use('/', productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


