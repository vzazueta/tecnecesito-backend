const serverless = require('serverless-http');
const express = require('express');
const util = require('util')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
require('dotenv').config();

let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});

const query = util.promisify(connection.query).bind(connection);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello!",
  });
});

app.post("/cliente", async (req, res, next) => {
  try {
    let cliente = await query(
      `INSERT INTO \`cliente\` (\`nombre\`, \`correo\`, \`contrasena\`, \`telefono\`) VALUES ('${req.body.nombre}', '${req.body.correo}', '${req.body.contrasena}', '${req.body.telefono}')`
    );
    return res.status(200).json({
      cliente: cliente,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error
    });
  }
});

app.get("/cliente", async (req, res, next) => {
  try {
    let cliente = await query(`SELECT * FROM  \`cliente\` WHERE (\`correo\` = '${req.body.correo}')`);
    return res.status(200).json({
      cliente: cliente,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error
    });
  }
});

app.get("/acceso_cliente", async (req, res, next) => {
  try {
    let cliente = await query(`SELECT \`cliente.correo\` AND \`cliente.contrasena\` FROM  \`cliente\` `);
    return res.status(200).json({
      cliente: cliente,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error
    });
  }
});

app.put("/cliente", async (req, res, next) => {
  try {
    let cliente = await query(
      `UPDATE \`cliente\` SET \`nombre\` = IFNULL('${req.body.nombre}', \`nombre\`), \`correo\` = IFNULL('${req.body.correo}', \`correo\`), \`contrasena\` = IFNULL('${req.body.contrasena}', \`contrasena\`), \`telefono\` = IFNULL('${req.body.telefono}', \`telefono\`) WHERE (\`correo\` = '${req.body.correo}')`
    );
    return res.status(200).json({
      cliente: cliente,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error
    });
  }
});

app.delete("/cliente", async (req, res, next) => {
  try {
    let cliente = await query(`DELETE FROM \`cliente\` WHERE (\`correo\` = '${req.body.correo}')`);
    return res.status(200).json({
      cliente: cliente,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error
    });
  }
});

app.post("/profesionista", async (req, res, next) => {
  try {
    let profesionista = await query(
      `INSERT INTO \`profesionista\` (\`nombre\`, \`correo\`, \`contrasena\`, \`ubicacion\`, \`modalidad\`, \`telefono\`, \`categoria\`) VALUES ('${req.body.nombre}', '${req.body.correo}', '${req.body.contrasena}', '${req.body.ubicacion}', '${req.body.modalidad}', '${req.body.telefono}', '${req.body.categoria}')`
    );
    return res.status(200).json({
      profesionista: profesionista,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error
    });
  }
});

app.get("/profesionista", async (req, res, next) => {
  try {
    let profesionista = await query(`SELECT * FROM  \`profesionista\` WHERE (\`correo\` = '${req.body.correo}')`);
    return res.status(200).json({
      profesionista: profesionista,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error
    });
  }
});

app.get("/acceso_profesionista", async (req, res, next) => {
  try {
    let profesionista = await query(`SELECT \`profesionista.correo\` AND \`profesionista.contrasena\` FROM  \`profesionista\` `);
    return res.status(200).json({
      profesionista: profesionista,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error
    });
  }
});

app.put("/profesionista", async (req, res, next) => {
  try {
    let profesionista = await query(
      `UPDATE \`profesionista\` SET \`nombre\` = IFNULL('${req.body.nombre}', \`nombre\`), \`correo\` = IFNULL('${req.body.correo}', \`correo\`), \`contrasena\` = IFNULL('${req.body.contrasena}', \`contrasena\`), \`telefono\` = IFNULL('${req.body.telefono}', \`telefono\`), \`ubicacion\` = IFNULL('${req.body.ubicacion}', \`ubicacion\`), \`modalidad\` = IFNULL('${req.body.modalidad}', \`modalidad\`) WHERE (\`correo\` = '${req.body.correo}')`
    );
    return res.status(200).json({
      profesionista: profesionista,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error
    });
  }
});

app.delete("/profesionista", async (req, res, next) => {
  try {
    let profesionista = await query(`DELETE FROM \`profesionista\` WHERE (\`correo\` = '${req.body.correo}')`);
    return res.status(200).json({
      profesionista: profesionista,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error
    });
  }
});

app.post("/categoria", async (req, res, next) => {
  try {
    let categoria = await query(
      `INSERT INTO \`categoria\` (\`nombre\`) VALUES ('${req.body.nombre}')`
    );
    return res.status(200).json({
      categoria: categoria,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error
    });
  }
});

app.delete("/categoria", async (req, res, next) => {
  try {
    let categoria = await query(`DELETE FROM \`categoria\` WHERE (\`nombre\` = '${req.body.nombre}')`);
    return res.status(200).json({
      categoria: categoria,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error
    });
  }
});

app.post("/favorito", async (req, res, next) => {
  try {
    let favorito = await query(
      `INSERT INTO \`favorito\` (\`correo\`) VALUES ('${req.body.nombre}')`
    );
    return res.status(200).json({
      favorito: favorito,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error
    });
  }
});


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

//module.exports.handler = serverless(app);
app.listen(5000, ()=>console.log("server ready"));
