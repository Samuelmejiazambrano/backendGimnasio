import mongoose from "mongoose";

const ingresoSchema=new mongoose.Schema({
    codigo: { type: Number, required: true },
    sede:{type:mongoose.Schema.Types.ObjectId,ref:'sede',required:true,},
    cliente:{type:mongoose.Schema.Types.ObjectId,ref:'cliente',required:true,},
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model("ingreso",ingresoSchema)