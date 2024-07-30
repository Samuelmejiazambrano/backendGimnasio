import clientes from "../models/clientes.js";
import Cliente from "../models/clientes.js";

const helpersClientes = {
  validarClienteUnica: async (_id) => {
    const existe = await Cliente.findOne({ _id });
    if (existe) {
      throw new Error("El ID ya existe");
    }
  },
  validarExistaId: async (_id) => {
    const existe = await Cliente.findById(_id);
    if (!existe) {
      throw new Error("El ID no existe");
    }
},
  validarCCUnica: async (cc) => {
    const existe = await Cliente.findOne({ cc });
    console.log(existe);
    if (existe) {
      throw new Error("La cédula ya existess");
    }
  },
  
  ClienteUnicaeditar: async (cc, { req }) => {
    const { _id } = req.params;
    const codigos = await clientes.findOne({ cc });
    if (codigos && codigos._id.toString() !== _id.toString()) {
      throw new Error("El código ya existe al editar");
    }
  },
};

export default helpersClientes;
