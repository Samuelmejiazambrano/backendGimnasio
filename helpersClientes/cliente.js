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
};

export default helpersClientes;
