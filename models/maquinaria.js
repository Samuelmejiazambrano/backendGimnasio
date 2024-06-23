import mongoose from "mongoose";

const maquinariaSchema = new mongoose.Schema({
  
  descripcion: { type: String, required: true },
  codigo: { type: Number, required: true },
  idSede:{type:mongoose.Schema.Types.ObjectId,ref:'sede',required:true},
  fecha: { type: Date},
  FechaUmantenimiento: { type: Date},
  estado: { type: Number, default:"" },
  createAt: { type: Date, default: Date.now },
});
    
export default mongoose.model("maquinaria",maquinariaSchema);                    
                                                          