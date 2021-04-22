const passport = require("passport");
const Usuarios = require("../models/Usuarios");
const crypto = require("crypto");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt-nodejs");
const enviarEmail = require("../handlers/email");

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
        res.redirect("/reestablecer");
    }

    //usuario existe
    usuario.token = crypto.randomBytes(20).toString("hex");
    // console.log(token);
    usuario.expiracion = Date.now() + 3600000; // + 1hora
    // console.log(expiracion);

    //guardar en la base de datos
    await usuario.save();

    //url del reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
    console.log(resetUrl);

    //envia el correo con el token
    await enviarEmail.enviar({
        usuario,
        subject: "Password Reset",
        resetUrl,
        archivo: "reestablecerPassword"
    });
    
    //terminar
    req.flash("correcto", "Se envió un mensaje a tu correo");
    res.redirect("/iniciar-sesion");
}

exports.validarToken = async (req, res) => {
    // res.json(req.params.token); // ojooooooooo - diferencia entre body - params -> body: los name de los forms, params: las variables en el url
    const usuario = await Usuarios.findOne({ where: { token: req.params.token } });
    console.log(usuario);

    //si no encuentra el usuario
    if(!usuario){
        req.flash("error", "No valido");
        res.redirect("/reestablecer");
    }

    //cuando encuentre al usuario
    //formulario para generar el password
    res.render('resetPassword', {
        nombrePagina : 'Reestablecer Contraseña'
      });
}

//cambia el password por uno nuevo
exports.actualizarPassword = async (req, res) => {
    // console.log(req.params.token);

    //verifica el token valido  pero tambien la fecha de expiracion
    const usuario = await Usuarios.findOne({ 
        where: { 
            token: req.params.token,
            expiracion: {
                [Op.gte] : Date.now() // op = operador, gte = mayor igual que, donde expiracion sea mayor a la hora actual
            } 
        } 
    });

    //verificamos si el usuario existe
    if(!usuario){
        req.flash("error", "No valido");
        res.redirect("/reestablecer");
    }

    //hashear el nuevo password
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;
    
    //guardamos el nuevo password
    await usuario.save();
    req.flash("correcto", "Tu password se ha modificado correctamente");
    res.redirect("/iniciar-sesion");

    
}