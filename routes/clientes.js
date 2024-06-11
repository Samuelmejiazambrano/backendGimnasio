import { Router } from "express";
import httpClientes from "../controllers/cliente.js";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import helpersClientes from "../helpersClientes/cliente.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", validarJWT, httpClientes.getCliente);
router.get("/:_id", validarJWT, httpClientes.getClienteCc);
router.post(
  "/",
  [
    check("cc", "cc no puede estar vacio").notEmpty(),
    check("cc").isLength({ min: 8 }),
    validarCampos
  ],
  validarJWT,
  httpClientes.postCliente
);
router.post(
  "/seguimiento/:_id",
  [
    // Validaciones para la ruta de seguimiento si es necesario
    validarCampos, validarJWT
  ],
 
  httpClientes.postSeguimiento
);
router.put(
  "/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersClientes.validarExistaId),
    validarCampos,
  ],
  validarJWT,
  httpClientes.putcliente
);
router.put(
  "/activar/:_id",
  [
    check("_id", "Se necesita un mongoId valido").isMongoId(),
    check("_id").custom(helpersClientes.validarExistaId),
    validarCampos,
  ],
  validarJWT,
  httpClientes.putClienteActivar
);
router.put(
  "/desactivar/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersClientes.validarExistaId),
    validarCampos,
  ],
  validarJWT,
  httpClientes.putClienteDesactivar
);

router.get("/total/clientes", validarJWT, httpClientes.getTotalPer);
router.get("/listar/cumpleanos", validarJWT, httpClientes.getCumple);
router.get('/clientes/plan/:plan', validarJWT, httpClientes.listarPorPlan);

router.get("/listar/seguimiento/:id", validarJWT, httpClientes.listarSeguimiento);      

export default router;
