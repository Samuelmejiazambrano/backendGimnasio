import { Router } from "express";
import httpSede from "../controllers/sede.js";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import helpersSede from "../helpersClientes/sede.js";
import { validarJWT,generarJWT } from "../middlewares/validar-jwt.js";


const sede = Router();

sede.get("/",validarJWT,httpSede.getSede);
sede.get("/activos",validarJWT, httpSede.getSedeActivo);
sede.get("/inactivos", validarJWT,httpSede.getSedeInactivo);
sede.get("/:_id",validarJWT, httpSede.getSedeId);
sede.post(       
  "/",
  [        
   
    check("codigo", "id no puede estar vacio").notEmpty(),
    check("codigo" ,"id minimo 2 numeros").isLength({ min: 4 }),
    check("codigo").custom(helpersSede.validarClienteUnica),

    validarCampos,validarJWT          
  ],       
  httpSede.postSede),       
  

sede.put(
  "/activar/:_id",
  [
    check("_id", "Se necesita un mongoId valido").isMongoId(),
    check("_id").custom(helpersSede.validarExistaId),
    validarCampos,validarJWT
  ],
  httpSede.putSedeActivar      
),     
sede.put(
  "/desactivar/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersSede.validarExistaId),
    validarCampos,validarJWT
  ],
  
  httpSede.putSedeDesactivar
)
sede.put("/actualizar/:_id",validarJWT, httpSede.putSede);

export default sede