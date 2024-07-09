import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import { validarJWT, generarJWT } from "../middlewares/validar-jwt.js";
import helpersIngreso from "../helpersClientes/ingreso.js";

import httpMaquinaria from "../controllers/maquinaria.js";

const maquinaria = Router();

maquinaria.get("/", validarJWT, httpMaquinaria.getMaquinaria);
maquinaria.get("/activos", [validarJWT], httpMaquinaria.getMaquinariaActivo);
maquinaria.get(
  "/inactivos",
  [validarJWT],
  httpMaquinaria.getMaquinariaInactivo
);
maquinaria.get("/:_id", [validarJWT], httpMaquinaria.getMaquinariaCodigo);

maquinaria.post(
  "/",
  [
    check("codigo", "id no puede estar vacio").notEmpty(),
    check("codigo").custom(helpersIngreso.validarClienteUnica),
    check("codigo", "id minimo 2 numeros").isLength({ min: 4 }),

    validarCampos
  ],
  httpMaquinaria.postMaquinaria
);
maquinaria.put("/actualizar/:_id", [validarJWT], httpMaquinaria.putMaquinaria);

maquinaria.put(
  "/activar/:_id",
  [validarJWT],
  httpMaquinaria.putMaquinariaActivar
),
  maquinaria.put(
    "/desactivar/:_id",
    [validarJWT],
    httpMaquinaria.putMaquinariaDesactivar
  );
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

export default maquinaria;
