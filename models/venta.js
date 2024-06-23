import mongoose from "mongoose";

const ventaSchema=new mongoose.Schema({
    codigoProducto: { type: mongoose.Schema.Types.ObjectId, ref:'inventario', required: true },
    cantidad:{type:Number,default:0},
    totalVentas:{type:Number,default:0},
    fechaInicio:{type:Date},
    fechaFin:{type:Date},
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model("venta",ventaSchema)