const express = require("express");
const router = express.Router();

//importar express validator
const { body } = require("express-validator/check");

//importar el controlador
const proyectosController = require("../controllers/proyectoController");

module.exports = function () {
  //ruta para el home
  router.get("/", proyectosController.proyectosHome);
  router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
  router.post("/nuevo-proyecto", body("nombre").not().isEmpty().trim().escape(), proyectosController.nuevoProyecto);

  //listar proyecto
  router.get("/proyectos/:url", proyectosController.proyectoPorUrl);
  
  //actualizar el proyecto
  router.get("/proyecto/editar/:id", proyectosController.formularioEditar);
  return router;
};
