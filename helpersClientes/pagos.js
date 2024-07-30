import pagos from "../models/pagos.js"

const helpersPagos = {
  validarClienteUnica: async (codigo) => {
    const existe = await pagos.findOne({ codigo });
    if (existe) {
      throw new Error("El código ya existe");
    }
  },
  
  validarExistaId: async (codigo) => {
    const existe = await pagos.findById(codigo);
    if (!existe) {
      throw new Error("El código no existe");
    }
  },

  ClienteUnicaeditar: async (codigo, { req }) => {
    const { _id } = req.params;
    const codigos = await pagos.findOne({ codigo });
    if (codigos && codigos._id.toString() !== _id.toString()) {
      throw new Error("El código ya existe al editar");
    }
  },
};

export default helpersPagos;
