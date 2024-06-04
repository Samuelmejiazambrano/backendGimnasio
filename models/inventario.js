import mongoose from "mongoose";

const inventarioSchema = new mongoose.Schema({

  descripcion: { type: String, required: true },
  codigo: { type: String, required: true },
  valor: { type: Number, default: 0 },
  cantidad: { type: Number, required: true},
  stock: { type: Number, default: 0 } ,
  createAt: { type: Date, default: Date.now },
});   

export default mongoose.model("inventario",inventarioSchema);
