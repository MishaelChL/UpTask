const passport = require("passport");

const Usuarios = require("../models/Usuarios")

exports.autenticarUsuario = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/iniciar-sesion",
    failureFlash: true,
    badRequestMessage: "Ambos campos son obligatorios"
});

//funcion para revisar si el usuario esta logueado o no
exports.usuarioAutenticado = (req, res, next) => {
    //si el usuario está autenticado, adelante
    if (req.isAuthenticated()){
        return next();
    }
    //si no está autenticado, redirigir al formulario
    return res.redirect("/iniciar-sesion");
};

//funcion para cerrar sesion
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/iniciar-sesion"); //al cerrar sesion nos lleva a iniciar sesion
    })
};

//genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {
    //verificar que el usuario exista
    const usuario = await Usuarios.findOne({ where: { email: req.body.email } });

    //Si existe el usuario
    if(!usuario){
        req.flash("error", "No existe esa cuenta");
        res.render("reestablecer", {
            nombrePagina: "Reestablecer tu Contraseña",
            mensajes: req.flash()
        })
    }
}