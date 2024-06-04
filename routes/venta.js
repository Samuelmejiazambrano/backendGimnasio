import { Router } from "express";
import httpVenta from "../controllers/venta.js";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import helpersVenta from "../helpersClientes/venta.js";

const venta = Router();

venta.get("/", httpVenta.getVenta);
venta.get("/:_id", httpVenta.getVentaId);
venta.post(
  "/",
  [
   
    check("codigoProducto", "id no puede estar vacio").notEmpty(),
    check("codigoProducto" ,"id minimo 2 numeros").isLength({ min: 4 }),
    // check("estado","Solo numeros").isNumeric(),
    validarCampos
  ],
  httpVenta.postVenta),
  
// ingreso.put(
//   "/:_id",
//   [
//     check("_id", "Se necesita un mongoCc valido").isMongoId(),
//     check("_id").custom(helpersClientes.validarExistaId),
//     validarCampos,
//   ],
//   httpIngresos.p
// ),
venta.put(
  "/activar/:_id",
  [
    check("_id", "Se necesita un mongoId valido").isMongoId(),
    check("_id").custom(helpersVenta.validarExistaId),
    validarCampos,
  ],
  httpVenta.putVentaActivar
),
venta.put(
  "/desactivar/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersVenta.validarExistaId),
    validarCampos,
  ],
  httpVenta.putventaDesactivar
)

export default venta