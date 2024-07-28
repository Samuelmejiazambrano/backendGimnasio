import { Router } from "express";
import httpIngresos from "../controllers/ingresos.js";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import helpersIngreso from "../helpersClientes/ingreso.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const ingreso = Router();

ingreso.get("/", validarJWT, httpIngresos.getIngreso);
ingreso.get("/:_id", validarJWT, httpIngresos.getIngresoCodigo);
ingreso.post(
  "/",
  [
    check("codigo", "id no puede estar vacio").notEmpty(),
    check("codigo").custom(helpersIngreso.validarClienteUnica),
    check("codigo", "id minimo 2 numeros").isLength({ min: 4 }),

    validarCampos,
  ],
  validarJWT,
  httpIngresos.postIngreso
);

ingreso.put(
  "/activar/:_id",
  [
    check("_id", "Se necesita un mongoId valido").isMongoId(),
    check("_id").custom(helpersIngreso.validarExistaId),
    validarCampos,
    validarJWT,
  ],

  httpIngresos.putIngresoActivar
);

ingreso.put(
  "/desactivar/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersIngreso.validarExistaId),
    validarCampos,
  ],
  validarJWT,
  httpIngresos.putIngresoDesactivar
);
ingreso.put(
  "/actualizar/:_id",
  [
    check("codigo", "id no puede estar vacio").notEmpty(),
    check("codigo").custom(helpersIngreso.validarClienteUnica),
    check("codigo", "id minimo 2 numeros").isLength({ min: 4 }),

    validarCampos,
  ],
  validarJWT,
  httpIngresos.putIngreso
);

export default ingreso;
