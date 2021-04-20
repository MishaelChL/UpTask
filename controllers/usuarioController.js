const Usuarios = require("../models/Usuarios");

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
            res.redirect("/iniciar-sesion");
    } catch (error) {
        // console.log("MOSTRAR ERROR");
        // console.log(error);
        // console.log("-----------------------");
        res.render("crearCuenta", {
            error: error.message,
            nombrePagina: "Crear Cuenta en UpTask"
        });
    }
}