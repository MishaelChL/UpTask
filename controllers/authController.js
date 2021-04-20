const passport = require("passport");

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