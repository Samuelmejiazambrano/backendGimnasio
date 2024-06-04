import mongoose from "mongoose";

const pagoSchema=new mongoose.Schema({
    codigo: { type: Number, required: true },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'plan' },
    idCliente:{type:mongoose.Schema.Types.ObjectId,ref:'Cliente'},
    valor:{type:Number,default:0},
    estado:{type:Number,default:1},

    createAt:{type:Date,default:Date.now}
})

export default mongoose.model("pago",pagoSchema)