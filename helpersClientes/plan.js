import plan from "../models/plan.js";

const helpersPlan = {
  validarClienteUnica: async (codigo) => {
    const existe = await plan.findOne({ codigo });
    if (existe) {
      throw new Error("El código ya existe");
    }
  },
  validarExistaId: async (id) => {
    const existe = await plan.findById(id);
    if (!existe) {
      throw new Error("El ID no existe");
    }
  },
  ClienteUnicaeditar: async (codigo, { req }) => {
    const { _id } = req.params;
    const codigos = await plan.findOne({ codigo });
    if (codigos && codigos._id.toString() !== _id.toString()) {
      throw new Error("El código ya existe al editar");
    }
  }
};

export default helpersPlan;
