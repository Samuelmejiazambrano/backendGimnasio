import sede from "../models/sede.js";
import { json } from "express";


const httpSede={
  getSede:async (req,res)=>{
    const sedes  =  await  sede.find()
    res.json({sedes})
  
},
getSedeActivo: async (req, res) => {
  try {
    const SedeActivos = await sede.find({ estado: 1 });
    res.json({ sedes: SedeActivos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios activos' });
  }
},
getSedeInactivo: async (req, res) => {
  try {
    const SedeinacActivos = await sede.find({ estado: 0 });
    res.json({ sedes: SedeinacActivos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios activos' });
  }
},
  postSede:async(req,res)=>{
          
    const { codigo,id,nombre,direccion,ciudad,telefono,estado,horario}=req.body
    const sedes = new sede({ codigo,id,nombre,direccion,ciudad,telefono,estado,horario});

     await sedes.save()
     res.json({sedes})
},
putSedeActivar:async(req,res)=>{
  const {_id}=req.params
  const sedes = await sede.findByIdAndUpdate(_id,{estado:1},({new:true}))
  res.json({sedes})


},
putSedeDesactivar:async(req,res)=>{
  const {_id}=req.params
  const sedes = await sede.findByIdAndUpdate(_id,{estado:0},({new:true}))
  res.json({sedes})


},
putSede: async (req, res) => {
  try {
    const { _id } = req.params;
    const {   codigo,id,nombre,direccion,ciudad,telefono,estado,horario} = req.body;
    const SedeActualizado = await sede.findByIdAndUpdate(_id, {  codigo,id,nombre,direccion,ciudad,telefono,estado,horario
      }, { new: true });
    res.json({ usuarios:  SedeActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el inventario' });
  }
},
getSedeId:async(req,res)=>{
  const {_id}=req.params
  const sedes =  await   sede.findById(_id)
  res.json({sedes})
},
}
export default httpSede