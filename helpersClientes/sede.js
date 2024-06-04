import sede from "../models/sede.js"
const helpersSede={
    validarClienteUnica:async (_id)=>{
        const existe = await sede.find({_id})
        if (existe){
            throw new Error ("codigo Existe")
        }
    },
    validarExistaId:async (_id)=>{
        const existe = await sede.findById(_id)
        if (existe==undefined){
            throw new Error ("codigo no existe")
        }
    } 
}

export default helpersSede