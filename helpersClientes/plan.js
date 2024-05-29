import plan from "../models/plan.js"
const helpersPlan={
    validarClienteUnica:async (codigo)=>{
        const existe = await plan.find({codigo})
        if (existe){
            throw new Error ("codigo Existe")
        }
    },
    validarExistaId:async (codigo)=>{
        const existe = await plan.findById(codigo)
        if (existe==undefined){
            throw new Error ("codigo no existe")
        }
    } 
}

export default helpersPlan