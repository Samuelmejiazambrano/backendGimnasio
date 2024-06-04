import ingreso from "../models/ingreso.js";
import { json } from "express";


const httpIngresos={
  getIngreso:async (req,res)=>{
    const ingresos  =  await  ingreso.find()
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
  const ingresos   =  await   ingreso.findById(_id)
  res.json({ingresos})
},
}
export default httpIngresos
