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
putMantenimiento: async (req, res) => {
  try {
    const { _id } = req.params;
    const { codigo,descripcion,idMaquina,fecha,responsable,precio} = req.body;
    const mantenimientoActualizado = await mantenimiento.findByIdAndUpdate(_id, {  codigo,descripcion,idMaquina,fecha,responsable,precio}, { new: true });
    res.json({ maquina: mantenimientoActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el mantenimiento' });
  }
},
getMantenimientoCodigo:async(req,res)=>{
  const {codigo}=req.params
  const mantenimientos   =  await   mantenimiento.findById(codigo)
  res.json({mantenimientos})
},
}
export default httpMantenimiento