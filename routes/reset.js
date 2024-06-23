import { validarJWT } from "../middlewares/validar-jwt.js";
import { check } from "express-validator";
import { Router } from "express";
import httpReset from "../controllers/reset.js";

const router = Router()

router.put("/envio/email", [
    check("correo", "Debe proporcionar el correo").trim().not().isEmpty(),
], httpReset.envioEmail);

router.put("/nueva/contrasena", [
    check("nuevaContrasena", "La contraseÃ±a debe tener al menos 8 caracteres").trim().isLength({ min: 8 }),
    
], httpReset.nuevaContrasena);

export default router
