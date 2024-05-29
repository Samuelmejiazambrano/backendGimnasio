import venta from "../models/venta.js"
const helpersVenta={
    validarClienteUnica:async (_id)=>{
        const existe = await venta.find({_id})
        if (existe){
            throw new Error ("codigo Existe")
        }
    },
    validarExistaId:async (_id)=>{
        const existe = await venta.findById(_id)
        if (existe==undefined){
            throw new Error ("codigo no existe")
        }
    } 
}

export default helpersVenta