putactualizarVentas: async (req, res) => {
    try {
      const { id } = req.params;
      const { cantidad, ...resto } = req.body;

      const ventaExistente = await ventas.findById(id);
      if (!ventaExistente) {
        return res.status(404).json({ message: "Venta no encontrada" });
      }

      const producto = await productos.findById(ventaExistente.idproducto);
      if (!producto) {
        return res.status(404).json({ error: "El producto no existe" });
      } 

      if (cantidad) {
        const diferenciaCantidad = cantidad - ventaExistente.cantidad; 
        if (producto.cantidad < diferenciaCantidad) {
          return res.status(400).json({ error: "No hay suficiente cantidad en inventario" });
        }
        producto.cantidad -= diferenciaCantidad;
        await producto.save();

        resto.total = cantidad * ventaExistente.valorUnidad;
      }

      const ventaActualiza = await ventas.findByIdAndUpdate(id, { cantidad, ...resto }, { new: true });
      res.json({ ventaActualiza });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "No se pudo actualizar la venta" });
    }
  },