import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import httpMaquinaria from "../controllers/maquinaria.js";


const maquinaria = Router();

maquinaria.get("/", httpMaquinaria.getMaquinaria);
maquinaria.get("/activos", httpMaquinaria.getMaquinariaActivo);
maquinaria.get("/inactivos", httpMaquinaria.getMaquinariaInactivo);
maquinaria.get("/:_id", httpMaquinaria.getMaquinariaCodigo);

maquinaria.post(
  "/",   httpMaquinaria.postMaquinaria);
  maquinaria.put(
  "/actualizar/:_id", httpMaquinaria.putMaquinaria
);
  
maquinaria.put(
  "/activar/:_id", httpMaquinaria.putMaquinariaActivar
),
maquinaria.put(
  "/desactivar/:_id",  httpMaquinaria.putMaquinariaDesactivar
)
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


export default maquinaria