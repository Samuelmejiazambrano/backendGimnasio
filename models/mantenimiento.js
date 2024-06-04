import mongoose from "mongoose";

const precioSchema = new mongoose.Schema({
  codigo: { type: Number, required: true },
  descripcion: { type: String, required: true },
  idMaquina:{type:mongoose.Schema.Types.ObjectId,ref:'maquinaria',required:true},
  fecha: { type: Date},
  responsable: { type: String},
  precio: { type: Number },
  createAt: { type: Date, default: Date.now },
});

export default mongoose.model("precio",precioSchema);
