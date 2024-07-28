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
  getTotalPagosEntreFechas: async (req, res) => {
    try {
      const { fechaInicio, fechaFin } = req.query;

      if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ error: "Se requieren fechas de inicio y fin" });
      }

      const startDate = new Date(fechaInicio);
      const endDate = new Date(fechaFin);

      if (isNaN(startDate) || isNaN(endDate)) {
        return res.status(400).json({ error: "Fechas inválidas" });
      }

      endDate.setUTCHours(23, 59, 59, 999);

      const pagos = await pago.find({
        createAt: {
          $gte: startDate,
          $lte: endDate,
        },
      }).populate('plan').populate('idCliente');
      console.log(pagos);
      res.json({ pagos });
    } catch (error) {
      console.error("Error al obtener las ventas entre fechas:", error);
      res.status(500).json({ error: "Error al obtener las ventas entre fechas" });
    }
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
      const { codigo, plan, idCliente, valor } = req.body;
      const PagoActualizado = await pago.findByIdAndUpdate(
        _id,
        { codigo, plan, idCliente, valor },
        { new: true }
      );
      console.log(idCliente);
     

      res.json({ usuarios: PagoActualizado });
      
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el plan" });
    }
  },
};
export default httpPagos;
