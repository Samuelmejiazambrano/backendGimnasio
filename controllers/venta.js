import venta from "../models/venta.js";
import plan from "../models/plan.js";

import inventario from "../models/inventario.js";

const httpVenta = {
  getVenta: async (req, res) => {
    const ventas = await venta.find().populate("codigoProducto");
    res.json({ ventas });
  },
  postVenta: async (req, res) => {
    const { fechaInicio, fechaFin, codigoProducto, cantidad } = req.body;

    try {
      const producto = await inventario.findById(codigoProducto);

      if (!producto) {
        return res
          .status(404)
          .json({ error: "Producto no encontrado en el inventario" });
      }

      if (producto.cantidad < cantidad) {
        return res
          .status(400)
          .json({ error: "Cantidad insuficiente en inventario" });
      }

      const valorUnitario = producto.valor;
      const totalVentas = valorUnitario * cantidad;
      const updatedCantidad = producto.cantidad - cantidad;

      await inventario.findByIdAndUpdate(codigoProducto, {
        cantidad: updatedCantidad,
      });

      const ventas = new venta({
        fechaInicio,
        fechaFin,
        codigoProducto,
        cantidad,
        valorUnitario,
        totalVentas,
      });
      await ventas.save();

      res.json({ ventas });
    } catch (error) {
      console.error("Error al procesar la venta:", error);
      res.status(500).json({ error: "Error al procesar la venta" });
    }
  },

  putVentaActivar: async (req, res) => {
    const { _id } = req.params;
    const ventas = await venta.findByIdAndUpdate(
      _id,
      { estado: 1 },
      { new: true }
    );
    res.json({ ventas });
  },
  putventaDesactivar: async (req, res) => {
    const { _id } = req.params;
    const ventas = await venta.findByIdAndUpdate(
      _id,
      { estado: 0 },
      { new: true }
    );
    res.json({ ventas });
  },
  getVentaId: async (req, res) => {
    const { _id } = req.params;
    const ventas = await venta.findById(_id);
    res.json({ ventas });
  },

  getTotalVentasEntreFechas: async (req, res) => {
    try {
      const { fechaInicio, fechaFin } = req.query;
      const totalVentas = await venta.aggregate([
        {
          $match: {
            createAt: {
              $gte: new Date(fechaInicio),
              $lte: new Date(fechaFin),
            },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$total" },
          },
        },
      ]);

      const total = totalVentas.length > 0 ? totalVentas[0].total : 0;

      res.json({ total });
    } catch (error) {
      res
        .status(4600)
        .json({ error: "Error al obtener el total de las ventas" });
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
              $lte: new Date(fechaFin),
            },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$total" },
          },
        },
      ]);

      const total = totalVentas.length > 0 ? totalVentas[0].total : 0;

      res.json({ total });
    } catch (error) {
      res
        .status(4600)
        .json({
          error: "Error al obtener el total de las ventas por producto",
        });
    }
  },
  putVenta: async (req, res) => {
    try {
      const { _id } = req.params;
      const {
        fechaInicio,
        fechaFin,
        codigoProducto,
        cantidad,
        valorUnitario,
        totalVentas,
      } = req.body;
      const VentaActualizado = await venta.findByIdAndUpdate(
        _id,
        {
          fechaInicio,
          fechaFin,
          codigoProducto,
          cantidad,
          valorUnitario,
          totalVentas,
        },
        { new: true }
      );
      res.json({ Venta: VentaActualizado });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la Venta" });
    }
  },
};

export default httpVenta;
