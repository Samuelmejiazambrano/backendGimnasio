import pago from "../models/pagos.js";
import { json } from "express";

const httpPagos = {
  getPago: async (req, res) => {
    const pagos = await pago.find();
    res.json({ pagos });
  },
  postPago: async (req, res) => {
    const { codigo,  plan, idClientes, valor } = req.body;
    const pagos = new pago({ codigo,  plan, idClientes, valor});

    await pagos.save();
    res.json({ pagos });
  },
  putPagoActivar: async (req, res) => {
    const { _id } = req.params;
    const pagos = await pago.findByIdAndUpdate(
      _id,
      { estado: 1 },
      { new: true }
    );
    res.json({ pagos });
  },
  putPagoDesactivar: async (req, res) => {
    const { _id } = req.params;
    const pagos = await pago.findByIdAndUpdate(
      _id,
      { estado: 0 },
      { new: true }
    );
    res.json({ pagos });
  },

  async totalPagosPlan(req, res) {
    const {_id }= req.params;
    const pagos = await pago.find({ plans:_id });
    res.json(pagos);
  },

  async totalPagosCliente(req, res) {
    const {_id}= req.params;
    const pagos = await pago.find({ idCliente:_id});
    res.json(pagos);
  },

  async totalPagosEntreFechas(req, res) {
    const { fechaInicio, fechaFin } = req.body;
    const pagos = await pago.find({
      fecha: {$gte: fechaInicio, $lte:fechaFin},
    });
    res.json(pagos);
  },
};
export default httpPagos;
