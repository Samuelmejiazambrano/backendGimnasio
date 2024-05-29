import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import httpInventario from "../controllers/inventario.js";
import helpersInventario from "../helpersClientes/inventario.js";

const inventario = Router();

inventario.get("/", httpInventario.getInventario);
inventario.get("/total", httpInventario.getTotal);

inventario.get("/:_id", httpInventario.getInventario);

inventario.post(
  "/",
  [
      
    check("codigo", "id no puede estar vacio").notEmpty(),
    check("codigo" ,"codigo minimo 4 numeros").isLength({ min: 4 }),
    // check("estado","Solo numeros").isNumeric(),
    validarCampos
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
    validarCampos,
  ],
  httpInventario.putInventarioActivar
),
inventario.put(
  "/desactivar/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersInventario.validarExistaId),
    validarCampos,
  ],
  httpInventario.putInventarioDesactivar
),

inventario.put("/actualizar/:_id", httpInventario.putInventario);
inventario.delete("/:_id", httpInventario.deleteInventario);

export default inventario