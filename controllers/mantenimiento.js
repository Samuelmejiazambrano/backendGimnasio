import mantenimiento from "../models/mantenimiento.js";
import { json } from "express";


const httpMantenimiento={
  getMantenimiento:async (req,res)=>{
    const mantenimientos  =  await  mantenimiento.find()
    res.json({mantenimientos})
  
},
  postMantenimiento:async(req,res)=>{
          
    const { codigo,descripcion,idMaquina,fecha,responsable,precio}=req.body
    const mantenimientos = new mantenimiento({codigo,descripcion,idMaquina,fecha,responsable,precio});

     await mantenimientos.save()
     res.json({})
},
putMantenimientoActivar:async(req,res)=>{
  const {_id}=req.params
  const mantenimientos = await mantenimiento.findByIdAndUpdate(_id,{estado:1},{new:true})
  res.json({mantenimientos})


},
putMantenimientoDesactivar:async(req,res)=>{
  const {_id}=req.params
  const mantenimientos = await mantenimiento.findByIdAndUpdate(_id,{estado:0},{new:true})
  res.json({mantenimientos})


},
getMantenimientoCodigo:async(req,res)=>{
  const {codigo}=req.params
  const mantenimientos   =  await   mantenimiento.findById(codigo)
  res.json({mantenimientos})
},
}
export default httpMantenimiento