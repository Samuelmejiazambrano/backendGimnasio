import Cliente from "../models/clientes.js"
const helpersClientes={
    validarClienteUnica:async (_id)=>{
        const existe = await Cliente.find({_id})
        if (existe){
            throw new Error ("Id Existe")
        }
    },
    validarExistaId:async (_id)=>{
        const existe = await Cliente.findById(_id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    } 
}

export default helpersClientes