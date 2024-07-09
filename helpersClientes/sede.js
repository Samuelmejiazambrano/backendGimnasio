import sede from "../models/sede.js"
const helpersSede={
    validarClienteUnica: async (codigo) => {
        const existe = await sede.findOne({ codigo });
        if (existe) {
          throw new Error("El código ya existe");
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