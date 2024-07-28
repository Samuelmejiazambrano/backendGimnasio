import venta from "../models/venta.js";
import plan from "../models/plan.js";
import inventario from "../models/inventario.js";
import mongoose from "mongoose";

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const httpVenta = {
  getVenta: async (req, res) => {
    const ventas = await venta.find().populate("codigoProducto");
    let totalVentasGeneral = 0;
    ventas.forEach((venta) => {
      totalVentasGeneral += venta.totalVentas;
    });
    totalVentasGeneral = formatNumber(totalVentasGeneral);
    console.log(totalVentasGeneral);

    res.json({ ventas, totalVentasGeneral });
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
  
      if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ error: "Se requieren fechas de inicio y fin" });
      }
  
      const startDate = new Date(fechaInicio);
      const endDate = new Date(fechaFin);
  
      if (isNaN(startDate) || isNaN(endDate)) {
        return res.status(400).json({ error: "Fechas inválidas" });
      }
  
      // Ajustar la fecha de fin para incluir todo el día
      endDate.setUTCHours(23, 59, 59, 999);
  
      const ventas = await venta.find({
        createAt: {
          $gte: startDate,
          $lte: endDate,
        },
      }).populate('codigoProducto');
      console.log("Ventas encontradas:", ventas);
  
      let totalVentas = 0;
      ventas.forEach((venta) => {
        totalVentas += venta.totalVentas;
      });
  
      totalVentas = formatNumber(totalVentas);
      res.json({ ventas, totalVentas });
    } catch (error) {
      console.error("Error al obtener las ventas entre fechas:", error);
      res.status(500).json({ error: "Error al obtener las ventas entre fechas" });
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

      const ventaExistente = await venta.findById(_id);
      if (!ventaExistente) {
        return res.status(404).json({ message: "Venta no encontrada" });
      }

      const producto = await inventario.findById(ventaExistente.codigoProducto);
      if (!producto) {
        return res.status(404).json({ error: "El producto no existe" });
      }

      if (cantidad !== undefined) {
        const diferenciaCantidad = cantidad - ventaExistente.cantidad;

        if (diferenciaCantidad > 0) {
          if (producto.cantidad < diferenciaCantidad) {
            return res.status(400).json({ error: "No hay suficiente cantidad en inventario" });
          }
          producto.cantidad -= diferenciaCantidad;
        } else if (diferenciaCantidad < 0) {
          producto.cantidad += Math.abs(diferenciaCantidad);
        }

        await producto.save();
      }

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
      console.log(error);
      res.status(500).json({ error: "Error al actualizar la Venta" });
    }
  },
};

export default httpVenta;
