import mongoose from "mongoose";

const clienteSchema=new mongoose.Schema({
    cc :{type:String, required:true },
    nombre:{type:String,default:""},
    fechaIngreso:{type:Date}, 
    fechaNac:{type:Date},
    edad:{type:Number},
    direccion:{type:String},
    telefono:{type:String},
    estado:{type:Number,default:1},
    foto:{type:String},      
    plan: { type: mongoose.Schema.Types.ObjectId, ref:'plan', required: true },
    seguimiento:[{
        fechaIngreso:{type:Date},
        peso:{type:Number},
         imc:{type:Number},
         brazo:{type:Number},
         cintura:{type:Number},
         pie:{type:Number},
         estatura:{type:Number},
    }],
    createAt:{type:Date,default:Date.now}    
})

export default mongoose.model("Cliente",clienteSchema)       