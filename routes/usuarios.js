import { Router } from "express";
import httpUsuarios from "../controllers/usuarios.js";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

import helpersUsuarios from "../helpersClientes/usuario.js";

const usuario = Router();

usuario.get("/", httpUsuarios.getUsuario);
usuario.get("/activos", httpUsuarios.getUsuarioActivo);
usuario.get("/inactivos", httpUsuarios.getUsuarioInactivo);

usuario.get("/:_id", httpUsuarios.getUsuarioId);
usuario.post("/login", httpUsuarios.login);
usuario.post(
  "/",     
  [
   
    // check("", "id no puede estar vacio").notEmpty(),
    // check("_id" ,"id minimo 2 numeros").isLength({ min: 4 }),
    // check("estado","Solo numeros").isNumeric(),
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
    validarCampos,
  ],
  httpUsuarios.putUsuarioActivar
),
usuario.put(
  "/desactivar/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersUsuarios.validarExistaId),
    validarCampos,
  ],
  httpUsuarios.putUsuarioDesactivar
)
usuario.put(
  "/update/:_id",
  httpUsuarios.putUsuario
)


export default usuario