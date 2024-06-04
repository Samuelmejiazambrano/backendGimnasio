import Usuario from "../models/usuarios.js";
import bcryptjs from "bcryptjs"; 
import  jwt from  "jsonwebtoken"
import { json } from "express";

const httpUsuario = {
  getUsuario: async (req, res) => {
    const usuario = await Usuario.find();
    res.json({ usuario });
  },
  postUsuario: async (req, res) => {
    const { sede, nombre, email, direccion, telefono,rol,password} = req.body;
    const usuario = new Usuario({
      sede,
      nombre,
      email,
      direccion,
      telefono,
      rol,
      password
    });
    const salt = bcryptjs.genSaltSync(10);
    usuario.password= bcryptjs.hashSync(password, salt);
    await usuario.save();
    res.json({ usuario });
  },
  
  
  putUsuario: async (req, res) => {
    try {
      const { _id } = req.params;
      const {  sede,
        nombre,
        email,
        direccion,
        telefono,
        rol} = req.body;
      const UsuarioActualizado = await Usuario.findByIdAndUpdate(_id, {  sede,
        nombre,
        email,
        direccion,
        telefono,
        rol
        }, { new: true });
      res.json({ usuarios: UsuarioActualizado });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el inventario' });
    }
  },
  putUsuarioActivar: async (req, res) => {
    const { _id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(
      _id,
      { estado: 1 },
      { new: true }
    );
    res.json({ usuario });
  },
  putUsuarioDesactivar: async (req, res) => {
    const { _id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(
      _id,
      { estado: 0 },
      { new: true }
    );
    res.json({ usuario });
  },
  getUsuarioId: async (req, res) => {
    const { _id } = req.params;
    const usuario = await Usuario.findById(_id);
    res.json({ usuario });
  },
  getUsuarioActivo: async (req, res) => {
    try {
      const usuariosActivos = await Usuario.find({ estado: 1 });
      res.json({ usuarios: usuariosActivos });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios activos' });
    }
  },
  getUsuarioInactivo: async (req, res) => {
    try {
      const usuariosActivos = await Usuario.find({ estado: 0 });
      res.json({ usuarios: usuariosActivos });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios activos' });
    }
  },
  
  async login(req, res) {
    const { email, password} = req.body;
    try {
       
      
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                mensaje: 'CorreoOO o contraseña incorrectos'
            });
        }
       
        
        if (usuario.estado === 1) {
            return res.status(400).json({
                mensaje: 'Correo o contraseña incorrectosssss'
            });
        }
      
        
        const validarPassword = await bcryptjs.compare(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                mensaje: 'Correo o contraseñaaaaaa incorrectos'
            });
        }
    
        
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.email,
            rol: usuario.rol
        }, process.env.SECRETORPRIVATEKEY, { expiresIn: '100y' });
        res.json({
            usuario,
            token
        });
    } catch (error) {
      console.log(error);
        res.status(500).json({
            mensaje: 'Error al iniciar sesión',
            error
        });
    }
}

};
export default httpUsuario;

   















// usuarioPost: async (req, res) => {
//   const { nombre, cc, password } = req.body;
//   const usuario = new Usuario({ nombre, cc , password });
// const salt = bcryptjs.genSaltSync(10);
//   usuario.password= bcryptjs.hashSync(password, salt);

//   await usuario.save();
//   res.json({ usuario });
// },