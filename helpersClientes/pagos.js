import pagos from "../models/pagos.js"
const helpersPagos={
    validarClienteUnica:async (codigo)=>{
        const existe = await pagos.find({codigo})
        if (existe){
            throw new Error ("codigo Existe")
        }
    },
    validarExistaId:async (codigo)=>{
        const existe = await pagos.findById(codigo)
        if (existe==undefined){
            throw new Error ("codigo no existe")
        }
    },
    validarClienteUnica: async (codigo) => {
        const existe = await pagos.findOne({ codigo });
        if (existe) {
          throw new Error("El código ya existe");
        }
      },
}

export default helpersPagos