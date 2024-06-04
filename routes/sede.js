import { Router } from "express";
import httpSede from "../controllers/sede.js";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import helpersSede from "../helpersClientes/sede.js";
import { validarJWT,generarJWT } from "../middlewares/validar-jwt.js";


const sede = Router();

sede.get("/", httpSede.getSede);
sede.get("/activos", httpSede.getSedeActivo);
sede.get("/inactivos", httpSede.getSedeInactivo);
sede.get("/:_id", httpSede.getSede);
sede.post(
  "/",
  [
   
    check("codigo", "id no puede estar vacio").notEmpty(),
    check("codigo" ,"id minimo 2 numeros").isLength({ min: 4 }),
 
    validarCampos,validarJWT
  ],
  httpSede.postSede),
  

sede.put(
  "/activar/:_id",
  [
    check("_id", "Se necesita un mongoId valido").isMongoId(),
    check("_id").custom(helpersSede.validarExistaId),
    validarCampos,
  ],
  httpSede.putSedeActivar
),
sede.put(
  "/desactivar/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersSede.validarExistaId),
    validarCampos,
  ],
  
  httpSede.putSedeDesactivar
)
sede.put("/actualizar/:_id", httpSede.putSede);

export default sede