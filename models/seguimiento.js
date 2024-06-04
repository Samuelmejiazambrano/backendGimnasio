import mongoose from "mongoose";

const seguimientoSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    fechaIngreso: { type: Date },
    peso: { type: Number },
    imc: { type: Number },
    brazo: { type: Number },
    cintura: { type: Number },
    pie: { type: Number },
    estatura: { type: Number }
});

export default mongoose.model("Seguimiento", seguimientoSchema);
