import venta from "../models/venta.js";
import { json } from "express";


const httpVenta={
  getVenta:async (req,res)=>{
    const ventas  =  await  venta.find()
    res.json({ventas})
  
},
  postVenta:async(req,res)=>{
          
    const { fecha,codigo,valor, valorUnitario,totalVentas, cantidad}=req.body
    const ventas = new venta({  fecha,codigo,valor,valorUnitario,totalVentas, cantidad});

     await ventas.save()
     res.json({ventas})
},
putVentaActivar:async(req,res)=>{
  const {_id}=req.params
  const ventas = await venta.findByIdAndUpdate(_id,{estado:1},({new:true}))
  res.json({ventas})


},
putventaDesactivar:async(req,res)=>{
  const {_id}=req.params
  const ventas = await venta.findByIdAndUpdate(_id,{estado:0},({new:true}))
  res.json({ventas})


},
getVentaId:async(req,res)=>{
  const {_id}=req.params
  const ventas =  await   venta.findById(_id)
  res.json({ventas})
},

getTotalVentasEntreFechas: async (req, res) => {
  try {
      const { fechaInicio, fechaFin } = req.query;
      const totalVentas = await venta.aggregate([
          {
              $match: {
                  createAt: {
                      $gte: new Date(fechaInicio),
                      $lte: new Date(fechaFin)
                  }
              }
          },
          {
              $group: {
                  _id: null,
                  total: { $sum: "$total" }
              }
          }
      ]);

      const total = totalVentas.length > 0 ? totalVentas[0].total : 0;

      res.json({ total });
  } catch (error) {
      res.status(4600).json({ error: "Error al obtener el total de las ventas" });
  }
},

getTotalVentasPorProductoEntreFechas: async (req, res) => {
  try {
      const { _id, fechaInicio, fechaFin } = req.query;
      const totalVentas = await venta.aggregate([
          {
              $match: {
                  _idid: mongoose.Types.ObjectId(_id),
                  createAt: {
                      $gte: new Date(fechaInicio),
                      $lte: new Date(fechaFin)
                  }
              }
          },
          {
              $group: {
                  _id: null,
                  total: { $sum: "$total" }
              }
          }
      ]);

      const total = totalVentas.length > 0 ? totalVentas[0].total : 0;

      res.json({ total });
  } catch (error) {
      res.status(4600).json({ error: "Error al obtener el total de las ventas por producto" });
        }
    }
}


export default httpVenta