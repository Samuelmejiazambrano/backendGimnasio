import { Router } from "express";

import  httpMantenimiento from "../controllers/mantenimiento.js";


const mantenimiento = Router();

mantenimiento.get("/", httpMantenimiento.getMantenimiento);
mantenimiento.post(
  "/",   httpMantenimiento.postMantenimiento);
 mantenimiento.put(
  "/actualizar/:_id",   httpMantenimiento.postMantenimiento);
  mantenimiento.put(
    "/activar/:_id",
   
    httpMantenimiento.putMantenimientoActivar
  ),
  mantenimiento.put(
    "/desactivar/:_id",
   
    
    httpMantenimiento.putMantenimientoDesactivar   
  )
//   maquinaria.put(
//   "/actualizar/:_id", httpMaquinaria.putMaquinaria
// );
  
  
// ingreso.put(
//   "/:_id",
//   [
//     check("_id", "Se necesita un mongoCc valido").isMongoId(),
//     check("_id").custom(helpersClientes.validarExistaId),
//     validarCampos,
//   ],
//   httpIngresos.p
// ),
// inventario.put(
//   "/activar/:_id",
//   [
//     check("_id", "Se necesita un mongoId valido").isMongoId(),
//     check("_id").custom(helpersInventario.validarExistaId),
//     validarCampos,
//   ],
//   httpInventario.putInventarioActivar
// ),
// inventario.put(
//   "/desactivar/:_id",
//   [
//     check("_id", "Se necesita un mongoCc valido").isMongoId(),
//     check("_id").custom(helpersInventario.validarExistaId),
//     validarCampos,
//   ],
//   httpInventario.putInventarioDesactivar
// )


export default mantenimiento