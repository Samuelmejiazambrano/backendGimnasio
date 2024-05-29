import ingreso from "../models/ingreso.js"
const helpersIngreso={
    validarClienteUnica:async (_id)=>{
        const existe = await ingreso.find({_id})
        if (existe){
            throw new Error ("Id Existe")
        }
    },
    validarExistaId:async (_id)=>{
        const existe = await ingreso.findById(_id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    } 
}

export default helpersIngreso