import pago from "../models/pagos.js";
import { json } from "express";

const httpPagos = {
  getPago: async (req, res) => {
    const pagos = await pago.find().populate('plan').populate('idCliente');
    res.json({ pagos });
  },
  postPago: async (req, res) => {
    const { codigo, plan, idCliente, valor } = req.body;
    const pagos = new pago({ codigo, plan, idCliente, valor });

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
    const { _id } = req.params;
    const pagos = await pago.find({ plans: _id });
    res.json(pagos);
  },

  async totalPagosCliente(req, res) {
    const { _id } = req.params;
    const pagos = await pago.find({ idCliente: _id });
    res.json(pagos);
  },

  async totalPagosEntreFechas(req, res) {
    const { fechaInicio, fechaFin } = req.body;
    const pagos = await pago.find({
      fecha: { $gte: fechaInicio, $lte: fechaFin },
    });
    res.json(pagos);
  },
  getPagoId: async (req, res) => {
    const { _id } = req.params;
    const pagos = await pago.findById(_id).populate('plan').populate('idCliente');
    res.json({ pagos });
  },

  getPagoActivo: async (req, res) => {
    try {
      const pagosActivos = await pago.find({ estado: 1 });
      res.json(pagosActivos);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener pagos activos", error });
    }
  },

  getPagoInactivo: async (req, res) => {
    try {
      const pagosInactivos = await pago.find({ estado: 0 });
      res.json(pagosInactivos);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener pagos inactivos", error });
    }
  },
  putPago: async (req, res) => {
    try {
      const { _id } = req.params;
      const { codigo, plan, idClientes, valor } = req.body;
      const PagoActualizado = await pago.findByIdAndUpdate(
        _id,
        { codigo, plan, idClientes, valor },
        { new: true }
      );
      res.json({ usuarios: PagoActualizado });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el plan" });
    }
  },
};
export default httpPagos;
