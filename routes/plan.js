import { Router } from "express";
import httpPlan from "../controllers/plan.js";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPlan from "../helpersClientes/plan.js";

const Plan = Router();

Plan.get("/", validarJWT, httpPlan.getPlan);
Plan.get("/activos", validarJWT, httpPlan.getPlanActivo);
Plan.get("/inactivos", validarJWT, httpPlan.getPlanInactivo);
Plan.get("/:_id", validarJWT, httpPlan.getPlanCodigo);
Plan.post(
  "/",
  [
    check("codigo", "El código no puede estar vacío").notEmpty(),
    check("codigo", "El código debe tener al menos 4 caracteres").isLength({ min: 4 }),
    check("codigo").custom(helpersPlan.validarClienteUnica),
    check("CantDias", "Ingresar cantidad de días").notEmpty(),
    validarCampos
  ],
  validarJWT,
  httpPlan.postPlan
);

Plan.put("/activar/:_id", validarJWT, httpPlan.putPlanActivar);
Plan.put("/desactivar/:_id", validarJWT, httpPlan.putPlanDesactivar);
Plan.put("/actualizar/:_id",  [
  check("codigo", "El código no puede estar vacío").notEmpty(),
  check("codigo", "El código debe tener al menos 4 caracteres").isLength({ min: 4 }),
  check("codigo").custom(helpersPlan.validarClienteUnica),
  validarCampos
], validarJWT, httpPlan.putPlan);

export default Plan;
