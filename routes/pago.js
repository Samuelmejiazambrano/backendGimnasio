import { Router } from "express";
import httpPagos from "../controllers/pagos.js";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import helpersPagos from "../helpersClientes/pagos.js";


const pago = Router();

pago.get("/", httpPagos.getPago);
pago.get("/:codigo", httpPagos.getPago);
pago.post(
  "/",
  [
   
    check("codigo", "id no puede estar vacio").notEmpty(),
    
    // check("estado","Solo numeros").isNumeric(),
    validarCampos
  ],
  httpPagos.postPago),
  
// pago.put(
//   "/:codigo",
//   [
//     check("codigo", "Se necesita un mongoCc valido").isMongoId(),
//     check("codigo").custom(helpersPagos.validarExistaId),
//     validarCampos,
//   ],
//   httpPagos.postPago
// ),
pago.put(
  "/activar/:_id",
  [
    check("_id", "Se necesita un mongoId valido").isMongoId(),
    check("_id").custom(helpersPagos.validarExistaId),
    validarCampos,
  ],
  httpPagos.putPagoActivar
),
pago.put(
  "/desactivar/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersPagos.validarExistaId),
    validarCampos,
  ],
  httpPagos.putPagoDesactivar
),
pago.get("/total/plan/:id", httpPagos.totalPagosPlan);
pago.get("/total/clientes/:id", httpPagos.totalPagosCliente);
pago.get("/total/fechas", httpPagos.totalPagosEntreFechas);

export default pago