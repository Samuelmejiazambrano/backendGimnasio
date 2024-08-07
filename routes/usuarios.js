import { Router } from "express";
import httpUsuarios from "../controllers/usuarios.js";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

import helpersUsuarios from "../helpersClientes/usuario.js";

const usuario = Router();

usuario.get("/",[validarJWT], httpUsuarios.getUsuario);
usuario.get("/activos",[validarJWT], httpUsuarios.getUsuarioActivo);
usuario.get("/inactivos",[validarJWT], httpUsuarios.getUsuarioInactivo);

usuario.get("/:_id",[validarJWT],httpUsuarios.getUsuarioId);    
usuario.post("/login", httpUsuarios.login);
usuario.post(
  "/",     
  [
   
    // check("", "id no puede estar vacio").notEmpty(),
    // check("_id" ,"id minimo 2 numeros").isLength({ min: 4 }),
    // check("estado","Solo numeros").isNumeric(),
    check("email").custom(helpersUsuarios.validarEmailUnico),

    validarCampos,validarJWT
  ],
  httpUsuarios.postUsuario),
    
// ingreso.put(
//   "/:_id",
//   [
//     check("_id", "Se necesita un mongoCc valido").isMongoId(),
//     check("_id").custom(helpersClientes.validarExistaId),
//     validarCampos,
//   ],
//   httpIngresos.p
// ),
usuario.put(
  "/activar/:_id",
  [
    check("_id", "Se necesita un mongoId valido").isMongoId(),
    check("_id").custom(helpersUsuarios.validarExistaId),
    validarCampos,validarJWT
  ],
  httpUsuarios.putUsuarioActivar
),
usuario.put(
  "/desactivar/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersUsuarios.validarExistaId),
    validarCampos,validarCampos
  ],
  httpUsuarios.putUsuarioDesactivar
)
usuario.put(
  "/update/:_id",[validarJWT],
  httpUsuarios.putUsuario
)


export default usuario