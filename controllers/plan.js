import plan from "../models/plan.js";
import { json } from "express";


const httpPlan={
  getPlan:async (req,res)=>{
    const planes  =  await  plan.find()
    res.json({planes})
  
},
getPlanActivo: async (req, res) => {
  try {
    const PlanActivos = await plan.find({ estado: 1 });
    res.json({ planes: PlanActivos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios activos' });
  }
},
getPlanInactivo: async (req, res) => {
  try {
    const PlanActivos = await plan.find({ estado: 0 });
    res.json({ planes: PlanActivos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios activos' });
  }
},
  postPlan:async(req,res)=>{
          
    const { codigo,CantDias,descripcion,valor,estado}=req.body
    const planes = new plan({codigo,CantDias,descripcion,valor,estado});

     await planes.save()
     res.json({planes})
},
putPlanActivar:async(req,res)=>{
  const {_id}=req.params
  const planes = await plan.findByIdAndUpdate(_id,{estado:1},{new:true})
  res.json({planes})


},
putPlanDesactivar:async(req,res)=>{
  const {_id}=req.params
  const planes = await plan.findByIdAndUpdate(_id,{estado:0},{new:true})
  res.json({planes})


},
getPlanCodigo:async(req,res)=>{
  const {_id}=req.params
  const planes  =  await plan.findById(_id)
  res.json({planes})
},
putPlan: async (req, res) => {
  try {
    const { _id } = req.params;
    const {  sede,
      codigo,CantDias,descripcion,valor,estado} = req.body;
    const PlanActualizado = await plan.findByIdAndUpdate(_id, {  sede,
      codigo,CantDias,descripcion,valor,estado
      }, { new: true });
    res.json({ usuarios: PlanActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el plan' });
  }
},
}
export default httpPlan