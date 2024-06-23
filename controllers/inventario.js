
import inventario from "../models/inventario.js";

import { json } from "express";

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const httpInventario={

  getInventario:async (req,res)=>{
    const inventarios  =  await  inventario.find()
    res.json({inventarios})
  
},
getInventarioActivo: async (req, res) => {
  try {
    const InventarioActivos = await inventario.find({ estado: 1 });
    res.json({ sedes: InventarioActivos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios activos' });
  }
},
getInventarioInactivo: async (req, res) => {
  try {
    const InventarioinacActivos = await inventario.find({ estado: 0 });
    res.json({ sedes: InventarioinacActivos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios activos' });
  }
},
  postInventario:async(req,res)=>{
          
    const {   descripcion,codigo,valor,cantidad,stock}=req.body
    const inventarios = new inventario({  descripcion,codigo,valor,cantidad,stock});
  
     await inventarios.save()       
     res.json({inventarios})
},
putInventarioActivar:async(req,res)=>{
  const {_id}=req.params
  const inventarios = await inventario.findByIdAndUpdate(_id,{estado:1},{new:true})
  res.json({inventarios})

},
putInventarioDesactivar:async(req,res)=>{
  const {_id}=req.params
  const inventarios = await inventario.findByIdAndUpdate(_id,{estado:0},{new:true})
  res.json({inventarios})


},

putInventario: async (req, res) => {
  try {
    const { _id } = req.params;
    const { descripcion, codigo, valor, cantidad } = req.body;
    const inventarioActualizado = await inventario.findByIdAndUpdate(_id, { descripcion, codigo, valor, cantidad }, { new: true });
    res.json({ inventario: inventarioActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el inventario' });
  }
},

getInventarioCodigo:async(req,res)=>{
  const {_id}=req.params
  const inventarios   =  await   inventario.findById(_id)
  res.json({inventarios})
},

getTotal: async (req, res) => {
  try {
    const inventarios = await inventario.find();
    const total = inventarios.reduce((acc, inventario) => {
      return acc + inventario.valor * inventario.cantidad;
    }, 0);
    const formattedTotal = formatNumber(total);
    res.json({ total: formattedTotal });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el total del inventario" });
  }
},
deleteInventario:async(req,res)=>{
  const {_id}=req.params
  const inventarios = await inventario.findByIdAndDelete(_id,({new:true}))
  res.json({inventarios})
}
}       
export default httpInventario             