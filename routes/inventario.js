import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import httpInventario from "../controllers/inventario.js";
import { validarJWT,generarJWT } from "../middlewares/validar-jwt.js";
import helpersInventario from "../helpersClientes/inventario.js";
import httpIngresos from "../controllers/ingresos.js";

const inventario = Router();

inventario.get("/",validarJWT, httpInventario.getInventario);
inventario.get("/total",validarJWT, httpInventario.getTotal);
inventario.get("/activos",validarJWT, httpInventario.getInventarioActivo);
inventario.get("/inactivos", validarJWT,httpInventario.getInventarioInactivo);
inventario.get("/:_id",validarJWT, httpInventario.getInventario);

inventario.post(
  "/",
  [
    check("codigo").custom(helpersInventario.validarClienteUnica),
    check("codigo", "id no puede estar vacio").notEmpty(),
    validarCampos,validarJWT
  ],
  httpInventario.postInventario),    
   
// ingreso.put(
//   "/:_id",
//   [
//     check("_id", "Se necesita un mongoCc valido").isMongoId(),
//     check("_id").custom(helpersClientes.validarExistaId),
//     validarCampos,
//   ],
//   httpIngresos.p
// ),
inventario.put(
  "/activar/:_id",
  [
    check("_id", "Se necesita un mongoId valido").isMongoId(),
    check("_id").custom(helpersInventario.validarExistaId),
    validarCampos,validarJWT
  ],
  httpInventario.putInventarioActivar
),
inventario.put(
  "/desactivar/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersInventario.validarExistaId),
    validarCampos,validarJWT
  ],
  httpInventario.putInventarioDesactivar
),

inventario.put("/actualizar/:_id",  [
  check("codigo").custom(helpersInventario.validarClienteUnica),
  check("codigo", "id no puede estar vacio").notEmpty(),
  validarCampos,validarJWT
],validarJWT, httpInventario.putInventario);
inventario.delete("/:_id",validarJWT, httpInventario.deleteInventario);

export default inventario