import { Router } from "express";
import httpPlan from "../controllers/plan.js";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import { validarJWT,generarJWT } from "../middlewares/validar-jwt.js";

import helpersPlan from "../helpersClientes/plan.js";
// import httpPlan from "../controllers/plan.js";
// import plan from "../models/plan.js";

const Plan = Router();

Plan.get("/", httpPlan.getPlan);
Plan.get("/activos", httpPlan.getPlanActivo);
Plan.get("/inactivos", httpPlan.getPlanInactivo);
Plan.get("/:codigo", httpPlan.getPlan);
Plan.post(
  "/",
  [
   
    check("codigo", "id no puede estar vacio").notEmpty(),
    check("codigo" ,"id minimo 2 numeros").isLength({ min: 4 }),
    check("CantDias" ,"ingresar cantidad de dias").notEmpty(),
    // check("estado","Solo numeros").isNumeric(),
    validarCampos,validarJWT
  ],
  httpPlan.postPlan),
  
// Plan.put(
//   "/:codigo",
//   [
//     check("codigo", "Se necesita un mongoCc valido").isMongoId(),
//     check("codigo").custom(helpersPlan.validarExistaId),
//     validarCampos,
//   ],
//   httpPlan.postPlan
// ),
Plan.put(
  "/activar/:_id", httpPlan.putPlanActivar
),
Plan.put(
  "/desactivar/:_id",  httpPlan.putPlanDesactivar
)
Plan.put("/actualizar/:_id", httpPlan.putPlan);


export default Plan     