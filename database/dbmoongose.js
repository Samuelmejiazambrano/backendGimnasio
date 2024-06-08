import mongoose from "mongoose";
const dbConexion = async ()=>{
    try {
        await mongoose.connect(process.env.CNX_MONGO);
        console.log("Conexion bd establecida");
        
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
} 

export default dbConexion