const express = require("express");
const routes = require("./routes");
const path = require("path");

//helpers con algunas funciones
const helpers = require("./helpers");

//crear la conexion a la bd
const db = require("./config/db");

require("./models/Proyectos");
require("./models/Tareas");
require("./models/Usuarios");

try {
    db.sync();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

//crear una app de express
const app = express();

//donde cargar los archivos estaticos
app.use(express.static("public"));

//habilitar pug
app.set("view engine", "pug");

//añadir la carpeta de la vistas
app.set("views", path.join(__dirname, "views"));

//pasar el vardump a la app
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

//habilitar bodyParser para leer datos del formulario
app.use(express.urlencoded({extended: true}));

app.use("/", routes());

app.listen(3000);
