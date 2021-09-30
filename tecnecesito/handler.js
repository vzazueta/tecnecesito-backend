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


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

//module.exports.handler = serverless(app);
app.listen(5000, ()=>console.log("server ready"));
