import { Router } from "express";
import httpMantenimiento from "../controllers/mantenimiento.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const mantenimiento = Router();

mantenimiento.get("/", validarJWT, httpMantenimiento.getMantenimiento);
mantenimiento.get("/:_id", validarJWT, httpMantenimiento.getMantenimientoCodigo);
mantenimiento.post("/", validarJWT, httpMantenimiento.postMantenimiento);
mantenimiento.put("/actualizar/:_id", validarJWT, httpMantenimiento.postMantenimiento);
mantenimiento.put("/activar/:_id", validarJWT, httpMantenimiento.putMantenimientoActivar);
mantenimiento.put("/desactivar/:_id", validarJWT, httpMantenimiento.putMantenimientoDesactivar);

export default mantenimiento;
                     