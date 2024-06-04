import { Router } from "express";
import httpIngresos from "../controllers/ingresos.js";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import helpersIngreso from "../helpersClientes/ingreso.js";

const ingreso = Router();

ingreso.get("/", httpIngresos.getIngreso);
ingreso.get("/:_id", httpIngresos.getIngreso);
ingreso.post(
  "/",
  [
   
    check("codigo", "id no puede estar vacio").notEmpty(),
    check("codigo" ,"id minimo 2 numeros").isLength({ min: 4 }),
    // check("estado","Solo numeros").isNumeric(),
    validarCampos
  ],
  httpIngresos.postIngreso),
  
// ingreso.put(
//   "/:_id",
//   [
//     check("_id", "Se necesita un mongoCc valido").isMongoId(),
//     check("_id").custom(helpersClientes.validarExistaId),
//     validarCampos,
//   ],
//   httpIngresos.p
// ),
ingreso.put(
  "/activar/:_id",
  [
    check("_id", "Se necesita un mongoId valido").isMongoId(),
    check("_id").custom(helpersIngreso.validarExistaId),
    validarCampos,
  ],
  httpIngresos.putIngresoActivar
),
ingreso.put(
  "/desactivar/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersIngreso.validarExistaId),
    validarCampos,
  ],
  httpIngresos.putIngresoDesactivar
)


export default ingreso