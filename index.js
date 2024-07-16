import  express  from "express"
import cors from "cors"
import 'dotenv/config'
import dbConexion from "./database/dbmoongose.js"
import router from "./routes/clientes.js"
import ingreso from "./routes/ingreso.js"
import inventarios from "./routes/inventario.js"
import pago from "./routes/pago.js"
import plan from "./routes/plan.js"
import sede from "./routes/sede.js"
import usuario from "./routes/usuarios.js"
import venta from "./routes/venta.js"
import maquinaria from "./routes/maquinaria.js"
import reset from "./routes/reset.js"

import mantenimiento from "./routes/mantenimiento.js"

const port = process.env.PORT || 4600;
const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use("/api/clientes",router)
app.use("/api/ingreso",ingreso)
app.use("/api/inventario",inventarios)
app.use("/api/pago",pago)
app.use("/api/plan",plan)

      
app.use("/api/sede",sede)
app.use("/api/usuario",usuario)
app.use("/api/venta",venta)
app.use("/api/maquinas",maquinaria)
app.use("/api/mantenimiento",mantenimiento)
app.use("/api/reset",reset) 
         

app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
    dbConexion()  
})          
  