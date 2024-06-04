import maquinaria from "../models/maquinaria.js";
import { json } from "express";


const httpMaquinaria={
  getMaquinaria:async (req,res)=>{
    const maquinarias  =  await  maquinaria.find()
    res.json({maquinarias})
  
},
  postMaquinaria:async(req,res)=>{
          
    const { codigo,descripcion,idSede, FechaUmantenimiento,fecha}=req.body
    const maquinarias = new maquinaria({codigo,descripcion,idSede, FechaUmantenimiento,fecha});

     await maquinarias.save()
     res.json({maquinarias})
},
putMaquinariaActivar:async(req,res)=>{
  const {_id}=req.params
  const maquinarias = await maquinaria.findByIdAndUpdate(_id,{estado:1},({new:true}))
  res.json({maquinarias})


},
putMaquinariaDesactivar:async(req,res)=>{    
  const {_id}=req.params
  const maquinarias = await maquinaria.findByIdAndUpdate(_id,{estado:0},({new:true}))
  res.json({maquinarias})


},
putMaquinaria: async (req, res) => {
  try {
    const { _id } = req.params;
    const { codigo,descripcion,idSede, FechaUmantenimiento,fecha } = req.body;
    const MaquinaActualizado = await maquinaria.findByIdAndUpdate(_id, { codigo,descripcion,idSede, FechaUmantenimiento,fecha }, { new: true });
    res.json({ maquina: MaquinaActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el inventario' });
  }
},
getMaquinariaCodigo:async(req,res)=>{
  const {codigo}=req.params
  const maquinarias   =  await   maquinaria.findById(codigo)
  res.json({maquinarias})
},
getMaquinariaActivo: async (req, res) => {
  try {
    const MaquinariaActivos = await maquinaria.find({ estado: 1 });
    res.json({ planes: MaquinariaActivos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios activos' });
  }
},
getMaquinariaInactivo: async (req, res) => {
  try {
    const MaquinariaInacActivos = await maquinaria.find({ estado: 0 });
    res.json({ planes: MaquinariaInacActivos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios activos' });
  }
},
}
export default httpMaquinaria