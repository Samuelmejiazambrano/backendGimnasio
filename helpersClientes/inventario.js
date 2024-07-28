import inventario from "../models/inventario.js"
const helpersInventario={
    validarClienteUnica:async (_id)=>{
        const existe = await inventario.find({_id})
        if (existe){
            throw new Error ("Id Existe")
        }
    },
    validarExistaId:async (_id)=>{
        const existe = await inventario.findById(_id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    } ,
    validarClienteUnica: async (codigo) => {
        const existe = await inventario.findOne({ codigo });
        if (existe) {
          throw new Error("El código ya existe");
        }
      },
}

export default helpersInventario