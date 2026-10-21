import express from 'express'

//Cors es para permitir que solo ciertos origenes puedan realizar ciertas consultas en tu servidor 
import cors from "cors";
// Es para 
import cookieParser from "cookie-parser";


//
const app = express()




// Configuracion de el app
app.use(cors());
app.use(cookieParser());
app.use(express.json());



//Configuracion de el router



//Levantar servidor