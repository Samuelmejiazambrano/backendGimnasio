import mongoose from "mongoose";

const sedeSchema=new mongoose.Schema({
    codigo:{type:Number,default:0,required:true,unique:true},
    nombre:{type:String,default:"",required:true},
    direccion:{type:String},
    ciudad:{type:String},
    telefono:{type:Number,default:0,required:true,unique:true},
    estado:{type:Number,default:0},
    horario:{type:String},
  
   
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model("sede",sedeSchema)                                   