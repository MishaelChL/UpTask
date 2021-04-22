const Usuarios = require("../models/Usuarios");
const enviarEmail = require("../handlers/email");

exports.formCrearCuenta = (req, res) => {
    res.render("crearCuenta", {
        nombrePagina: "Crear Cuenta en UpTask"
    });
}

exports.crearCuenta = async (req, res) => {
    //leer los datos
    // console.log(req.body);
    const { email, password } = req.body;

    try {
        //crear el usuario
        await Usuarios.create({
            email,
            password,
        });

        //crear una url para confirmar
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;
        console.log(confirmarUrl);

        //crear el objeto de usuario
        const usuario = {
            email
        }

        //enviar email
        await enviarEmail.enviar({
            usuario,
            subject: "Confirma tu cuenta en UpTask",
            confirmarUrl,
            archivo: "confirmarCuenta"
        });

        //redirigir al usuario
        req.flash("correcto", "Enviamos un correo, confirma tu cuenta");
        res.redirect("/iniciar-sesion");
    } catch (error) {
        // console.log("MOSTRAR ERROR");
        // console.log(error);
        // console.log("-----------------------");
        res.render("crearCuenta", {
            error: error.message,
            nombrePagina: "Crear Cuenta en UpTask",
            email,
            password
        });
    }
}

exports.formIniciarSesion = (req, res) => {
    console.log(res.locals.mensajes);
    const { error } = res.locals.mensajes;
    res.render("iniciarSesion", {
        nombrePagina: "Iniciar Sesion en UpTask",
        error: error,
    });
}

exports.formRestablecerPassword = (req, res) => {
    res.render("reestablecer", {
        nombrePagina: "Reestablecer tu Contraseña",
    });

}

//Cambia el estado de una cuenta
exports.confirmarCuenta = async (req, res) => {
    // console.log(req.params.correo);
    const usuario = await Usuarios.findOne({where: {email: req.params.correo}});
    
    if(!usuario){
        req.flash("error", "No valido");
        res.redirect("/crear-cuenta");
    }
    usuario.activo = 1;
    await usuario.save();
    req.flash("correcto", "Cuenta activada correctamente");
    res.redirect("/iniciar-sesion");
}