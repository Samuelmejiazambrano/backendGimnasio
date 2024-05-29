import mongoose from "mongoose";

const ventaSchema=new mongoose.Schema({


    codigo:{type:Number,default:0,unique:true},
    cantidad:{type:Number,default:0},
    valorUnitario:{type:Number},
    totalVentas:{type:Number,default:0},
    fechaInicio:{type:Date},
    fechaFin:{type:Date},
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model("venta",ventaSchema)