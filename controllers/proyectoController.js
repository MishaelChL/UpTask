const Proyectos = require("../models/Proyectos");

exports.proyectosHome = (req, res) => {
  res.render("index", {
    nombrePagina : 'Proyectos'
  });
};

exports.formularioProyecto = (req, res) => {
  res.render("nuevoProyecto", {
    nombrePagina : 'Nuevo Proyecto'
  });
};

exports.nuevoProyecto = async (req, res) => {
  //Enviar a la consola lo que el usuario escriba
  //console.log(req.body);

  //validar que tengamos algo en el imput
  const { nombre } = req.body;

  let errores = [];

  if(!nombre){
    errores.push({"texto": "Agrega un nombre al proyecto"});
  }

  //si hay errores
  if(errores.length > 0){
    res.render('nuevoProyecto', {
      nombrePagina : 'Nuevo Proyecto',
      errores
    });
  }else{
    //No hay errores
    //Insertar en la BD.
    const proyecto = await Proyectos.create({ nombre });
    res.redirect("/");
  }
};


