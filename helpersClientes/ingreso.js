import ingreso from "../models/ingreso.js"
import maquinaria from "../models/maquinaria.js"

const helpersIngreso={
    // validarClienteUnica:async (_id)=>{
    //     const existe = await ingreso.find({_id})
    //     if (existe){
    //         throw new Error ("Id Existe")
    //     }
    // },
    validarExistaId:async (_id)=>{
        const existe = await ingreso.findById(_id)
        if (existe==undefined){
            throw new Error ("Id no existe")
        }
    } ,
  
      validarClienteUnica: async (codigo) => {
        const existe = await ingreso.findOne({ codigo });
        if (existe) {
          throw new Error("El código ya existe");
        }
      },
      ClienteUnicaeditar: async (codigo, { req }) => {
        const { _id } = req.params;
        const codigos = await ingreso.findOne({ codigo });
        if (codigos && codigos._id.toString() !== _id.toString()) {
          throw new Error("El código ya existe al editar");
        }
      },
      ClienteUnicaeditarMaquina: async (codigo, { req }) => {
        const { _id } = req.params;
        const codigos = await maquinaria.findOne({ codigo });
        if (codigos && codigos._id.toString() !== _id.toString()) {
          throw new Error("El código ya existe al editar");
        }
      },
}

export default helpersIngreso