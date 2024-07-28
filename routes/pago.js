import { Router } from "express";
import httpPagos from "../controllers/pagos.js";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import { validarJWT, generarJWT } from "../middlewares/validar-jwt.js";
import helpersPagos from "../helpersClientes/pagos.js";

const pago = Router();

pago.use(validarJWT);

// Rutas sin protección con validarJWT
pago.get("/", httpPagos.getPago);
pago.get("/activos", httpPagos.getPagoActivo);
pago.get("/inactivos",httpPagos.getPagoInactivo);
pago.get("/fechas", httpPagos.getTotalPagosEntreFechas);

pago.get("/:_id", httpPagos.getPagoId);

     
pago.post(
  "/",
  [
    check("codigo", "id no puede estar vacio").notEmpty(),
    check("codigo").custom(helpersPagos.validarClienteUnica),    
    validarCampos
  ],
  httpPagos.postPago
);

pago.put(
  "/activar/:_id",
  [
    check("_id", "Se necesita un mongoId valido").isMongoId(),
    check("_id").custom(helpersPagos.validarExistaId),
    validarCampos,
  ],
  httpPagos.putPagoActivar
);

pago.put(
  "/desactivar/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersPagos.validarExistaId),
    validarCampos,
  ],
  httpPagos.putPagoDesactivar
);
pago.put("/actualizar/:_id", [
  check("codigo", "codigo no puede estar vacio").notEmpty(),
  check("codigo").custom(helpersPagos.validarClienteUnica),    
  validarCampos
],validarJWT, httpPagos.putPago);

pago.get("/total/plan/:id", httpPagos.totalPagosPlan);
pago.get("/total/clientes/:id", httpPagos.totalPagosCliente);
pago.get("/total/fechas", httpPagos.totalPagosEntreFechas);
pago.get("/:_id", validarJWT, httpPagos.getPagoId);

export default pago;
