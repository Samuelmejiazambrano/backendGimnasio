import { Router } from "express";
import httpClientes from "../controllers/cliente.js";
import { check } from "express-validator";
import { validarCampos } from "../validaciones/validar.js";
import helpersClientes from "../helpersClientes/cliente.js"

const router = Router();

router.get("/", httpClientes.getCliente);
router.get("/:_id", httpClientes.getClienteCc);
router.post(
  "/",
  [
   
    check("cc", "cc no puede estar vacio").notEmpty(),
    check("cc").isLength({ min: 8 }),
    // check("estado","Solo numeros").isNumeric(),
    validarCampos
  ],
  httpClientes.postCliente),
  router.post(
    "/seguimiento/:_id",
    [
     
     
    
      validarCampos
    ],
    httpClientes.postSeguimiento),
router.put(
  "/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersClientes.validarExistaId),
    validarCampos,
  ],
  httpClientes.putcliente
),
router.put(
  "/activar/:_id",
  [
    check("_id", "Se necesita un mongoId valido").isMongoId(),
    check("_id").custom(helpersClientes.validarExistaId),
    validarCampos,
  ],
  httpClientes.putClienteActivar
),
router.put(
  "/desactivar/:_id",
  [
    check("_id", "Se necesita un mongoCc valido").isMongoId(),
    check("_id").custom(helpersClientes.validarExistaId),
    validarCampos,
  ],
  httpClientes.putClienteDesactivar
)

router.get("/total/clientes", httpClientes.getTotalPer);
router.get("/listar/cumpleanos", httpClientes.getCumple);
router.get('/clientes/plan/:plan', httpClientes.listarPorPlan);

router.get("/listar/seguimiento/:id", httpClientes.listarSeguimiento);      
   

export default router                                                                        