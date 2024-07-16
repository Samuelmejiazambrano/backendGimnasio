import ingreso from "../models/ingreso.js";

import { json } from "express";


const httpIngresos={
  getIngreso:async (req,res)=>{
    const ingresos = await ingreso.find().populate('cliente').populate('sede');
    res.json({ingresos})
  
},
  postIngreso:async(req,res)=>{
          
    const { codigo,cliente,sede}=req.body
    const ingresos = new ingreso({codigo,cliente,sede});

     await ingresos.save()        
     res.json({ingresos})
},
putIngresoActivar:async(req,res)=>{
  const {codigo}=req.params
  const ingresos = await ingreso.findByIdAndUpdate(codigo,{estado:1},({new:true}))
  res.json({ingresos})


},
putIngresoDesactivar:async(req,res)=>{
  const {codigo}=req.params
  const ingresos = await ingreso.findByIdAndUpdate(codigo,{estado:0},({new:true}))
  res.json({ingresos})


},
getIngresoCodigo:async(req,res)=>{
  const {_id}=req.params
  const ingresos   =  await ingreso.findById(_id).populate('cliente').populate('sede');
  res.json({ingresos})
},
putIngreso: async (req, res) => {
  try {
    const { _id } = req.params;
    const {codigo,cliente,sede} = req.body;
    const IngresoActualizado = await ingreso.findByIdAndUpdate( _id, { codigo,cliente,sede},  { new: true }
    );
    res.json({ Ingreso:IngresoActualizado });
  } catch (error) {
  
    res.status(500).json({ error: "Error al actualizar la Ingreso" });
  }
},
}
export default httpIngresos
