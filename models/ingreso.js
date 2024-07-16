import mongoose from "mongoose";

const ingresoSchema=new mongoose.Schema({
    codigo: { type: Number, required: true,unique:true },
    sede:{type:mongoose.Schema.Types.ObjectId,ref:'sede',required:true,},
    cliente:{type:mongoose.Schema.Types.ObjectId,ref:'Cliente',required:true,},
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model("ingreso",ingresoSchema)               