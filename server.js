require("dotenv").config(); // Cargar variables de entorno

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Configuración de conexión usando .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) {
    console.error("Error al conectar a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL");
});

// Guardar resultados de partidas
app.post("/save", (req, res) => {
  const { winner } = req.body;
  const sql = "INSERT INTO resultados (winner, fecha) VALUES (?, NOW())";
  db.query(sql, [winner], (err) => {
    if (err) {
      console.error("Error al guardar resultado:", err);
      res.status(500).send("Error al guardar resultado");
      return;
    }
    res.send("Resultado guardado");
  });
});

// Consultar score acumulado
app.get("/score", (req, res) => {
  const sql = `
    SELECT 
      SUM(CASE WHEN winner='X' THEN 1 ELSE 0 END) AS scoreX,
      SUM(CASE WHEN winner='O' THEN 1 ELSE 0 END) AS scoreO,
      SUM(CASE WHEN winner='Empate' THEN 1 ELSE 0 END) AS scoreDraw
    FROM resultados
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al consultar score:", err);
      res.status(500).send("Error al consultar score");
      return;
    }
    res.json(results[0]);
  });
});

// Puerto desde .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));