const express = require("express");
const router = express.Router();

//importar el controlador
const proyectosController = require("../controllers/proyectoController");

module.exports = function () {
  //ruta para el home
  router.get("/", proyectosController.proyectosHome);
  
  
  
  return router;
};
