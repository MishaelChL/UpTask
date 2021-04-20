const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

//referencia al modelo donde vamos a autenticar
const Usuarios = require("../models/Usuarios");

//local strategy - login con credenciales propias (usuario y password)
passport.use(
    new LocalStrategy(
        //por default passport espera un usuario y password
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.find({
                    where: {
                        email: email
                    }
                });
                //El usuario no existe pero el password no puede ser el correcto
                if(!usuario.verificarPassword(password)){
                    
                }
            } catch (error) {
                //ese usuario no existe
                return done(null, false, {
                    message: "Esa cuenta no existe"
                })
            }
        } 
    )
)