import Cliente from "../models/clientes.js";
import { json } from "express";
import plan from "../models/plan.js";
import cron from "node-cron"


const httpcliente={
  getCliente:async (req,res)=>{
    const cliente  =  await  Cliente.find();
    res.json({cliente})
  
},
postCliente: async (req, res) => {
  const { cc, nombre, fechaIngreso, fechaNac, edad, direccion, telefono, estado, foto, plan, seguimiento } = req.body;

  try {
    // Verificar si la cédula ya existe
    const clienteExistente = await Cliente.findOne({ cc });
    if (clienteExistente) {
      return res.status(400).json({ message: "La cédula ya existe." });
    }

    const cliente = new Cliente({ cc, nombre, fechaIngreso, fechaNac, edad, direccion, telefono, estado, foto, plan, seguimiento });
    await cliente.save();
    res.json({ cliente });
  } catch (error) {
    console.error("Error al agregar cliente:", error);
    res.status(500).json({ message: "Error al agregar cliente" });
  }
},

postSeguimiento: async (req, res) => {
  const { _id } = req.params;
  const { fechaIngreso, peso, brazo, cintura, pie, estatura } = req.body;
     
  const cliente = await Cliente.findById(_id);

  if (!cliente) {
    return res.status(404).json({ error: "Cliente no encontrado" });
  }

  const imc = peso / ((estatura / 100) ** 2).toFixed(3);; // Calcular IMC

  cliente.seguimiento.push({  
    fechaIngreso,   
    peso,   
    imc,
    brazo,
    cintura,
    pie,
    estatura       
  });

  await cliente.save();
 
  res.json({ cliente });
},
      
putClienteActivar:async(req,res)=>{
  const {_id}=req.params
  const cliente = await Cliente.findByIdAndUpdate(_id,{estado:1},{new:true})
  res.json({cliente})

},
putClienteDesactivar:async(req,res)=>{


  cron.schedule('0 0 * * *', async () => {
    const {_id}=req.params
    const cliente = await Cliente.findByIdAndUpdate(_id,{estado:0},{new:true})
    res.json({cliente})   
  });
  
},
getClienteCc:async(req,res)=>{
  const {_id}=req.params
  const cliente   =  await   Cliente.findById(_id)
  res.json({cliente})
},
putcliente:async(req,res)=>{
  const {_id}=req.params
  const {cc,nombre,fechaIngreso,fechaNac,edad,direccion,telefono,estado,foto,seguimiento}=req.body
  const clientes = await Cliente.findByIdAndUpdate(_id,{cc,nombre,fechaIngreso,fechaNac,edad,direccion,telefono,estado,foto,seguimiento }) 
  res.json({clientes})
},

getListar:async (req,res)=>{
  const {codigo}=req.params
  const cliente  =  await  plan.findById(codigo)
  res.json({plan})
},
async getCumple(req, res) {
  try {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; 

    const clientes = await Cliente.find();

    const clientesCumple = clientes.filter(cliente => {
      const fechaNac = new Date(cliente.fechaNac);
      return fechaNac.getMonth() + 1 === currentMonth;
    });

    res.json(clientesCumple);
  } catch (error) {
    console.error("Error al obtener clientes con cumpleaños en el mes actual:", error);
    res.status(500).json({ message: "Error al obtener clientes con cumpleaños en el mes actual" });
  }
},


getTotalPer:async (req,res)=>{
    const cantidadCliente = await Cliente.countDocuments();
  
  res.json({cantidadCliente})
},

async listarSeguimiento(req, res) {
  const {_id} = req.params
  const cliente = await Cliente.findById(_id).populate('seguimiento');
  res.json(cliente);
},

async listarPorPlan(req, res) {
  const { plan } = req.params;
  const clientes = await Cliente.find({ plan: plan });
  res.json(clientes);
},
putSeguimiento: async (req, res) => {
  const { clienteId, seguimientoId } = req.params;
  const { fechaIngreso, peso, brazo, cintura, pie, estatura } = req.body;

  try {
    const cliente = await Cliente.findById(clienteId);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const seguimiento = cliente.seguimiento.id(seguimientoId);

    if (!seguimiento) {
      return res.status(404).json({ error: "Seguimiento no encontrado para este cliente" });
    }

    const imc = peso / ((estatura / 100) ** 2); 

    seguimiento.fechaIngreso = fechaIngreso;
    seguimiento.peso = peso;
    seguimiento.imc = imc;
    seguimiento.brazo = brazo;
    seguimiento.cintura = cintura;
    seguimiento.pie = pie;
    seguimiento.estatura = estatura;

    await cliente.save();

    res.json({ cliente });
  } catch (error) {
    console.error("Error al actualizar seguimiento:", error);
    res.status(500).json({ error: "Hubo un error al intentar actualizar el seguimiento" });
  }
},
}
export default httpcliente

