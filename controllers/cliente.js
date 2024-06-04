import Cliente from "../models/clientes.js";
import { json } from "express";
import plan from "../models/plan.js";
import cron from "node-cron"


const httpcliente={
  getCliente:async (req,res)=>{
    const cliente  =  await  Cliente.find()
    res.json({cliente})
  
},
  postCliente:async(req,res)=>{
          
    const { cc,nombre,fechaIngreso,fechaNac,edad,direccion,telefono,estado,foto,plan,seguimiento}=req.body
    const cliente = new Cliente({cc,nombre,fechaIngreso,fechaNac,edad,direccion,telefono,estado,foto,plan,seguimiento});

     await cliente.save()
     res.json({cliente})
},
postSeguimiento: async (req, res) => {
    const {_id} = req.params;

    const { fechaIngreso, peso, imc, brazo, cintura, pie, estatura } = req.body;

    const cliente = await Cliente.findById(_id);

    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

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
  const {nombre,fechaIngreso,fechaNac,edad,direccion,telefono,estado,foto,seguimiento}=req.body
  const clientes = await Cliente.findByIdAndUpdate(_id,{nombre,fechaIngreso,fechaNac,edad,direccion,telefono,estado,foto,seguimiento }) 
  res.json({clientes})
},

getListar:async (req,res)=>{
  const {codigo}=req.params
  const cliente  =  await  plan.findById(codigo)
  res.json({plan})
},
async getCumple(req, res) {
  const clientes = await Cliente.find({ fechaNac:{ $gte: new Date(new Date().setDate(new Date().getDate() - 30)) } });
  res.json(clientes);
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

}
export default httpcliente

