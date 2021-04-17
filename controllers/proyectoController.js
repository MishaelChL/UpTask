const Proyectos = require("../models/Proyectos");

exports.proyectosHome = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  console.log(proyectos);
  res.render("index", {
    nombrePagina : 'Proyectos',
    proyectos
  });
};

exports.formularioProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render("nuevoProyecto", {
    nombrePagina : 'Nuevo Proyecto',
    proyectos
  });
};

exports.nuevoProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  //Enviar a la consola lo que el usuario escriba
  //console.log(req.body);

  //validar que tengamos algo en el imput
  const nombre  = req.body.nombre;

  let errores = [];

  if(!nombre){
    errores.push({"texto": "Agrega un nombre al proyecto"});
  }

  //si hay errores
  if(errores.length > 0){
    res.render('nuevoProyecto', {
      nombrePagina : 'Nuevo Proyecto',
      errores,
      proyectos
    });
  }else{
    //No hay errores
    //Insertar en la BD.
    const proyecto = await Proyectos.create({ nombre });
    res.redirect("/");
  }
};

exports.proyectoPorUrl = async (req, res, next) => {
  const proyectos = await Proyectos.findAll();
  const proyecto = await Proyectos.findOne({
    where: {
      url: req.params.url
    }
  });

  if(!proyecto) return next();

  //render a la vista

  res.render("tareas", {
    nombrePagina: 'Tareas del Proyecto',
    proyecto,
    proyectos 
  })
}

exports.formularioEditar = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  //render a la vista
  res.render("nuevoProyecto", {
    nombrePagina: "Editar Proyecto",
    proyectos
  });
}


