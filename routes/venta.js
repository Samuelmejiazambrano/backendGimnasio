import { Router } from "express";
import httpVenta from "../controllers/venta.js";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import helpersVenta from "../helpersClientes/venta.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const venta = Router();

venta.get("/", validarJWT, httpVenta.getVenta);
venta.get("/fechas", httpVenta.getTotalVentasEntreFechas);

venta.get("/:_id", validarJWT, httpVenta.getVentaId);
venta.post(         
  "/",         
  [                 
    check("codigoProducto", "id no puede estar vacio").notEmpty(),
    check("codigoProducto" ,"id minimo 2 numeros").isLength({ min: 4 }),
    validarCampos,validarJWT
  ],     
  
  httpVenta.postVenta                                       
);
                                     
venta.put(
  "/activar/:_id",
  [
    check("_id", "Se necesita un mongoId valido").isMongoId(),
    check("_id").custom(helpersVenta.validarExistaId),
    validarCampos,validarJWT
  ],
  
  httpVenta.putVentaActivar
);

venta.put(
  "/desactivar/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersVenta.validarExistaId),
    validarCampos,validarJWT
  ],
  
  httpVenta.putventaDesactivar
);
venta.put("/actualizar/:_id",validarJWT, httpVenta.putVenta);


export default venta;
