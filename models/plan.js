import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  CantDias: { type:Number, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: Number, required: true },
  valor: { type: Number, default: 0 },
  estado: { type: Number, default: 0 },
  createAt: { type: Date, default: Date.now },
});

export default mongoose.model("plan", planSchema);
