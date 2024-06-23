import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  sede: { type: String, required: true },
  nombre: { type: String, default: "", required: true },
  email: { type: String, default: "" },
  direccion: { type: String },
  telefono: { type: Number, default: 0, required: true },
  estado: { type: Number, default: 0 },
  rol: { type: String, required: true },
  password:{type:String,default:0},
  recuperacion: { type: String, default: null } ,
  createAt: { type: Date, default: Date.now },
});

export default mongoose.model("Usuario", usuarioSchema);
          