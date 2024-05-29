import bcryptjs from "bcryptjs"; 
import jwt from "jsonwebtoken"; 
import usuarios from "../models/usuarios.js";


const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "100y"
        }, (err, token) => {
            if (err) {

                reject("No se pudo generar el token")
            } else {
                resolve(token)
            }
        })
    })
}

const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        let usuario = await usuarios.findById(id);


        if (!usuario) {
            return res.status(401).json({
                msg: "Token no válidos! ."//- usuario no existe DB
            })
        }

        if (usuario.estado == 1) {
            return res.status(401).json({    
                msg: "Token no válido!!  " //- usuario con estado: false     
            })
        }

        req.usuariobdtoken = usuario

        next();

    } catch (error) {


        res.status(401).json({
            msg: "Token no valido2"
        })
    }
}


export { generarJWT, validarJWT }