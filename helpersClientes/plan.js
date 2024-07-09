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
  }
};

export default helpersPlan;
