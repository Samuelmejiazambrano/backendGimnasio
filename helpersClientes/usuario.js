import usuarios from "../models/usuarios.js"
const helpersUsuarios={
    validarClienteUnica:async (_id)=>{
        const existe = await usuarios.find({_id})
        if (existe){
            throw new Error ("codigo Existe")
        }
    },
    validarExistaId:async (_id)=>{
        const existe = await usuarios.findById(_id)
        if (existe==undefined){
            throw new Error ("codigo no existe")
        }
    } 
}

export default helpersUsuarios